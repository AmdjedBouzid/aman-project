import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" />
      <Stack.Screen name="PasswordAuthScreen" />
    </Stack>
  );
}
