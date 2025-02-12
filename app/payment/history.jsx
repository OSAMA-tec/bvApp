import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PaymentHistory = () => {
    const [filter, setFilter] = useState('all');

    const transactions = [
        {
            id: 'TX123',
            type: 'payment',
            amount: '1,500',
            currency: 'USD',
            method: 'Bitcoin',
            status: 'completed',
            date: '2024-03-15'
        },
        {
            id: 'TX124',
            type: 'refund',
            amount: '500',
            currency: 'USD',
            method: 'Credit Card',
            status: 'processing',
            date: '2024-03-14'
        },
        {
            id: 'TX125',
            type: 'payment',
            amount: '2,000',
            currency: 'USD',
            method: 'Bank Transfer',
            status: 'completed',
            date: '2024-03-13'
        }
    ];

    const FilterButton = ({ label, value }) => (
        <TouchableOpacity
            onPress={() => setFilter(value)}
            className={`px-4 py-2 rounded-full ${filter === value ? 'bg-secondary/20' : 'bg-black-100/50'
                }`}
        >
            <Text className={`${filter === value ? 'text-secondary' : 'text-gray-100'
                } font-pmedium`}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    const TransactionCard = ({ transaction }) => (
        <TouchableOpacity
            onPress={() => router.push(`/payment/status?id=${transaction.id}`)}
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name={transaction.type === 'payment' ? 'cash-plus' : 'cash-minus'}
                            size={24}
                            color={transaction.type === 'payment' ? '#af67db' : '#ef4444'}
                        />
                        <View className="ml-3">
                            <Text className="text-white font-psemibold">
                                {transaction.type === 'payment' ? 'Payment' : 'Refund'}
                            </Text>
                            <Text className="text-gray-100 text-sm">{transaction.method}</Text>
                        </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${transaction.status === 'completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                        <Text className={`font-pbold ${transaction.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                            }`}>
                            {transaction.status === 'completed' ? 'Completed' : 'Processing'}
                        </Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-secondary font-pmedium">
                        ${transaction.amount} {transaction.currency}
                    </Text>
                    <Text className="text-gray-100">{transaction.date}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
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

                    <Text className="text-2xl text-white font-psemibold">Payment History</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        View your transaction history
                    </Text>
                </Animatable.View>

                {/* Filter Section */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <View className="flex-row space-x-3">
                        <FilterButton label="All" value="all" />
                        <FilterButton label="Payments" value="payments" />
                        <FilterButton label="Refunds" value="refunds" />
                    </View>
                </Animatable.View>

                {/* Transactions List */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                >
                    {transactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentHistory; 