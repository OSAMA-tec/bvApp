import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const KYCVerification = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        {
            id: 1,
            title: 'Personal Information',
            status: 'completed',
            icon: 'account'
        },
        {
            id: 2,
            title: 'Identity Verification',
            status: 'current',
            icon: 'card-account-details'
        },
        {
            id: 3,
            title: 'Address Proof',
            status: 'pending',
            icon: 'home'
        },
        {
            id: 4,
            title: 'Final Review',
            status: 'pending',
            icon: 'check-circle'
        }
    ];

    const VerificationStep = ({ step }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <TouchableOpacity
                onPress={() => setCurrentStep(step.id)}
                disabled={step.status === 'pending'}
            >
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl"
                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons
                                name={step.icon}
                                size={24}
                                color="#af67db"
                            />
                            <View className="ml-3">
                                <Text className="text-white font-psemibold">{step.title}</Text>
                                <Text className="text-gray-100 font-pregular text-sm">
                                    {step.status === 'completed' ? 'Completed' :
                                        step.status === 'current' ? 'In Progress' :
                                            'Not Started'}
                                </Text>
                            </View>
                        </View>
                        <MaterialCommunityIcons
                            name={step.status === 'completed' ? 'check-circle' : 'chevron-right'}
                            size={24}
                            color={step.status === 'completed' ? '#22c55e' : '#af67db'}
                        />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                {/* Back Button and Header */}
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

                    <Text className="text-2xl text-white font-psemibold">KYC Verification</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Complete your identity verification
                    </Text>
                </Animatable.View>

                {/* Progress Bar */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold">Verification Progress</Text>
                        <View className="h-2 bg-black-100/50 rounded-full mt-2">
                            <View className="h-full bg-secondary rounded-full w-[25%]" />
                        </View>
                        <Text className="text-gray-100 text-sm mt-2">Step {currentStep} of 4</Text>
                    </LinearGradient>
                </Animatable.View>

                {/* Verification Steps */}
                {steps.map((step) => (
                    <VerificationStep key={step.id} step={step} />
                ))}

                {/* Continue Button */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={600}
                    className="mb-6"
                >
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#af67db', '#6b8cce']}
                            className="p-4 rounded-xl"
                        >
                            <Text className="text-white text-center font-psemibold">
                                Continue Verification
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default KYCVerification; 