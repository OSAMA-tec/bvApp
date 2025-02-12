import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TokenTransfer = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

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

                    <Text className="text-2xl text-white font-psemibold">Token Transfer</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Transfer tokens to another wallet
                    </Text>
                </Animatable.View>

                {/* Balance Card */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-gray-100 font-pregular">Available Balance</Text>
                        <Text className="text-white font-psemibold text-2xl mt-2">2.5 ETH</Text>
                    </LinearGradient>
                </Animatable.View>

                {/* Transfer Form */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    <View className="mb-4">
                        <Text className="text-white font-pmedium mb-2">Recipient Address</Text>
                        <TextInput
                            value={recipient}
                            onChangeText={setRecipient}
                            placeholder="Enter wallet address"
                            placeholderTextColor="#666"
                            className="bg-black-100/50 p-4 rounded-xl text-white font-pregular"
                        />
                    </View>

                    <View className="mb-6">
                        <Text className="text-white font-pmedium mb-2">Amount</Text>
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="Enter amount"
                            placeholderTextColor="#666"
                            keyboardType="decimal-pad"
                            className="bg-black-100/50 p-4 rounded-xl text-white font-pregular"
                        />
                    </View>

                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#af67db', '#6b8cce']}
                            className="p-4 rounded-xl"
                        >
                            <Text className="text-white text-center font-psemibold">
                                Send Tokens
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TokenTransfer; 