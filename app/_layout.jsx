import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          onError: (error) => {
            console.warn("Navigation error:", error);
          }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="prediction"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen name="prediction/analysis" />
        <Stack.Screen name="prediction/area" />
        <Stack.Screen name="prediction/risk" />
        <Stack.Screen name="prediction/market" />
        <Stack.Screen name="prediction/results" />
        <Stack.Screen name="investment/portfolio" />
        <Stack.Screen name="investment/performance" />
        <Stack.Screen name="investment/dividends" />
        <Stack.Screen name="investment/compare" />
        <Stack.Screen name="verification/property" />
        <Stack.Screen name="verification/title" />
        <Stack.Screen name="verification/documents" />
        <Stack.Screen name="verification/kyc" />
        <Stack.Screen name="verification/status" />
        <Stack.Screen name="blockchain/wallet" />
        <Stack.Screen name="blockchain/nft" />
        <Stack.Screen name="blockchain/transfer" />
        <Stack.Screen name="payment/gateway" />
        <Stack.Screen name="payment/history" />
        <Stack.Screen name="payment/status" />
        <Stack.Screen name="settings/profile" />
        <Stack.Screen name="settings/security" />
        <Stack.Screen name="settings/notifications" />
        <Stack.Screen name="support/chat" />
        <Stack.Screen name="support/tickets" />
        <Stack.Screen name="support/faq" />
        <Stack.Screen name="support/docs/investment-guide" />
        <Stack.Screen name="support/docs/property" />
        <Stack.Screen name="support/docs/market" />
        <Stack.Screen
          name="support/docs/article/[id]"
          options={{
            presentation: 'modal'
            //
          }}
        />
        <Stack.Screen
          name="search/[query]"
          options={{
            presentation: 'modal'
          }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
