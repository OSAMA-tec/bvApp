import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  const typingText = "Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with BlockVest - Your Gateway to Smart Real Estate Investment";

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Animatable.View
            animation="zoomIn"
            duration={1500}
            delay={500}
            className="w-full flex items-center"
          >
            <Image
              source={images.logo}
              className="max-w-[500px] w-full h-[400px] mb-4"
              resizeMode="contain"
            />
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={1000}
            className="relative mt-3"
          >
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Animatable.Text
                animation="pulse"
                iterationCount="infinite"
                duration={2000}
                className="text-secondary-200"
              >
                BlockVest
              </Animatable.Text>
            </Text>

            <Animatable.Image
              animation="slideInRight"
              duration={1000}
              delay={1500}
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </Animatable.View>

          <Animatable.Text
            animation={{
              from: {
                opacity: 0,
                height: 0,
              },
              to: {
                opacity: 1,
                height: 80,
              },
            }}
            duration={1000}
            delay={1500}
            className="text-sm font-pregular text-gray-100 mt-7 text-center"
          >
            {typingText.split('').map((char, index) => (
              <Animatable.Text
                key={index}
                animation={{
                  0: { opacity: 0 },
                  1: { opacity: 1 }
                }}
                duration={50}
                delay={1500 + (index * 50)}
              >
                {char}
              </Animatable.Text>
            ))}
          </Animatable.Text>

          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={2000}
            className="w-full"
          >
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7"
            />
          </Animatable.View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
