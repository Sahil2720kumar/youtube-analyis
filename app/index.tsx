import { router, Stack } from 'expo-router';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { ScreenContent } from '~/components/ScreenContent';
import { supabase } from '~/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [channelUrl, setChannelUrl] = useState('');
  const fetchRecentSearches = async () => {
    const { data, error } = await supabase.from('yt_channels').select('url,id').limit(4).order('created_at', { ascending: false });
    return data;
  }

  const { data: recentSearches, isLoading: recentSearchesLoading, error: recentSearchesError } = useQuery({
    queryKey: ['recentSearches'],
    queryFn: fetchRecentSearches,
  });

  console.log('recentSearches: ', recentSearches);
  
  const startAnalyzing = async () => {
    try {
      if (channelUrl === '') {
        return;
      }

      if (!channelUrl.includes('https://www.youtube.com/')) {
        alert('Please enter a valid YouTube channel URL');
        return;
      }

      // https://www.youtube.com/@jaidenanimations/about
      const channelHandle = channelUrl.split('@')[1].split('/')[0];
      // if (channelHandle || !channelHandle) {
      //   console.log(channelHandle);
        
      //   return;
      // }
      const { data: channelData, error: channelError } = await supabase.from('yt_channels').select("id").eq('handle', "@"+channelHandle).single();

      if (channelData) {
        
        console.log('channelData: ', channelData);
        router.push(`/channel/${channelData.id}`);
        return;
      }
      
      console.log('startAnalyzing channelUrl: ', channelUrl);
      const { data, error } = await supabase.functions.invoke('trigger_collection_api', {
        body: { url: channelUrl },
      });

      if (error) {
        throw new Error(error);
      }
      router.push(`/job/${data.id}`);
      // router.push(`/channel/UCX6OQ3DkcsbYNE6H8uQQuVA`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'YouTube Analytics',
          // headerStyle: { backgroundColor: '#FF0000' },
          // headerTintColor: '#fff',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <View className="bg-red-600 bg-gradient-to-br from-red-600 to-red-700 px-6 pb-12 pt-16">
          <Text className="mb-3 text-center text-4xl font-bold text-white">
            YouTube Channel Analytics
          </Text>
          <Text className="px-4 text-center text-lg text-white opacity-90">
            Unlock powerful insights about any YouTube channel
          </Text>
        </View>
        {/* Search Section */}
        <View className="-mt-8 px-6">
          <View className="rounded-2xl bg-white p-8 shadow-xl">
            <Text className="mb-4 text-center text-lg font-medium text-gray-700 ">
              Enter a YouTube channel URL to get started
            </Text>
            <TextInput
              className="mb-5 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-base"
              placeholder="https://www.youtube.com/user/channelname"
              value={channelUrl}
              onChangeText={setChannelUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button
              title="Analyze Channel"
              onPress={startAnalyzing}
              className="rounded-xl bg-red-500 bg-gradient-to-r from-red-600 to-red-500 py-4"
            />
          </View>
        </View>

        {/* Features Section */}
        <View className="mt-12 px-6">
          <Text className="mb-6 text-2xl font-bold text-gray-800">What you'll get</Text>
          <View className="gap-y-5">
            {[
              {
                icon: '📊',
                title: 'Detailed Statistics',
                desc: 'Subscriber count, video views, and engagement metrics',
              },
              { icon: '📈', title: 'Growth Analysis', desc: 'Track channel performance over time' },
              {
                icon: '🎯',
                title: 'Channel Insights',
                desc: 'Understand audience and content strategy',
              },
            ].map((feature, index) => (
              <View
                key={index}
                className="rounded-xl bg-white bg-gradient-to-br from-white to-gray-50 p-5 shadow-md">
                <View className="flex-row items-center">
                  <Text className="mr-4 text-3xl">{feature.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800">{feature.title}</Text>
                    <Text className="mt-1 text-base text-gray-600">{feature.desc}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Popular Channels */}
        <View className="mt-12 px-6">
          <Text className="mb-6 text-2xl font-bold text-gray-800">Popular Channels</Text>
          <View className="gap-y-4">
            {[
              { profile_img:"https://yt3.googleusercontent.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s160-c-k-c0x00ffffff-no-rj",id: 'UCX6OQ3DkcsbYNE6H8uQQuVA', name: 'MrBeast', handle: '@MrBeast', subscribers: '350M+', url: 'https://www.youtube.com/@MrBeast' },
              { profile_img:"https://yt3.googleusercontent.com/vik8mAiwHQbXiFyKfZ3__p55_VBdGvwxPpuPJBBwdbF0PjJxikXhrP-C3nLQAMAxGNd_-xQCIg=s160-c-k-c0x00ffffff-no-rj",id: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', name: 'PewDiePie', handle: '@PewDiePie', subscribers: '111M+', url: 'https://www.youtube.com/@PewDiePie' },
              { profile_img:"https://yt3.googleusercontent.com/ytc/AIdro_nfDvwu14-iN5YZcaLIomwno1_3oFcYTmG5_kn7SMj_nec=s160-c-k-c0x00ffffff-no-rj",id: 'UC7_YxT-KID8kRbqZo7MyscQ', name: 'Markiplier', handle: '@markiplier', subscribers: '35M+', url: 'https://www.youtube.com/@markiplier' },
              { profile_img:"https://yt3.googleusercontent.com/VdNMLGk6QNH3gRusX4H3drUDqTb0NxbQp9NLU7tOVY1U_Qy0ah8TK1NviXBwYyikhl89Zzg3=s160-c-k-c0x00ffffff-no-rj",id: 'UCYSa_YLoJokZAwHhlwJntIA', name: 'notjustdev', handle: '@notjustdev', subscribers: '120K+', url: 'https://www.youtube.com/@notjustdev' },
            ].map((channel, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(`/channel/${channel.id}`)}
                className="flex-row items-center rounded-xl bg-white bg-gradient-to-br from-white to-gray-50 p-5 shadow-md">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-red-500 bg-gradient-to-br from-red-500 to-red-600">
                  <Image source={{ uri: channel.profile_img }} className="h-12 w-12 rounded-full" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">{channel.name}</Text>
                  <Text className="text-gray-500">{channel.handle}</Text>
                </View>
                <Text className="font-semibold text-gray-700">{channel.subscribers}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Searches */}
        <View className="mb-10 mt-12 px-6">
          <Text className="mb-6 text-2xl font-bold text-gray-800">Recent Searches</Text>
          <View className="gap-y-3">
            {recentSearches?.map((search, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(`/channel/${search?.id}`)}
                className="flex-row items-center rounded-xl bg-white bg-gradient-to-br from-white to-gray-50 px-5 py-4 shadow-md">
                <Text className="mr-4 text-lg text-gray-400">🕒</Text>
                <Text className="flex-1 font-medium text-gray-700">{search?.url}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
