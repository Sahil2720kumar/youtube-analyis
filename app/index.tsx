import { router, Stack } from 'expo-router';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { ScreenContent } from '~/components/ScreenContent';
import { supabase } from '~/lib/supabase';

export default function Home() {
  const [channelUrl, setChannelUrl] = useState('');

  const startAnalyzing = async () => {
    try {
      console.log('startAnalyzing ');
      const { data, error } = await supabase.functions.invoke('trigger_collection_api', {
        body: { url: channelUrl },
      });

      if (error) {
        throw new Error(error);
      }
      console.log(data);

      router.push('/channel');
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
              { name: 'MrBeast', handle: '@MrBeast', subscribers: '100M+' },
              { name: 'PewDiePie', handle: '@PewDiePie', subscribers: '111M+' },
              { name: 'Markiplier', handle: '@markiplier', subscribers: '35M+' },
            ].map((channel, index) => (
              <View
                key={index}
                className="flex-row items-center rounded-xl bg-white bg-gradient-to-br from-white to-gray-50 p-5 shadow-md">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-red-500 bg-gradient-to-br from-red-500 to-red-600">
                  <Text className="text-lg font-bold text-white">{channel.name[0]}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">{channel.name}</Text>
                  <Text className="text-gray-500">{channel.handle}</Text>
                </View>
                <Text className="font-semibold text-gray-700">{channel.subscribers}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Searches */}
        <View className="mb-10 mt-12 px-6">
          <Text className="mb-6 text-2xl font-bold text-gray-800">Recent Searches</Text>
          <View className="gap-y-3">
            {[
              'https://youtube.com/@veritasium',
              'https://youtube.com/@MKBHD',
              'https://youtube.com/@kurzgesagt',
            ].map((search, index) => (
              <View
                key={index}
                className="flex-row items-center rounded-xl bg-white bg-gradient-to-br from-white to-gray-50 px-5 py-4 shadow-md">
                <Text className="mr-4 text-lg text-gray-400">🕒</Text>
                <Text className="flex-1 font-medium text-gray-700">{search}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
