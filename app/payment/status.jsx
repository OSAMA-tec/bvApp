import { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TransactionStatus = () => {
    const [transaction, setTransaction] = useState({
        id: 'TX123456789',
        status: 'processing',
        amount: '1,500',
        currency: 'USD',
        method: 'Bitcoin',
        timestamp: '2024-03-15 14:30',
        steps: [
            { id: 1, title: 'Payment Initiated', status: 'completed' },
            { id: 2, title: 'Processing', status: 'current' },
            { id: 3, title: 'Confirmation', status: 'pending' },
            { id: 4, title: 'Completed', status: 'pending' }
        ]
    });

    const StatusStep = ({ step }) => (
        <View className="flex-row items-start mb-4">
            <View className={`w-8 h-8 rounded-full items-center justify-center ${step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'current' ? 'bg-yellow-500' :
                        'bg-gray-700'
                }`}>
                <MaterialCommunityIcons
                    name={
                        step.status === 'completed' ? 'check' :
                            step.status === 'current' ? 'progress-clock' :
                                'clock-outline'
                    }
                    size={20}
                    color="white"
                />
            </View>
            <View className="ml-3 flex-1">
                <Text className="text-white font-psemibold">{step.title}</Text>
                <Text className="text-gray-100 text-sm">
                    {step.status === 'completed' ? 'Completed' :
                        step.status === 'current' ? 'In Progress' :
                            'Pending'}
                </Text>
            </View>
        </View>
    );

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

                    <Text className="text-2xl text-white font-psemibold">Transaction Status</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Track your payment status
                    </Text>
                </Animatable.View>

                {/* Transaction Details */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <View className="space-y-3">
                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Transaction ID</Text>
                                <Text className="text-white font-pmedium">{transaction.id}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Amount</Text>
                                <Text className="text-white font-pmedium">
                                    ${transaction.amount} {transaction.currency}
                                </Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Payment Method</Text>
                                <Text className="text-white font-pmedium">{transaction.method}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Date & Time</Text>
                                <Text className="text-white font-pmedium">{transaction.timestamp}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Animatable.View>

                {/* Status Timeline */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">Status Timeline</Text>
                    {transaction.steps.map((step) => (
                        <StatusStep key={step.id} step={step} />
                    ))}
                </Animatable.View>

                {/* Support Section */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                            className="p-4 rounded-xl"
                        >
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons
                                    name="headphones"
                                    size={24}
                                    color="#af67db"
                                />
                                <View className="ml-3">
                                    <Text className="text-white font-psemibold">Need Help?</Text>
                                    <Text className="text-gray-100">Contact our support team</Text>
                                </View>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={24}
                                    color="#af67db"
                                    style={{ marginLeft: 'auto' }}
                                />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionStatus; 