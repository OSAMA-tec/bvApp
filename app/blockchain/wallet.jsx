import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WalletConnection = () => {
    const walletOptions = [
        {
            id: 'metamask',
            name: 'MetaMask',
            icon: 'wallet',
            description: 'Connect with MetaMask wallet'
        },
        {
            id: 'walletconnect',
            name: 'WalletConnect',
            icon: 'qrcode-scan',
            description: 'Scan QR code to connect'
        },
        {
            id: 'coinbase',
            name: 'Coinbase Wallet',
            icon: 'currency-btc',
            description: 'Connect with Coinbase wallet'
        }
    ];

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

                    <Text className="text-2xl text-white font-psemibold">Connect Wallet</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Choose your preferred wallet to connect
                    </Text>
                </Animatable.View>

                {/* Wallet Options */}
                {walletOptions.map((wallet, index) => (
                    <Animatable.View
                        key={wallet.id}
                        animation="fadeInUp"
                        delay={index * 200}
                        className="mb-4"
                    >
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                className="p-4 rounded-xl"
                            >
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <MaterialCommunityIcons
                                            name={wallet.icon}
                                            size={24}
                                            color="#af67db"
                                        />
                                        <View className="ml-3">
                                            <Text className="text-white font-psemibold">{wallet.name}</Text>
                                            <Text className="text-gray-100 font-pregular text-sm">
                                                {wallet.description}
                                            </Text>
                                        </View>
                                    </View>
                                    <MaterialCommunityIcons
                                        name="chevron-right"
                                        size={24}
                                        color="#af67db"
                                    />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animatable.View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default WalletConnection; 