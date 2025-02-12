import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import * as Animatable from "react-native-animatable";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setUser({
        email: form.email,
        username: form.username
      }); // Set minimal user data
      setIsLogged(true);
      setSubmitting(false);
      router.replace("/home");
    }, 1000);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* Animated Background Elements */}
      <Animatable.View
        animation="fadeIn"
        duration={2000}
        className="absolute top-0 left-0 w-full h-full opacity-30"
      >
        <View className="absolute top-10 right-5 w-20 h-20 rounded-full bg-secondary-200 blur-xl" />
        <View className="absolute bottom-20 left-5 w-32 h-32 rounded-full bg-secondary-100 blur-xl" />
      </Animatable.View>

      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* Enhanced Logo Section */}
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            className="items-center mb-8"
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[300px] h-[200px]"
            />
          </Animatable.View>

          {/* Title Section */}
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={300}
            className="bg-black-100/50 rounded-2xl p-6 backdrop-blur-lg mb-6"
          >
            <Text className="text-3xl font-semibold text-white font-psemibold">
              Join BlockVest Today
            </Text>
            <Text className="text-gray-100 mt-2 font-pregular">
              Start Your Smart Investment Journey
            </Text>
          </Animatable.View>

          {/* Form Fields */}
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={500}
          >
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
          </Animatable.View>

          {/* Button Section */}
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={700}
          >
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7 shadow-lg shadow-secondary-200/50"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                Login
              </Link>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
