import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AnimatedSplashScreen from '~/components/AnimatedSplashScreen';

// Create a client
const queryClient = new QueryClient()

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <AnimatedSplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
      <StatusBar style="auto" />
    </QueryClientProvider>
  )
}
