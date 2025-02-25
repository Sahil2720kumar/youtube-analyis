import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Text, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Container } from '~/components/Container';
import { formatNumber } from '~/utils/formatNumber';
import { supabase } from '~/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const fetchChannelData = async (channel_id: string) => {
  const { data, error } = await supabase.from('yt_channels').select('*').eq('id', channel_id).single()
  if (error) {
    throw error
  }
  return data
}

export default function Channel() {
  const { channel_id } = useLocalSearchParams();
  // console.log("channel_id: ", channel_id);
  
  const { data: channelData, error, isLoading } = useQuery({
    queryKey: ['channel', channel_id],
    queryFn: () => fetchChannelData(channel_id as string),
  })

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <View className="rounded-2xl bg-white p-8 shadow-xl w-full">
          <View className="items-center">
            <View className="h-16 w-16 rounded-full bg-red-100 items-center justify-center mb-4">
              <Text className="text-3xl">📺</Text>
            </View>
            <Text className="text-xl font-bold text-gray-800 mb-2">Loading Channel</Text>
            <Text className="text-gray-600 text-center">
              Please wait while we fetch the channel information...
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
            <Text className="text-gray-600 text-center mb-4">
              {error?.message}
            </Text>
            <Pressable 
              onPress={() => router.back()}
              className="bg-red-500 px-6 py-3 rounded-xl">
              <Text className="text-white font-medium">Go Back</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: channelData.name.toLocaleUpperCase() }} />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Banner Image */}
        <Image
          source={{ uri: channelData.banner_img }}
          className="w-full h-56 absolute top-0"
        />

        {/* Channel Info Section */}
        <View className="mt-48 bg-white rounded-t-3xl shadow-lg">
          <View className="flex-row p-6 items-center">
            <Image
              source={{ uri: channelData.profile_image }}
              className="w-24 h-24 rounded-full border-4 border-white shadow-sm"
            />
            <View className="flex-1 ml-4">
              <Text className="text-2xl font-bold mb-1">{channelData.name}</Text>
              <Text className="text-gray-600">{channelData.handle}</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between px-6 py-4 bg-gray-50 border-t border-b border-gray-100">
            <View className="items-center flex-1">
              <Text className="font-bold text-lg">{formatNumber(channelData.subscribers)}</Text>
              <Text className="text-sm text-gray-600">Subscribers</Text>
            </View>
            <View className="items-center flex-1 border-x border-gray-200">
              <Text className="font-bold text-lg">{formatNumber(channelData.videos_count)}</Text>
              <Text className="text-sm text-gray-600">Videos</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="font-bold text-lg">{formatNumber(channelData.views)}</Text>
              <Text className="text-sm text-gray-600">Views</Text>
            </View>
          </View>

          {/* Description Section */}
          <View className="p-6">
            <Text className="text-gray-800 leading-6">{channelData.Description}</Text>
            <View className="mt-4 flex-row items-center">
              <Text className="text-gray-600 mr-2">📍</Text>
              <Text className="text-gray-600">{channelData.Details.location}</Text>
              <Text className="text-gray-600 mx-2">•</Text>
              <Text className="text-gray-600">Joined {new Date(channelData.created_date).getFullYear()}</Text>
            </View>
          </View>

          {/* Links Section */}
          {channelData.Links.length > 0 && (
            <View className="px-6 pb-6">
              <Text className="font-bold text-lg mb-3">Links</Text>
              {channelData.Links.map((link, index) => (
                <Text key={index} className="text-blue-600 mb-2 underline">
                  {link}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
