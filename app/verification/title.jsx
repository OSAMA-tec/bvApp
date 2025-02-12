import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TitleVerification = () => {
    const titleChecks = [
        {
            id: '1',
            title: 'Ownership History',
            status: 'Verified',
            date: '2024-03-15',
            details: 'Clear chain of title established',
            verifiedBy: 'ABC Title Company'
        },
        {
            id: '2',
            title: 'Liens & Encumbrances',
            status: 'Verified',
            date: '2024-03-14',
            details: 'No active liens found',
            verifiedBy: 'ABC Title Company'
        },
        {
            id: '3',
            title: 'Boundary Survey',
            status: 'In Progress',
            date: '2024-03-13',
            details: 'Survey being conducted',
            verifiedBy: 'XYZ Surveyors'
        },
        {
            id: '4',
            title: 'Easements',
            status: 'Verified',
            date: '2024-03-12',
            details: 'Utility easements documented',
            verifiedBy: 'ABC Title Company'
        }
    ];

    const TitleCheckCard = ({ check }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name="certificate"
                            size={24}
                            color="#af67db"
                        />
                        <Text className="text-white font-psemibold ml-2">{check.title}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${check.status === 'Verified' ? 'bg-green-500/20' :
                            check.status === 'In Progress' ? 'bg-yellow-500/20' :
                                'bg-red-500/20'
                        }`}>
                        <Text className={`font-pbold ${check.status === 'Verified' ? 'text-green-500' :
                                check.status === 'In Progress' ? 'text-yellow-500' :
                                    'text-red-500'
                            }`}>
                            {check.status}
                        </Text>
                    </View>
                </View>

                <Text className="text-gray-100">{check.details}</Text>
                <Text className="text-gray-100 text-sm mt-1">Verified by: {check.verifiedBy}</Text>
                <Text className="text-gray-100 text-sm">Last Updated: {check.date}</Text>

                <TouchableOpacity className="mt-3">
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                        className="py-2 rounded-lg"
                    >
                        <Text className="text-center text-white font-pmedium">
                            View Documentation
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
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

                    <Text className="text-2xl text-white font-psemibold">Title Verification</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Property title verification status
                    </Text>
                </Animatable.View>

                {/* Title Status Overview */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <View className="flex-row justify-between items-center mb-3">
                            <Text className="text-white font-psemibold">Title Status</Text>
                            <View className="px-3 py-1 rounded-full bg-green-500/20">
                                <Text className="text-green-500 font-pbold">75% Complete</Text>
                            </View>
                        </View>
                        <View className="h-2 bg-black-100/50 rounded-full">
                            <View className="h-full bg-secondary rounded-full w-[75%]" />
                        </View>
                        <Text className="text-gray-100 text-sm mt-2">
                            3 of 4 verifications completed
                        </Text>
                    </LinearGradient>
                </Animatable.View>

                {/* Title Checks */}
                {titleChecks.map((check) => (
                    <TitleCheckCard key={check.id} check={check} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default TitleVerification; 