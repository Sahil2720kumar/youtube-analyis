import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { formatNumber } from '~/utils/formatNumber';

export default function Channel() {
  const { name } = useLocalSearchParams();
  const channelData = {
    url: 'https://www.youtube.com/user/adaymagazinechannel/about',
    handle: '@adaymagazinechannel',
    banner_img:
      'https://yt3.googleusercontent.com/ikGshR3MCEKjj6LZXyvzMNT6_hlazvZNYbkNfxXOahyyJMRUXjV9dMYk4Z877ArG7zn4KMM_=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profile_image:
      'https://yt3.googleusercontent.com/PaVecBbU367HYAPp0Kh5cR7HhZ7_bUOaJIpz9WQjXJ74-cmsP_WbI8KkgFicK1xP7ZBYAvCyDQ=s160-c-k-c0x00ffffff-no-rj',
    name: 'a day magazine',
    subscribers: 140000,
    videos_count: 1118,
    created_date: '2011-08-22T00:00:00.000Z',
    views: 28466004,
    Description: 'Official YouTube Channel of a day magazine, Thailand',
    Details: {
      location: 'Thailand',
    },
    Links: [
      'adaymagazine.com',
      'facebook.com/adaymagazine',
      'instagram.com/adaymagazine',
      'twitter.com/adaymagazine',
      'itunes.apple.com/th/app/a-day/id426371107?mt=8',
    ],
    identifier: 'UCx0uJ7MGVERJgjtWcHw2TiQ',
    discovery_input: {
      keyword: 'a day',
    },
    id: 'UCx0uJ7MGVERJgjtWcHw2TiQ',
    handle_md5: 'e4dcc7ebbd65e6377f55aca2b3f141c8',
  };

  return (
    <>
      <Stack.Screen options={{ title: channelData.name.toLocaleUpperCase() }} />
      <View className="flex-1">
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
      </View>
    </>
  );
}
