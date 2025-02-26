import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { formatNumber } from '~/utils/formatNumber'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '~/lib/supabase'


const fetchVideosData = async (channel_id: string) => {
  const { data, error } = await supabase.from('yt_videos').select('*,yt_channels(subscribers,profile_image,handle,name)').eq('youtuber_id', channel_id)
  return data
}



const VideosPage = () => {
  const { channel_id } = useLocalSearchParams()
  const { data: videosData, error, isLoading } = useQuery({
    queryKey: ['videos', channel_id],
    queryFn: () => fetchVideosData(channel_id as string),
  })
  // console.log("videosData: ", videosData)
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <View className="rounded-2xl bg-white p-8 shadow-xl w-full">
          <View className="items-center">
            <View className="h-16 w-16 rounded-full bg-red-100 items-center justify-center mb-4 animate-pulse">
              <Text className="text-3xl">🎬</Text>
            </View>
            <Text className="text-xl font-bold text-gray-800 mb-2">Loading Videos</Text>
            <Text className="text-gray-600 text-center">
              Please wait while we fetch the latest videos...
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
              We couldn't load the videos. Please try again later.
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-red-500 px-6 py-3 rounded-xl active:bg-red-600">
              <Text className="text-white font-medium">Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number | null) => {
    // Handle null, undefined, or invalid values
    if (seconds == null || typeof seconds !== 'number' || isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Add Math.floor here too

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    // return `0:00`;
    
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{
        title: `${videosData[0]?.yt_channels?.name}`,
      }} />
      {/* Gradient Header */}
      <View className="bg-gradient-to-r from-red-600 to-red-500 bg-red-600 px-6 py-6">
        <Text className="text-2xl font-bold text-white">Latest Videos</Text>
        <Text className="text-white/80 font-semibold">Discover the latest content</Text>
      </View>

      {/* Videos Grid */}
      <View className="px-4 py-4">
        {videosData.map((video, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
            onPress={() => router.push(`/channel/videos/${video.id}`)}
          >
            {/* Thumbnail Section */}
            <View className="relative">
              <Image
                source={{ uri: video?.preview_image }}
                className="w-full h-56"
                resizeMode="cover"
              />
              {/* Duration Badge */}
              <View className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Text className="text-white font-medium text-sm">
                  {formatDuration(video?.video_length)}
                </Text>
              </View>
            </View>

            {/* Content Section */}
            <View className="p-5">
              <View className="flex-row">
                {/* Channel Avatar */}
                <Image
                  source={{ uri: video?.yt_channels?.profile_image }}
                  className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                />
                {/* Title and Stats */}
                <View className="flex-1 ml-3">
                  <Text
                    className="text-gray-900 font-bold text-lg mb-1"
                    numberOfLines={2}
                  >
                    {video?.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-gray-700 font-medium">{video?.yt_channels?.handle}</Text>
                    {video?.verified && (
                      <View className="ml-1 bg-blue-500 rounded-full p-0.5 px-1">
                        <Text className="text-white text-xs">✓</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Stats Row */}
              <View className="flex-row items-center mt-4 bg-gray-50 p-3 rounded-xl">
                <View className="flex-row items-center">
                  <Text className="text-gray-900 font-semibold">
                    {formatNumber(video?.views)} views
                  </Text>
                  <Text className="text-gray-400 mx-2">•</Text>
                  <Text className="text-gray-900">
                    {new Date(video?.date_posted)?.toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {/* Description Preview */}
              <Text
                className="text-gray-600 mt-4 text-base leading-6"
                numberOfLines={3}
              >
                {video?.description}
              </Text>

              {/* Engagement Stats */}
              <View className="flex-row justify-between mt-6 pt-4 border-t border-gray-100">
                <View className="items-center bg-gray-50 px-4 py-2 rounded-xl">
                  <Text className="text-gray-900 font-bold text-lg">
                    {formatNumber(video?.likes)}
                  </Text>
                  <Text className="text-gray-600">Likes</Text>
                </View>
                <View className="items-center bg-gray-50 px-4 py-2 rounded-xl">
                  <Text className="text-gray-900 font-bold text-lg">
                    {formatNumber(video?.num_comments)}
                  </Text>
                  <Text className="text-gray-600">Comments</Text>
                </View>
                <View className="items-center bg-gray-50 px-4 py-2 rounded-xl">
                  <Text className="text-gray-900 font-bold text-lg">
                    {formatNumber(video?.yt_channels?.subscribers)}
                  </Text>
                  <Text className="text-gray-600">Subscribers</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default VideosPage