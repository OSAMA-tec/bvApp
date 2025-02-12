import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";

const TwoFactorAuth = () => {
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');

    const qrCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..."; // QR code image

    const steps = [
        {
            title: "Install Authenticator",
            description: "Download Google Authenticator or any other 2FA app"
        },
        {
            title: "Scan QR Code",
            description: "Open your authenticator app and scan the QR code"
        },
        {
            title: "Verify Setup",
            description: "Enter the 6-digit code from your authenticator app"
        }
    ];

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                {/* Header */}
                <Animatable.View
                    animation="fadeInDown"
                    className="mt-4 mb-6"
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-row items-center mb-4"
                    >
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                            className="p-2 rounded-xl flex-row items-center justify-center w-[100px]"
                        >
                            <MaterialCommunityIcons
                                name="chevron-left"
                                size={24}
                                color="#af67db"
                            />
                            <Text className="text-secondary ml-1 font-pmedium">Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text className="text-2xl text-white font-psemibold">
                        Two-Factor Authentication
                    </Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Set up 2FA for enhanced security
                    </Text>
                </Animatable.View>

                {/* Progress Steps */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <View className="flex-row justify-between mb-4">
                        {steps.map((s, index) => (
                            <View key={index} className="flex-1 items-center">
                                <View className={`w-8 h-8 rounded-full items-center justify-center ${step > index + 1 ? 'bg-green-500' :
                                    step === index + 1 ? 'bg-secondary' :
                                        'bg-gray-700'
                                    }`}>
                                    <Text className="text-white font-pbold">{index + 1}</Text>
                                </View>
                                {index < steps.length - 1 && (
                                    <View className={`h-0.5 w-full absolute top-4 left-1/2 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-700'
                                        }`} />
                                )}
                            </View>
                        ))}
                    </View>
                    <Text className="text-white font-psemibold text-center">
                        {steps[step - 1].title}
                    </Text>
                    <Text className="text-gray-100 text-center mt-1">
                        {steps[step - 1].description}
                    </Text>
                </Animatable.View>

                {/* Step Content */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    {step === 1 && (
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                            className="p-4 rounded-xl"
                        >
                            <View className="space-y-4">
                                <TouchableOpacity className="flex-row items-center">
                                    <Image
                                        source={{ uri: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US" }}
                                        className="w-12 h-12 rounded"
                                    />
                                    <View className="ml-3 flex-1">
                                        <Text className="text-white font-psemibold">
                                            Google Authenticator
                                        </Text>
                                        <Text className="text-gray-100">
                                            Download from Play Store
                                        </Text>
                                    </View>
                                    <MaterialCommunityIcons
                                        name="download"
                                        size={24}
                                        color="#af67db"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity className="flex-row items-center">
                                    <Image
                                        source={{ uri: "https://apps.apple.com/us/app/google-authenticator/id388497605" }}
                                        className="w-12 h-12 rounded"
                                    />
                                    <View className="ml-3 flex-1">
                                        <Text className="text-white font-psemibold">
                                            Google Authenticator
                                        </Text>
                                        <Text className="text-gray-100">
                                            Download from App Store
                                        </Text>
                                    </View>
                                    <MaterialCommunityIcons
                                        name="download"
                                        size={24}
                                        color="#af67db"
                                    />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    )}

                    {step === 2 && (
                        <View className="items-center">
                            <Image
                                source={{ uri: qrCode }}
                                className="w-64 h-64"
                            />
                            <Text className="text-gray-100 mt-4 text-center">
                                Can't scan? Use this code instead:
                            </Text>
                            <Text className="text-secondary font-pmedium mt-2">
                                ABCD EFGH IJKL MNOP
                            </Text>
                        </View>
                    )}

                    {step === 3 && (
                        <View>
                            <Text className="text-white font-psemibold mb-2">
                                Enter Verification Code
                            </Text>
                            <TextInput
                                value={verificationCode}
                                onChangeText={setVerificationCode}
                                placeholder="Enter 6-digit code"
                                placeholderTextColor="#666"
                                keyboardType="number-pad"
                                maxLength={6}
                                className="bg-black-100/50 p-4 rounded-xl text-white font-pregular text-center text-lg tracking-widest"
                            />
                        </View>
                    )}
                </Animatable.View>

                {/* Navigation Buttons */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <View className="flex-row space-x-4">
                        {step > 1 && (
                            <TouchableOpacity
                                onPress={() => setStep(step - 1)}
                                className="flex-1"
                            >
                                <LinearGradient
                                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                    className="p-4 rounded-xl"
                                >
                                    <Text className="text-white text-center font-psemibold">
                                        Back
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={() => {
                                if (step < 3) setStep(step + 1);
                                else {
                                    // Handle verification completion
                                    router.back();
                                }
                            }}
                            className="flex-1"
                        >
                            <LinearGradient
                                colors={['#af67db', '#6b8cce']}
                                className="p-4 rounded-xl"
                            >
                                <Text className="text-white text-center font-psemibold">
                                    {step === 3 ? 'Complete Setup' : 'Continue'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TwoFactorAuth; 