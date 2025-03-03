import type React from "react"
import { useState, useEffect } from "react"
import { TouchableOpacity, Text, View, Animated, Easing, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialIcons } from "@expo/vector-icons"
import { supabase } from "~/lib/supabase"
import { useQueryClient } from "@tanstack/react-query"

interface VideoAnalysisButtonProps {
  onPress: () => void
  title?: string
  isLoading?: boolean
  gradientColors?: string[]
  className?: string
  videoId?:string
}

const VideoAnalysisButton: React.FC<VideoAnalysisButtonProps> = ({
  onPress,
  title = "Analyze Video",
  isLoading = false,
  gradientColors = ["#6C63FF", "#5A4FE0"],
  className = "",
  videoId,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1))
  const [rotateAnim] = useState(new Animated.Value(0))
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const queryClient = useQueryClient()
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start()
    } else {
      rotateAnim.setValue(0)
    }
  }, [isLoading, rotateAnim])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const AnimatedView = Animated.createAnimatedComponent(View)

  const handleVideoAnalysis = async () => {
    try {
      setIsAnalyzing(true)
      const { data, error } = await supabase.functions.invoke('ai_video_analysis', {
        body: {
          videoId: videoId,
      },
      
    })
    if (error) {
      console.error("Error fetching video analysis: ", error)
      throw new Error(error)
    } 
    console.log("Video analysis: ", data)
    queryClient.invalidateQueries({ queryKey: ['video', videoId] })
    setIsAnalyzing(false)
    } catch (error) {
      console.error("Error fetching video analysis: ", error)
      setIsAnalyzing(false)
    }
  }



  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleVideoAnalysis}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isLoading || isAnalyzing}
      className={`w-full items-center justify-center my-2.5 ${className}`}
    >
      <AnimatedView
        className="w-[90%] h-16 rounded-full overflow-hidden"
        style={{
          transform: [{ scale: scaleAnim }],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1 items-center justify-center px-5"
        >
          {isLoading || isAnalyzing ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="#fff" size="small" />
              <Text className="text-white text-base font-semibold ml-2.5">Analyzing...</Text>
            </View>
          ) : (
            <View className="flex-row items-center justify-center">
              <MaterialIcons name="video-settings" size={24} color="#fff" />
              <Text className="text-white text-lg font-semibold mx-2.5">{title}</Text>
              <Animated.View
                style={{
                  transform: [{ rotate: spin }],
                }}
                className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
              >
                <MaterialIcons name="analytics" size={18} color="#fff" />
              </Animated.View>
            </View>
          )}
        </LinearGradient>
      </AnimatedView>
    </TouchableOpacity>
  )
}

export default VideoAnalysisButton

