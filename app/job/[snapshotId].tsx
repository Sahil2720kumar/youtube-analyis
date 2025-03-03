import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { View, Text } from 'react-native'
import React from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { supabase } from '~/lib/supabase'
import { YT_CHANNELS_DATASET_ID, YT_COMMENTS_DATASET_ID, YT_VIDEOS_DATASET_ID } from '~/utils/constants'

const JobPage = () => {
  const { snapshotId, type, video_url } = useLocalSearchParams()
  const queryClient = useQueryClient()
  const pulseAnim = useSharedValue(1)
  console.log("type: ", type, snapshotId, video_url);

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
    opacity: withTiming(pulseAnim.value === 1 ? 0.6 : 0.8, { duration: 1000 })
  }))


  const fetchJob = async (snapshotId: string) => {
    try {
      const { data, error } = await supabase.from('scrape_jobs').select('*').eq('id', snapshotId).single()
      if (error) {
        throw error
      }
      console.log("snapshotId data: ", data)
      return data
    } catch (error) {
      console.error('Error fetching job:', error)
      throw error
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['job', snapshotId],
    queryFn: () => fetchJob(snapshotId)
  })

  console.log("data: ", data);

  useEffect(() => {
    console.log("useEffect called");
    const channels = supabase.channel('supabase_realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'scrape_jobs', filter: `id=eq.${snapshotId}` },
        (payload) => {
          console.log('Change received!', payload)
          queryClient.invalidateQueries({ queryKey: ['job', snapshotId] })
          queryClient.invalidateQueries({ queryKey: ['channel', data?.channel_id] })
          queryClient.invalidateQueries({ queryKey: ['recentSearches'] })
          const updatedJob = payload.new

          if (updatedJob.dataset_id === YT_CHANNELS_DATASET_ID) {
            console.log("im here channel");

            router.replace(`/channel/${updatedJob.channel_id}`)
          } else if (updatedJob.dataset_id === YT_VIDEOS_DATASET_ID) {
            console.log("im here vidoes");
            router.replace(`/channel/videos/?channel_id=${updatedJob.channel_id}`)
          } else if (updatedJob.dataset_id === YT_COMMENTS_DATASET_ID) {
            console.log("im here comments");
            router.replace(`/channel/videos/comments/?channel_id=${updatedJob.channel_id}&video_url=${video_url}`)
          }
        }
      )
      .subscribe()

    return () => {
      channels.unsubscribe()
    }
  }, [])


  if (error) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <View className="items-center">
          <View className="w-16 h-16 rounded-full bg-red-100 mb-8 items-center justify-center">
            <Text className="text-red-500 text-2xl">!</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-3">
            Oops! Something went wrong
          </Text>
          <Text className="text-base text-gray-600 text-center">
            {error?.message || "We encountered an error while fetching the channel data. Please try again later."}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Analyzing Channel' }} />
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        {/* Main loading container */}
        <View className="items-center">
          <Animated.View
            style={animatedStyle}
            className="w-16 h-16 rounded-full bg-red-500 mb-8"
          />
          <Text className="text-2xl font-bold text-gray-800 mb-3 capitalize">
            Analyzing {type}
          </Text>
          <Text className="text-xl font-bold text-gray-600 mb-3">
            Status: {data?.status.trim() === "ready" ? "Ready" : "Running..."}
          </Text>
          <Text className="text-base text-gray-600 text-center capitalize">
            We're gathering insights about your {type}. This may take a few moments.
          </Text>
          {type === "videos" && <Text className="text-base text-gray-600 text-center">  Average time: 3-4 minutes</Text>}
          {type === "comments" && <Text className="text-base text-gray-600 text-center">  Average time: 1-2 minutes</Text>}
        </View>

        {/* Loading steps */}
        <View className="mt-12 w-full">
          {[
            `Fetching ${type} data...`,
            `Processing ${type} statistics...`,
            `Generating ${type} insights...`
          ].map((step, index) => (
            <View key={index} className="flex-row items-center mb-4">
              <View className="w-2 h-2 rounded-full bg-red-500 mr-3" />
              <Text className="text-gray-600 capitalize">{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

export default JobPage