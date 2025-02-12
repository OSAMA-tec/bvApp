import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PropertyInspection = () => {
    const inspectionReports = [
        {
            id: '1',
            type: 'Structural Inspection',
            date: '2024-03-15',
            status: 'Completed',
            score: '95/100',
            inspector: 'John Smith',
            findings: [
                'Foundation in excellent condition',
                'No structural issues detected',
                'Minor repairs recommended for gutters'
            ]
        },
        {
            id: '2',
            type: 'Electrical Systems',
            date: '2024-03-14',
            status: 'Completed',
            score: '90/100',
            inspector: 'Sarah Johnson',
            findings: [
                'All circuits functioning properly',
                'Updated wiring throughout',
                'Recommended: Add more outlets in kitchen'
            ]
        },
        {
            id: '3',
            type: 'Plumbing Inspection',
            date: '2024-03-16',
            status: 'Scheduled',
            inspector: 'Mike Brown',
        }
    ];

    const InspectionCard = ({ report }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name="clipboard-check"
                            size={24}
                            color="#af67db"
                        />
                        <Text className="text-white font-psemibold ml-2">{report.type}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${report.status === 'Completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                        <Text className={`font-pbold ${report.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                            }`}>
                            {report.status}
                        </Text>
                    </View>
                </View>

                <View className="space-y-2">
                    <Text className="text-gray-100">Inspector: {report.inspector}</Text>
                    <Text className="text-gray-100">Date: {report.date}</Text>
                    {report.score && (
                        <View className="flex-row items-center">
                            <Text className="text-secondary font-pmedium">{report.score}</Text>
                            <Text className="text-gray-100 ml-2">Inspection Score</Text>
                        </View>
                    )}
                </View>

                {report.findings && (
                    <View className="mt-3">
                        <Text className="text-white font-pmedium mb-2">Key Findings:</Text>
                        {report.findings.map((finding, index) => (
                            <View key={index} className="flex-row items-center mb-1">
                                <MaterialCommunityIcons
                                    name="circle-small"
                                    size={20}
                                    color="#af67db"
                                />
                                <Text className="text-gray-100 ml-1">{finding}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <TouchableOpacity className="mt-3">
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                        className="py-2 rounded-lg"
                    >
                        <Text className="text-center text-white font-pmedium">
                            View Full Report
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

                    <Text className="text-2xl text-white font-psemibold">Property Inspection</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        View detailed inspection reports
                    </Text>
                </Animatable.View>

                {/* Overall Status */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold">Overall Status</Text>
                        <View className="flex-row justify-between items-center mt-2">
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={24}
                                    color="#22c55e"
                                />
                                <Text className="text-gray-100 ml-2">2 of 3 inspections completed</Text>
                            </View>
                            <Text className="text-secondary font-pmedium">92.5%</Text>
                        </View>
                    </LinearGradient>
                </Animatable.View>

                {/* Inspection Reports */}
                {inspectionReports.map((report) => (
                    <InspectionCard key={report.id} report={report} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PropertyInspection; 