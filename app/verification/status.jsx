import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const VerificationStatus = () => {
    const verificationItems = [
        {
            id: '1',
            title: 'KYC Verification',
            progress: 25,
            status: 'In Progress',
            lastUpdate: '2024-03-15',
            route: '/verification/kyc'
        },
        {
            id: '2',
            title: 'Document Verification',
            progress: 66,
            status: 'Pending',
            lastUpdate: '2024-03-14',
            route: '/verification/documents'
        },
        {
            id: '3',
            title: 'Title Verification',
            progress: 75,
            status: 'In Progress',
            lastUpdate: '2024-03-13',
            route: '/verification/title'
        },
        {
            id: '4',
            title: 'Legal Compliance',
            progress: 100,
            status: 'Completed',
            lastUpdate: '2024-03-12',
            route: '/verification/legal'
        },
        {
            id: '5',
            title: 'Property Inspection',
            progress: 92,
            status: 'Almost Done',
            lastUpdate: '2024-03-11',
            route: '/verification/inspection'
        }
    ];

    const StatusCard = ({ item }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <TouchableOpacity onPress={() => router.push(item.route)}>
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl"
                >
                    <View className="flex-row justify-between items-center mb-2">
                        <View>
                            <Text className="text-white font-psemibold">{item.title}</Text>
                            <Text className="text-gray-100 text-sm">Last updated: {item.lastUpdate}</Text>
                        </View>
                        <View className={`px-3 py-1 rounded-full ${item.progress === 100 ? 'bg-green-500/20' :
                                item.progress > 70 ? 'bg-blue-500/20' :
                                    'bg-yellow-500/20'
                            }`}>
                            <Text className={`font-pbold ${item.progress === 100 ? 'text-green-500' :
                                    item.progress > 70 ? 'text-blue-500' :
                                        'text-yellow-500'
                                }`}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                    <View className="h-2 bg-black-100/50 rounded-full mt-2">
                        <View
                            className={`h-full bg-secondary rounded-full`}
                            style={{ width: `${item.progress}%` }}
                        />
                    </View>
                    <Text className="text-gray-100 text-sm mt-2">{item.progress}% Complete</Text>
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

                    <Text className="text-2xl text-white font-psemibold">Verification Status</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Track your verification progress
                    </Text>
                </Animatable.View>

                {/* Overall Progress */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold">Overall Progress</Text>
                        <View className="h-2 bg-black-100/50 rounded-full mt-2">
                            <View className="h-full bg-secondary rounded-full w-[71%]" />
                        </View>
                        <Text className="text-gray-100 text-sm mt-2">71% of all verifications completed</Text>
                    </LinearGradient>
                </Animatable.View>

                {/* Verification Items */}
                {verificationItems.map((item) => (
                    <StatusCard key={item.id} item={item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default VerificationStatus; 