import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from "@expo/vector-icons";
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }:any) => <Ionicons size={28} name="grid-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        options={{
          title: 'NotificationScreen',
          tabBarIcon: ({ color }:any) => <Ionicons size={28} name="notifications-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settingScreen"
        options={{
          title: 'settingScreen',
          tabBarIcon: ({ color }:any) => <Ionicons size={28} name="settings-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
