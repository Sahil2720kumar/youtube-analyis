import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';

// Create a client
const queryClient = new QueryClient()

export default function Layout() {

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
      <StatusBar style="auto" />
    </QueryClientProvider>
  )
}
