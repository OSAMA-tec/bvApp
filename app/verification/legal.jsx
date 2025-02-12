import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LegalCompliance = () => {
    const complianceChecks = [
        {
            id: '1',
            title: 'Zoning Compliance',
            status: 'Verified',
            date: '2024-03-15',
            details: 'Property zoned for residential use',
            authority: 'City Planning Department'
        },
        {
            id: '2',
            title: 'Building Permits',
            status: 'Pending',
            date: '2024-03-14',
            details: 'Renovation permits under review',
            authority: 'Building Department'
        },
        {
            id: '3',
            title: 'Property Taxes',
            status: 'Verified',
            date: '2024-03-13',
            details: 'All taxes paid and current',
            authority: 'County Tax Office'
        },
        {
            id: '4',
            title: 'Environmental Compliance',
            status: 'Required',
            details: 'Environmental assessment needed',
            authority: 'Environmental Protection Agency'
        }
    ];

    const ComplianceCard = ({ check }) => (
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
                            name="gavel"
                            size={24}
                            color="#af67db"
                        />
                        <Text className="text-white font-psemibold ml-2">{check.title}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${check.status === 'Verified' ? 'bg-green-500/20' :
                            check.status === 'Pending' ? 'bg-yellow-500/20' :
                                'bg-red-500/20'
                        }`}>
                        <Text className={`font-pbold ${check.status === 'Verified' ? 'text-green-500' :
                                check.status === 'Pending' ? 'text-yellow-500' :
                                    'text-red-500'
                            }`}>
                            {check.status}
                        </Text>
                    </View>
                </View>

                <Text className="text-gray-100">{check.details}</Text>
                <Text className="text-gray-100 text-sm mt-1">Authority: {check.authority}</Text>
                {check.date && (
                    <Text className="text-gray-100 text-sm mt-1">
                        Last Updated: {check.date}
                    </Text>
                )}

                <TouchableOpacity className="mt-3">
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                        className="py-2 rounded-lg"
                    >
                        <Text className="text-center text-white font-pmedium">
                            {check.status === 'Required' ? 'Start Verification' : 'View Details'}
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

                    <Text className="text-2xl text-white font-psemibold">Legal Compliance</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Verify property legal requirements
                    </Text>
                </Animatable.View>

                {/* Compliance Status */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold">Compliance Status</Text>
                        <View className="h-2 bg-black-100/50 rounded-full mt-2">
                            <View className="h-full bg-secondary rounded-full w-[75%]" />
                        </View>
                        <Text className="text-gray-100 text-sm mt-2">
                            3 of 4 compliance checks completed
                        </Text>
                    </LinearGradient>
                </Animatable.View>

                {/* Compliance Checks */}
                {complianceChecks.map((check) => (
                    <ComplianceCard key={check.id} check={check} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default LegalCompliance; 