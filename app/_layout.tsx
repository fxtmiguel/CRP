import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // State to check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // Placeholder: Set up your authentication check here, like retrieving a token.
    const token = null; // e.g., getToken() from AsyncStorage
    setIsAuthenticated(!!token); // Set based on token presence
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Conditionally render Login or Tabs based on authentication */}
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" />
        ) :  isSignUp ? (
          <Stack.Screen name="register" /> 
        ): (
          
          <Stack.Screen name="login" />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
