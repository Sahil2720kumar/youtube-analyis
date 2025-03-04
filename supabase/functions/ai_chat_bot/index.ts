import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js';
import OpenAI from 'https://deno.land/x/openai@v4.24.0/mod.ts';

// Helper function to save a message to the database
const saveMessageToDb = async (supabase: any, conversationData: any, message: any) => {
  const { data: insertMessageData, error: insertMessageError } = await supabase
    .from('messages')
    .upsert({
      conversation_id: conversationData.id,
      role: message.role,
      content: message.content,
      timestamp: message.timestamp,
    })
    .select('*');

  if (insertMessageError) {
    throw new Error('Failed to create new message');
  }
  console.log('Message saved:', insertMessageData);
};

// Main function handler
Deno.serve(async (req) => {
  try {
    // Parse the request body
    const { messages, videoData, newMessage } = await req.json();
    console.log('Messages:', messages);
    console.log('Video Data:', videoData);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Check if a conversation exists for the video
    const { data: conversationsData, error: conversationsError } = await supabase
      .from('conversations')
      .select('*')
      .eq('video_id', videoData.id)
      .single();

    let conversationId;

    if (!conversationsData || conversationsError) {
      // Create a new conversation if it doesn't exist
      console.log('Conversation not found, creating a new one...');
      const { data: insertConversationData, error: insertConversationError } = await supabase
        .from('conversations')
        .upsert({ video_id: videoData.id })
        .select('*')
        .single();

      if (insertConversationError) {
        throw new Error('Failed to create conversation');
      }

      console.log('New conversation created:', insertConversationData);
      conversationId = insertConversationData.id;
    } else {
      // Use the existing conversation ID
      conversationId = conversationsData.id;
    }

    // Save the user's message to the database
    await saveMessageToDb(supabase, { id: conversationId }, {
      role: newMessage.role,
      content: newMessage.content,
      timestamp: new Date().toISOString(),
    });

    // Initialize OpenAI client
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Generate a response using OpenAI
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'developer',
          content: `You are a helpful assistant that analyzes YouTube videos and provides a response based on the video data: ${JSON.stringify(videoData)}. Provide output in text format.`,
        },
        ...messages,
      ],
      model: 'gpt-4o-mini',
      stream: false,
      // response_format: { type: 'json_object' },
    });

    const reply = chatCompletion.choices[0].message.content;
    console.log('AI Reply:', reply);

    // Save the AI's response to the database
    await saveMessageToDb(supabase, { id: conversationId }, {
      role: 'assistant',
      content: reply,
      timestamp: new Date().toISOString(),
    });

    // Return the AI's response to the client
    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});