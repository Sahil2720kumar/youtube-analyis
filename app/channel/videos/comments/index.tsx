import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { formatNumber } from '~/utils/formatNumber';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { supabase } from '~/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const getCommentsByVideoUrl = async (video_url: string) => {
  const { data, error } = await supabase.from('yt_comments').select('*').eq('url', video_url);
  return data;
};

const CommentsList = () => {
  const { video_url } = useLocalSearchParams();
  console.log(video_url);

  const getAvatarLetter = (username: string) => {
    if (!username) return '?';
    // Remove @ symbol and get first letter, fallback to '?'
    return username.replace('@', '').charAt(0).toUpperCase() || '?';
  };

  const getRandomColor = (username: string) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
      'bg-green-100 text-green-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600',
    ];
    // Use username to consistently get same color for same user
    const index = username.length % colors.length;
    return colors[index];
  };

  const {
    data: commentsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['video', video_url],
    queryFn: () => getCommentsByVideoUrl(video_url as string),
  });

  // console.log(commentsData);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Stack.Screen
          options={{
            title: 'Comments',
            headerStyle: { backgroundColor: 'white' },
            headerShadowVisible: false,
          }}
        />
        <View className="w-full rounded-2xl bg-white p-8 shadow-xl">
          <View className="items-center">
            <View className="mb-4 h-16 w-16 animate-pulse items-center justify-center rounded-full bg-red-100">
              <Text className="text-3xl">🎬</Text>
            </View>
            <Text className="mb-2 text-xl font-bold text-gray-800">Loading Comments</Text>
            <Text className="text-center text-gray-600">
              Please wait while we prepare your comments content...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Stack.Screen
          options={{
            title: 'Comments',
            headerStyle: { backgroundColor: 'white' },
            headerShadowVisible: false,
          }}
        />
        <View className="w-full rounded-2xl bg-white p-8 shadow-xl">
          <View className="items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Text className="text-3xl">⚠️</Text>
            </View>
            <Text className="mb-2 text-xl font-bold text-gray-800">Oops! Something went wrong</Text>
            <Text className="mb-6 text-center text-gray-600">
              {error?.message || "We couldn't load the comments. Please try again later."}
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

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          title: 'Comments',
          headerStyle: { backgroundColor: 'white' },
          headerShadowVisible: false,
        }}
      />
      {commentsData?.map((comment) => (
        <View
          key={comment.id}
          className="mx-4 mb-3 mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          {/* Comment Header */}
          <View className="mb-4 flex-row items-center">
            {/* User Avatar with dynamic color */}
            <View
              className={`h-11 w-11 items-center justify-center rounded-full ${getRandomColor(comment.username)}`}>
              <Text className="text-lg font-bold">{getAvatarLetter(comment.username)}</Text>
            </View>

            {/* Username and Date */}
            <View className="ml-3 flex-1">
              <Text className="text-[15px] font-semibold text-gray-800">
                {comment.username || 'Anonymous'}
              </Text>
              <Text className="text-sm text-gray-400">{comment.date || 'No date'}</Text>
            </View>
          </View>

          {/* Comment Text */}
          <Text className="mb-4 text-[15px] leading-[22px] text-gray-700">
            {comment.comment_text || 'No comment'}
          </Text>

          {/* Engagement Stats */}
          <View className="flex-row items-center border-t border-gray-100 pt-3">
            <View className="mr-6 flex-row items-center">
              <MaterialIcons name="thumb-up-off-alt" size={18} color="#6B7280" />
              <Text className="ml-2 font-medium text-gray-500">
                {formatNumber(comment.likes || 0)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="chat-bubble-outline" size={18} color="#6B7280" />
              <Text className="ml-2 font-medium text-gray-500">{comment.replies || 0} replies</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CommentsList;
