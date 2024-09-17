import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import React, { Suspense } from 'react'
import RootApplication from './app/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { AppActivityIndicator } from './components/ActivityIndicator';
export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<AppActivityIndicator />}>
        <RootApplication />
        <StatusBar style="light" backgroundColor='#000' />
      </Suspense>
    </QueryClientProvider>
  )
}
