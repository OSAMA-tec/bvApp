import { useState, useCallback } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { authAPI } from "../../lib/api";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
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
    // Validate required fields
    const requiredFields = {
      email: 'Email',
      password: 'Password'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !form[key])
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      return Alert.alert(
        "Required Fields Missing",
        `Please fill in the following required fields:\n${missingFields.join('\n')}`,
        [{ text: "OK" }]
      );
    }

    try {
      setSubmitting(true);

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await authAPI.login({
        email: form.email.trim().toLowerCase(),
        password: form.password
      });

      // Save token and user data
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));

      setUser(response.user);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      const errorMessage = error.message || "Login failed. Please check your credentials and try again.";
      console.error('Login error:', error);
      Alert.alert("Error", errorMessage);
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
        <View className="absolute top-10 left-5 w-20 h-20 rounded-full bg-secondary-200 blur-xl" />
        <View className="absolute bottom-20 right-5 w-32 h-32 rounded-full bg-secondary-100 blur-xl" />
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
              Welcome Back to BlockVest
            </Text>
            <Text className="text-gray-100 mt-2 font-pregular">
              Your Gateway to Smart Real Estate Investment
            </Text>
          </Animatable.View>

          {/* Form Fields */}
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={500}
          >
            <FormField
              title="Email"
              value={form.email}
              placeholder="Enter your email"
              iconName="email-outline"
              keyboardType="email-address"
              required
              onChangeText={(value) => handleFormChange(value, 'email')}
              autoCapitalize="none"
            />

            <FormField
              title="Password"
              value={form.password}
              placeholder="Enter your password"
              iconName="lock-outline"
              secureTextEntry
              required
              onChangeText={(value) => handleFormChange(value, 'password')}
            />
          </Animatable.View>

          {/* Button Section */}
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={700}
          >
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7 shadow-lg shadow-secondary/50"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                Signup
              </Link>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
