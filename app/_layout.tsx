import { StatusBar } from 'expo-status-bar';
import '../global.css';

import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (<>
    <Stack />
    <StatusBar style="auto" />
  </>)
}
