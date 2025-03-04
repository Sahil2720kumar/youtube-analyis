import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useState } from 'react';
import { formatNumber } from '~/utils/formatNumber';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '~/lib/supabase';
import { router } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoAnalysisButton from '~/components/VideoAnalysisButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '~/components/Button';
import { YT_COMMENTS_DATASET_ID } from '~/utils/constants';

// Add these types and test data near the top of the file
type MessageType = {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
};

const initialMessages: MessageType[] = [
  {
    id: '1',
    content: 'Hi! I can help you understand this video better. What would you like to know?',
    role: 'assistant',
    timestamp: new Date('2024-03-10T10:00:00'),
  }
];

const getVideoById = async (video_id: string) => {
  const { data, error } = await supabase
    .from('yt_videos')
    .select('*,yt_channels(subscribers,profile_image,handle,name,url)')
    .eq('id', video_id)
    .single();
  return data;
};

const getMessagesByVideoId = async (video_id: string) => {
  const { data: fetchMessagesData, error: fetchMessagesDataError } = await supabase
    .from('messages')
    .select('*, conversations!inner(video_id)') // Join with conversations table
    .eq('conversations.video_id', video_id); // Filter by video_id in conversations table

  return fetchMessagesData;
};

// Format date to relative time
const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

// Format duration from seconds to mm:ss
const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoSpecificPage = () => {
  const { video_id } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const [isCommentsCollecting, setIsCommmentsCollecting] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const queryClient = useQueryClient();

  const {
    data: videoData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['video', video_id],
    queryFn: () => getVideoById(video_id as string),
  });

  const {
    data: messageData,
    isLoading: isMessageDataLoading,
    error: messageDataError,
  } = useQuery({
    queryKey: ['messages', video_id],
    queryFn: () => getMessagesByVideoId(video_id as string),
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <View className="w-full rounded-2xl bg-white p-8 shadow-xl">
          <View className="items-center">
            <View className="mb-4 h-16 w-16 animate-pulse items-center justify-center rounded-full bg-red-100">
              <Text className="text-3xl">🎬</Text>
            </View>
            <Text className="mb-2 text-xl font-bold text-gray-800">Loading Video</Text>
            <Text className="text-center text-gray-600">
              Please wait while we prepare your video content...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <View className="w-full rounded-2xl bg-white p-8 shadow-xl">
          <View className="items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Text className="text-3xl">⚠️</Text>
            </View>
            <Text className="mb-2 text-xl font-bold text-gray-800">Oops! Something went wrong</Text>
            <Text className="mb-6 text-center text-gray-600">
              {error?.message || "We couldn't load the video. Please try again later."}
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              className="rounded-xl bg-red-500 px-6 py-3 shadow-md active:bg-red-600">
              <Text className="font-medium text-white">Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Using the testdata from the parent component
  const video = videoData; // Assuming testdata is available

  const onStateChange = (state: string) => {
    if (state === 'playing') {
      setPlaying(true);
    } else if (state === 'paused') {
      setPlaying(false);
    }
  };

  const fetchCommentsData = async () => {
    try {
      setIsCommmentsCollecting(true);
      //fetch comments data
      const { data: commentData, error: commentError } = await supabase
        .from('yt_comments')
        .select('id')
        .eq('url', video?.url)

      if (commentData) {
        console.log('commentsdata: ', commentData);
        router.push(`/channel/videos/comments/?video_url=${video?.url}`);
        setIsCommmentsCollecting(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('trigger_collection_api', {
        body: {
          input: [
            { url: video?.url, load_replies: 0, num_of_comments: 5, sort_by: 'Top comments' },
          ],
          dataset_id: YT_COMMENTS_DATASET_ID,
        },
      });
      if (error) {
        throw new Error(error);
      }
      console.log('fetchCommentsData data: ', data);
      setIsCommmentsCollecting(false);
      router.push(`/job/${data.id}?type=comments&video_url=${video?.url}`);
    } catch (error) {
      console.log('this is comments error', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    //  AI response
    const { data, error } = await supabase.functions.invoke('ai_chat_bot', {
      body: {
        messages: [...messages, newMessage],
        videoData: video,
        newMessage: newMessage,
      },
    });
    if (error) {
      console.error('Error sending message to ai: ', error);
      throw new Error(error);
    }
    console.log('chat response: ', data);
    queryClient.invalidateQueries({ queryKey: ['messages', video_id] });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: video?.yt_channels?.name.toUpperCase(),
          headerTitleStyle: { fontSize: 16 },
        }}
      />

      {/* Video Preview */}
      <View className="relative aspect-video w-full bg-black">
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={video?.id}
          onChangeState={onStateChange}
        />
        <View className="absolute bottom-4 right-4 rounded-lg bg-black/75 px-2.5 py-1">
          <Text className="font-medium text-white">{formatDuration(video?.video_length)}</Text>
        </View>
      </View>

      {/* Content Container */}
      <View className="px-4 py-4">
        {/* Title and Stats Section */}
        <View className="rounded-2xl bg-white p-5 shadow-md">
          <Text className="mb-3 text-xl font-bold text-gray-900">{video?.title}</Text>

          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="font-semibold text-gray-700">
                {formatNumber(video?.views)} views
              </Text>
              <Text className="mx-2 text-gray-400">•</Text>
              <Text className="text-gray-700">{getRelativeTime(video?.date_posted)}</Text>
            </View>
            <View className="rounded-full bg-blue-500 px-2 py-1">
              <Text className="text-xs font-medium text-white">HD</Text>
            </View>
          </View>

          {/* Channel Info */}
          <TouchableOpacity
            onPress={() => router.push(`/channel/${video?.youtuber_id}`)}
            className="mb-4 flex-row items-center">
            <Image
              source={{ uri: video?.yt_channels?.profile_image }}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className="text-lg font-bold text-gray-900">
                  {video?.yt_channels?.handle}
                </Text>
                {video?.verified && (
                  <View className="ml-2 rounded-full bg-blue-500 p-0.5">
                    <Text className="px-1 text-xs text-white">✓</Text>
                  </View>
                )}
              </View>
              <Text className="text-gray-600">
                {formatNumber(video?.yt_channels?.subscribers)} subscribers
              </Text>
            </View>
          </TouchableOpacity>

          {/* Engagement Stats */}
          <View className="flex-row justify-between rounded-xl bg-gray-50 p-4">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">{formatNumber(video?.likes)}</Text>
              <Text className="text-gray-600">Likes</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">
                {formatNumber(video?.num_comments)}
              </Text>
              <Text className="text-gray-600">Comments</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">
                {formatDuration(video?.video_length)}
              </Text>
              <Text className="text-gray-600">Duration</Text>
            </View>
          </View>
        </View>

        {/* Video Analysis Button */}
        {video?.transcript && <VideoAnalysisButton videoId={video?.id} className="mt-4" />}

        <View className="items-center justify-center">
          <Button
            disabled={isCommentsCollecting}
            onPress={() => fetchCommentsData()}
            title={`${isCommentsCollecting ? 'Comments Collecting...' : 'Comments'}`}
            className="w-[90%] bg-[#6C63FF]" />
        </View>

        {/* AI Chat Section */}
        <View className="mt-4 rounded-2xl bg-white p-5 shadow-md">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-900">AI Chat Assistant</Text>
            <View className="flex-row items-center rounded-full bg-green-100 px-3 py-1">
              <View className="mr-2 h-2 w-2 rounded-full bg-green-500" />
              <Text className="text-sm font-medium text-green-700">Online</Text>
            </View>
          </View>

          {/* Chat Messages Container */}
          <ScrollView className="mb-4">
            <View className="gap-y-4">
              <View
                key={"initial_messages"}
                className={`flex-row ${initialMessages[0].role === 'user' ? 'justify-end' : ''}`}>
                {initialMessages[0].role === 'assistant' && (
                  <View className="h-8 w-8 rounded-full bg-blue-100">
                    <Text className="m-auto">🤖</Text>
                  </View>
                )}
                <View
                  className={`${initialMessages[0].role === 'assistant'
                    ? 'ml-3 flex-1 rounded-2xl rounded-tl-none bg-blue-50'
                    : 'mr-3 flex-1 rounded-2xl rounded-tr-none bg-gray-100'
                    } p-4`}>
                  <Text className="text-gray-800">{initialMessages[0].content}</Text>
                </View>

              </View>
              {messageData?.map((message) => (
                <View
                  key={message.id}
                  className={`flex-row ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'assistant' && (
                    <View className="h-8 w-8 rounded-full bg-blue-100">
                      <Text className="m-auto">🤖</Text>
                    </View>
                  )}
                  <View
                    className={`${message.role === 'assistant'
                      ? 'ml-3 flex-1 rounded-2xl rounded-tl-none bg-blue-50'
                      : 'mr-3 flex-1 rounded-2xl rounded-tr-none bg-gray-100'
                      } p-4`}>
                    <Text className="text-gray-800">{message.content}</Text>
                  </View>
                  {message.role === 'user' && (
                    <View className="h-8 w-8 rounded-full bg-gray-200">
                      <Text className="m-auto">👤</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Input Section */}
          <View className="flex-row items-center space-x-2">
            <View className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
              <TextInput
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Ask anything about the video..."
                placeholderTextColor="#9CA3AF"
                className="text-gray-900"
                onSubmitEditing={handleSendMessage}
              />
            </View>
            <TouchableOpacity className="rounded-full bg-blue-500 p-2" onPress={handleSendMessage}>
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {video?.ai_summary && (
          <View className="mt-4 rounded-2xl bg-white p-5 shadow-md">
            <Text className="mb-3 text-lg font-bold text-gray-900">AI Summary</Text>
            <Text className="leading-6 text-gray-700">{video?.ai_summary}</Text>
          </View>
        )}

        {video?.ai_topics && (
          <View className="mt-4 rounded-2xl bg-white p-5 shadow-md">
            <Text className="mb-3 text-lg font-bold text-gray-900">AI Topics</Text>
            <View className="leading-6 text-gray-700">
              {video?.ai_topics.map((topic: string, index: number) => (
                <View key={index} className="flex-row items-center">
                  <Text key={index} className="leading-6 text-gray-700">
                    {index + 1}. {topic}
                  </Text>
                  <MaterialIcons className="ml-2" name="check-circle" size={20} color="green" />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Description Section */}
        <View className="mt-4 rounded-2xl bg-white p-5 shadow-md">
          <Text className="mb-3 text-lg font-bold text-gray-900">Description</Text>
          <Text className="leading-6 text-gray-700">{video?.description}</Text>
        </View>

        {/* Transcript Section */}
        {video?.transcript && (
          <View className="mb-4 mt-4 rounded-2xl bg-white p-5 shadow-md">
            <Text className="mb-3 text-lg font-bold text-gray-900">Transcript</Text>
            <Text className="leading-6 text-gray-700">{video?.transcript}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default VideoSpecificPage;
