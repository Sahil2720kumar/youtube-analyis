import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import React, { useState } from 'react'
import { formatNumber } from '~/utils/formatNumber'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '~/lib/supabase'
import { router } from 'expo-router'
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoAnalysisButton from '~/components/VideoAnalysisButton';
import { MaterialIcons } from '@expo/vector-icons';


const getVideoById = async (video_id: string) => {
  const { data, error } = await supabase.from('yt_videos').select('*,yt_channels(subscribers,profile_image,handle,name)').eq('id', video_id).single()
  return data
}


const VideoSpecificPage = () => {
  const { video_id } = useLocalSearchParams()
  const [playing, setPlaying] = useState(false);

  const { data: videoData, isLoading, error } = useQuery({
    queryKey: ['video', video_id],
    queryFn: () => getVideoById(video_id as string)
  })

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <View className="rounded-2xl bg-white p-8 shadow-xl w-full">
          <View className="items-center">
            <View className="h-16 w-16 rounded-full bg-red-100 items-center justify-center mb-4 animate-pulse">
              <Text className="text-3xl">🎬</Text>
            </View>
            <Text className="text-xl font-bold text-gray-800 mb-2">Loading Video</Text>
            <Text className="text-gray-600 text-center">
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
        <View className="rounded-2xl bg-white p-8 shadow-xl w-full">
          <View className="items-center">
            <View className="h-16 w-16 rounded-full bg-red-100 items-center justify-center mb-4">
              <Text className="text-3xl">⚠️</Text>
            </View>
            <Text className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</Text>
            <Text className="text-gray-600 text-center mb-6">
              {error?.message || "We couldn't load the video. Please try again later."}
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-red-500 px-6 py-3 rounded-xl active:bg-red-600 shadow-md">
              <Text className="text-white font-medium">Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Using the testdata from the parent component
  const video = videoData // Assuming testdata is available

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const onStateChange = (state: string) => {
    if (state === 'playing') {
      setPlaying(true);
    } else if (state === 'paused') {
      setPlaying(false);
    }
  }

  // Format date to relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    if (days < 365) return `${Math.floor(days / 30)} months ago`
    return `${Math.floor(days / 365)} years ago`
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{
        title: video?.yt_channels?.name.toUpperCase(),
        headerTitleStyle: { fontSize: 16 }
      }} />

      {/* Video Preview */}
      <View className="relative w-full aspect-video bg-black">
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={video?.id}
          onChangeState={onStateChange}
        />
        <View className="absolute bottom-4 right-4 bg-black/75 px-2.5 py-1 rounded-lg">
          <Text className="text-white font-medium">
            {formatDuration(video?.video_length)}
          </Text>
        </View>
      </View>

      {/* Content Container */}
      <View className="px-4 py-4">
        {/* Title and Stats Section */}
        <View className="bg-white rounded-2xl p-5 shadow-md">
          <Text className="text-xl font-bold text-gray-900 mb-3">
            {video?.title}
          </Text>

          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Text className="text-gray-700 font-semibold">
                {formatNumber(video?.views)} views
              </Text>
              <Text className="text-gray-400 mx-2">•</Text>
              <Text className="text-gray-700">
                {getRelativeTime(video?.date_posted)}
              </Text>
            </View>
            <View className="bg-blue-500 px-2 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">HD</Text>
            </View>
          </View>

          {/* Channel Info */}
          <TouchableOpacity onPress={() => router.push(`/channel/${video?.youtuber_id}`)} className="flex-row items-center mb-4">
            <Image
              source={{ uri: video?.yt_channels?.profile_image }}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className="text-gray-900 font-bold text-lg">
                  {video?.yt_channels?.handle}
                </Text>
                {video?.verified && (
                  <View className="ml-2 bg-blue-500 rounded-full p-0.5">
                    <Text className="text-white text-xs px-1">✓</Text>
                  </View>
                )}
              </View>
              <Text className="text-gray-600">
                {formatNumber(video?.yt_channels?.subscribers)} subscribers
              </Text>
            </View>
          </TouchableOpacity>



          {/* Engagement Stats */}
          <View className="flex-row justify-between bg-gray-50 p-4 rounded-xl">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">
                {formatNumber(video?.likes)}
              </Text>
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
        {video?.transcript && (
          <VideoAnalysisButton videoId={video?.id} className="mt-4" />
        )}

        {video?.ai_summary && (
          <View className="bg-white rounded-2xl p-5 mt-4 shadow-md">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              AI Summary
            </Text>
            <Text className="text-gray-700 leading-6">
              {video?.ai_summary}
            </Text>
          </View>
        )}

        {video?.ai_topics && (
          <View className="bg-white rounded-2xl p-5 mt-4 shadow-md">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              AI Topics
            </Text>
            <View className="text-gray-700 leading-6">
              {video?.ai_topics.map((topic: string, index: number) => (
                <View key={index} className="flex-row items-center">  
                  <Text key={index} className="text-gray-700 leading-6">
                    {index + 1}. {topic}
                  </Text>
                  <MaterialIcons className="ml-2" name="check-circle" size={20} color="green" />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Description Section */}
        <View className="bg-white rounded-2xl p-5 mt-4 shadow-md">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Description
          </Text>
          <Text className="text-gray-700 leading-6">
            {video?.description}
          </Text>
        </View>

        {/* Transcript Section */}
        {video?.transcript && (
          <View className="bg-white rounded-2xl p-5 mt-4 shadow-md mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Transcript
            </Text>
            <Text className="text-gray-700 leading-6">
              {video?.transcript}
            </Text>
          </View>
        )}



      </View>
    </ScrollView>
  )
}

export default VideoSpecificPage