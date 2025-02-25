import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '~/lib/supabase'
import { router } from 'expo-router'


const JobPage = () => {
  const { snapshotId } = useLocalSearchParams()
  const queryClient = useQueryClient()
  const pulseAnim = useSharedValue(1)

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

  useEffect(() => {
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
          router.replace(`/channel/${updatedJob.channel_id}`)
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
          <Text className="text-2xl font-bold text-gray-800 mb-3">
            Analyzing Channel
          </Text>
          <Text className="text-xl font-bold text-gray-600 mb-3">
            Status: {data?.status === "ready" ? "Ready" : "Running..."}
          </Text>
          <Text className="text-base text-gray-600 text-center">
            We're gathering insights about your channel. This may take a few moments.
          </Text>
        </View>

        {/* Loading steps */}
        <View className="mt-12 w-full">
          {[
            'Fetching channel data...',
            'Processing statistics...',
            'Generating insights...'
          ].map((step, index) => (
            <View key={index} className="flex-row items-center mb-4">
              <View className="w-2 h-2 rounded-full bg-red-500 mr-3" />
              <Text className="text-gray-600">{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

export default JobPage