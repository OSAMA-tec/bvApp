import { useState, useCallback } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import * as Animatable from "react-native-animatable";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleFormChange = useCallback((value, fieldName) => {
    if (fieldName) {
      setForm(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
  }, []);

  const submit = async () => {
    if (form.fullname === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      // Here you would typically call your registration API
      // For now, we'll simulate a successful registration
      setTimeout(() => {
        setUser({
          email: form.email,
          name: form.fullname
        });
        router.push({
          pathname: "/verify-email",
          params: { email: form.email }
        });
      }, 1000);
    } catch (error) {
      Alert.alert("Error", error.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
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
              title="Full Name"
              value={form.fullname}
              placeholder="Enter your full name"
              iconName="account-outline"
              required
              onChangeText={handleFormChange}
              autoCapitalize="words"
            />

            <FormField
              title="Email"
              value={form.email}
              placeholder="Enter your email"
              iconName="email-outline"
              keyboardType="email-address"
              required
              onChangeText={handleFormChange}
              autoCapitalize="none"
            />

            <FormField
              title="Password"
              value={form.password}
              placeholder="Create a password"
              iconName="lock-outline"
              secureTextEntry
              required
              onChangeText={handleFormChange}
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
