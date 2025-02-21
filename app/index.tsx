import { router, Stack } from 'expo-router';
import { View, Text, TextInput, ScrollView   } from 'react-native';
import { useState } from 'react';

import { Button } from '~/components/Button';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const [channelUrl, setChannelUrl] = useState('');

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
        <View className="px-6 pt-16 pb-12 bg-gradient-to-br from-red-600 to-red-700">
          <Text className="text-4xl font-bold text-white text-center mb-3">
            YouTube Channel Analytics
          </Text>
          <Text className="text-white text-center text-lg opacity-90 px-4">
            Unlock powerful insights about any YouTube channel
          </Text>
        </View>

        {/* Search Section */}
        <View className="px-6 -mt-8">
          <View className="bg-white rounded-2xl shadow-xl p-8">
            <Text className="text-gray-700 text-lg mb-4 text-center font-medium">
              Enter a YouTube channel URL to get started
            </Text>
            <TextInput
              className="bg-gray-50 rounded-xl px-5 py-4 mb-5 border border-gray-200 text-base"
              placeholder="https://www.youtube.com/user/channelname"
              value={channelUrl}
              onChangeText={setChannelUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button 
              title="Analyze Channel"
              onPress={() => {
                router.push(`/channel?url=${channelUrl}`);
              }}
              className="bg-gradient-to-r from-red-600 to-red-500 py-4 rounded-xl"
            />
          </View>
        </View>

        {/* Features Section */}
        <View className="px-6 mt-12">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            What you'll get
          </Text>
          <View className="space-y-5">
            {[
              { icon: "📊", title: "Detailed Statistics", desc: "Subscriber count, video views, and engagement metrics" },
              { icon: "📈", title: "Growth Analysis", desc: "Track channel performance over time" },
              { icon: "🎯", title: "Channel Insights", desc: "Understand audience and content strategy" },
            ].map((feature, index) => (
              <View key={index} className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl shadow-md">
                <View className="flex-row items-center">
                  <Text className="text-3xl mr-4">{feature.icon}</Text>
                  <View className="flex-1">
                    <Text className="font-bold text-lg text-gray-800">{feature.title}</Text>
                    <Text className="text-gray-600 mt-1 text-base">{feature.desc}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Popular Channels */}
        <View className="px-6 mt-12">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Popular Channels
          </Text>
          <View className="space-y-4">
            {[
              { name: "MrBeast", handle: "@MrBeast", subscribers: "100M+" },
              { name: "PewDiePie", handle: "@PewDiePie", subscribers: "111M+" },
              { name: "Markiplier", handle: "@markiplier", subscribers: "35M+" },
            ].map((channel, index) => (
              <View key={index} className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl shadow-md flex-row items-center">
                <View className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full items-center justify-center mr-4">
                  <Text className="text-white font-bold text-lg">{channel.name[0]}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-lg text-gray-800">{channel.name}</Text>
                  <Text className="text-gray-500">{channel.handle}</Text>
                </View>
                <Text className="text-gray-700 font-semibold">{channel.subscribers}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Searches */}
        <View className="px-6 mt-12 mb-10">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Recent Searches
          </Text>
          <View className="space-y-3">
            {[
              "https://youtube.com/@veritasium",
              "https://youtube.com/@MKBHD",
              "https://youtube.com/@kurzgesagt",
            ].map((search, index) => (
              <View key={index} className="bg-gradient-to-br from-white to-gray-50 px-5 py-4 rounded-xl shadow-md flex-row items-center">
                <Text className="text-gray-400 mr-4 text-lg">🕒</Text>
                <Text className="text-gray-700 flex-1 font-medium">{search}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </> 
  );
}
