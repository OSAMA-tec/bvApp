import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PaymentGateway = () => {
    const [paymentMethod, setPaymentMethod] = useState('crypto');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');

    const paymentMethods = {
        crypto: [
            { id: 'btc', name: 'Bitcoin', icon: 'bitcoin' },
            { id: 'eth', name: 'Ethereum', icon: 'ethereum' },
            { id: 'usdt', name: 'USDT', icon: 'currency-usd' }
        ],
        fiat: [
            { id: 'card', name: 'Credit Card', icon: 'credit-card' },
            { id: 'bank', name: 'Bank Transfer', icon: 'bank' },
            { id: 'paypal', name: 'PayPal', icon: 'paypal' }
        ]
    };

    const PaymentMethodCard = ({ method }) => (
        <TouchableOpacity className="mb-4">
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name={method.icon}
                            size={24}
                            color="#af67db"
                        />
                        <Text className="text-white font-psemibold ml-3">{method.name}</Text>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="#af67db"
                    />
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

                    <Text className="text-2xl text-white font-psemibold">Payment Gateway</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Choose your payment method
                    </Text>
                </Animatable.View>

                {/* Amount Input */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold mb-2">Amount</Text>
                        <View className="flex-row items-center">
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="Enter amount"
                                placeholderTextColor="#666"
                                keyboardType="decimal-pad"
                                className="flex-1 text-white font-pregular text-lg"
                            />
                            <TouchableOpacity className="ml-2">
                                <Text className="text-secondary font-pmedium">{currency}</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentGateway; 