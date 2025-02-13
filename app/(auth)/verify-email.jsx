import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import * as Animatable from "react-native-animatable";

import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { authAPI } from "../../lib/api";

const VerifyEmail = () => {
    const { email } = useLocalSearchParams();
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResend = async () => {
        try {
            setSubmitting(true);
            await authAPI.resendVerification(email);
            setTimer(600); // Reset timer to 10 minutes
            Alert.alert("Success", "Verification code sent successfully");
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to resend verification code");
        } finally {
            setSubmitting(false);
        }
    };

    const handleVerify = async () => {
        if (code.length !== 6) {
            Alert.alert("Error", "Please enter a valid 6-character code");
            return;
        }

        try {
            setSubmitting(true);
            const response = await authAPI.verifyEmail({ email, code });
            if (response.success) {
                Alert.alert("Success", "Email verified successfully", [
                    {
                        text: "Continue to Login",
                        onPress: () => {
                            router.replace("/sign-in");
                        },
                    },
                ]);
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to verify email");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
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
                    <Animatable.View
                        animation="fadeInUp"
                        duration={1000}
                        delay={300}
                        className="bg-black-100/50 rounded-2xl p-6 backdrop-blur-lg mb-6"
                    >
                        <Text className="text-3xl font-semibold text-white font-psemibold">
                            Verify Your Email
                        </Text>
                        <Text className="text-gray-100 mt-2 font-pregular">
                            Enter the 6-character code sent to {email}
                        </Text>
                        <Text className="text-secondary mt-2 font-pregular">
                            Time remaining: {formatTime(timer)}
                        </Text>
                    </Animatable.View>

                    <Animatable.View
                        animation="fadeInUp"
                        duration={1000}
                        delay={500}
                    >
                        <FormField
                            title="Verification Code"
                            value={code}
                            handleChangeText={(e) => setCode(e.toUpperCase())}
                            otherStyles="mt-7"
                            maxLength={6}
                            autoCapitalize="characters"
                        />
                    </Animatable.View>

                    <Animatable.View
                        animation="fadeInUp"
                        duration={1000}
                        delay={700}
                    >
                        <CustomButton
                            title="Verify Email"
                            handlePress={handleVerify}
                            containerStyles="mt-7 shadow-lg shadow-secondary-200/50"
                            isLoading={isSubmitting}
                        />

                        <CustomButton
                            title="Resend Code"
                            handlePress={handleResend}
                            containerStyles="mt-4"
                            isDisabled={timer > 0}
                            variant="secondary"
                        />
                    </Animatable.View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VerifyEmail; 