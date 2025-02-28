import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js"
import OpenAI from 'https://deno.land/x/openai@v4.24.0/mod.ts'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  const { videoId } = await req.json()

  const { data: video, error: videoError } = await supabase
    .from('yt_videos')
    .select('*')
    .eq('id', videoId)
    .single()

  if (videoError) {
    return new Response(JSON.stringify({ error: videoError.message, status: videoError.status }), { status: 200 })
  }

  //openai integration
  const apiKey = Deno.env.get('OPENAI_API_KEY')

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not set' }), { status: 200 })
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  })

  // Documentation here: https://github.com/openai/openai-node
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'developer', content: 'You are a helpful assistant that analyzes YouTube videos and provides a summary of the video. Provide output in JSON format.' },
      {
        role: 'user', content: `Please analyze the following YouTube video and provide a summary of the video: ${video.transcript}
        please provide the summary in the following format:
          {
            "ai_summary": string, // summary of the video with the most important points
            "ai_topics": string[] // key topics of the video (max 5)
          } 
      `}
    ],
    // Choose model from here: https://platform.openai.com/docs/models
    model: 'gpt-4o-mini',
    stream: false,
    response_format: { type: 'json_object' },
  })

  const reply = chatCompletion.choices[0].message.content
  const parsedReply = JSON.parse(reply)
  console.log("reply: ", parsedReply)

  const { data, error } = await supabase
    .from('yt_videos')
    .update({
      ai_summary: parsedReply.ai_summary,
      ai_topics: parsedReply.ai_topics,
    })
    .eq('id', videoId)

  if (error) {
    return new Response(JSON.stringify({ error: error.message, status: error.status }), { status: 200 })
  }
  console.log("analysis data: ", data)
  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' },
  })
})

