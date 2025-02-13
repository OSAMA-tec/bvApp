import 'react-native-get-random-values';
import '@ethersproject/shims';

import { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Linking, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Web3 from 'web3';
import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Web3 with Infura provider
const INFURA_API_KEY = '317bf56c418f4754b1cf53e6e32b1548';
const provider = new ethers.providers.JsonRpcProvider({
    url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    timeout: 30000, // 30 seconds
});

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`));

const WalletConnection = () => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState('0');
    const [connectionStep, setConnectionStep] = useState(0);

    // Check for existing connection on component mount
    useEffect(() => {
        checkExistingConnection();
    }, []);

    // Check if there's a saved wallet connection
    const checkExistingConnection = async () => {
        try {
            const savedAccount = await AsyncStorage.getItem('walletAccount');
            if (savedAccount) {
                setAccount(savedAccount);
                setConnectionStep(2);
                await getBalance(savedAccount);
            }
        } catch (error) {
            console.error('Error checking existing connection:', error);
        }
    };

    // Get wallet balance using Web3 instead of ethers.js
    const getBalance = async (address) => {
        // Temporarily set static balance
        setBalance('0.0000');

        /* Commenting out balance fetch for now
        try {
            // Validate address format
            if (!web3.utils.isAddress(address)) {
                console.warn('Invalid Ethereum address');
                setBalance('0');
                return;
            }

            // Use a try-catch block specifically for the balance fetch
            try {
                const balanceWei = await web3.eth.getBalance(address);
                if (balanceWei) {
                    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
                    setBalance(parseFloat(balanceEth).toFixed(4));
                } else {
                    console.warn('No balance returned');
                    setBalance('0');
                }
            } catch (balanceError) {
                console.warn('Balance fetch failed:', balanceError);
                // Fallback to direct provider call if Web3 fails
                const balance = await provider.getBalance(address);
                const balanceEth = ethers.utils.formatEther(balance);
                setBalance(parseFloat(balanceEth).toFixed(4));
            }
        } catch (error) {
            console.error('Error in getBalance:', error);
            setBalance('0');
        }
        */
    };

    // Handle successful connection
    const handleSuccessfulConnection = async (walletAddress) => {
        try {
            setAccount(walletAddress);
            await AsyncStorage.setItem('walletAccount', walletAddress);
            await getBalance(walletAddress);
            setConnectionStep(2);
            setIsConnecting(false);

            Alert.alert(
                "Wallet Connected",
                "Your MetaMask wallet has been connected successfully.",
                [{ text: "OK" }]
            );
        } catch (error) {
            console.error('Error in handleSuccessfulConnection:', error);
            Alert.alert(
                "Connection Error",
                "Failed to complete wallet connection. Please try again."
            );
            setIsConnecting(false);
            setConnectionStep(0);
        }
    };

    // Connect to MetaMask
    const connectMetaMask = async () => {
        try {
            setIsConnecting(true);
            setConnectionStep(1);

            // Check if MetaMask is installed
            const canOpenMetaMask = await Linking.canOpenURL('metamask://');
            if (!canOpenMetaMask) {
                Alert.alert(
                    "MetaMask Not Found",
                    "Please install MetaMask to continue",
                    [
                        {
                            text: "Install MetaMask",
                            onPress: () => Linking.openURL('https://metamask.io/download/')
                        },
                        {
                            text: "Cancel",
                            style: "cancel"
                        }
                    ]
                );
                setConnectionStep(0);
                setIsConnecting(false);
                return;
            }

            // Open MetaMask
            await Linking.openURL('metamask://');

            // Show confirmation dialog after a short delay
            setTimeout(() => {
                Alert.alert(
                    "Confirm Connection",
                    "Did you approve the connection in MetaMask?",
                    [
                        {
                            text: "No",
                            style: "cancel",
                            onPress: () => {
                                setIsConnecting(false);
                                setConnectionStep(0);
                            }
                        },
                        {
                            text: "Yes",
                            onPress: async () => {
                                const testAccount = '0xa26c86B84596DcCa2c0b990857f5622b1d9a1660';
                                await handleSuccessfulConnection(testAccount);
                            }
                        }
                    ]
                );
            }, 1000);

        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            Alert.alert(
                "Connection Error",
                "Failed to connect to MetaMask. Please try again."
            );
            setConnectionStep(0);
            setIsConnecting(false);
        }
    };

    // Disconnect wallet
    const disconnectWallet = async () => {
        try {
            await AsyncStorage.removeItem('walletAccount');
            setAccount(null);
            setBalance('0');
            setConnectionStep(0);

            Alert.alert(
                "Wallet Disconnected",
                "Your wallet has been disconnected successfully."
            );
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
            Alert.alert(
                "Error",
                "Failed to disconnect wallet. Please try again."
            );
        }
    };

    // Format address for display
    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    // Handle wallet connection/disconnection
    const handleWalletConnection = () => {
        if (account) {
            Alert.alert(
                "Disconnect Wallet",
                "Are you sure you want to disconnect your wallet?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Disconnect",
                        style: "destructive",
                        onPress: disconnectWallet
                    }
                ]
            );
            return;
        }

        Alert.alert(
            "Connect Wallet",
            "Would you like to connect your MetaMask wallet?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Connect",
                    onPress: connectMetaMask
                }
            ]
        );
    };

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                {/* Header Section */}
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
                        Connect your MetaMask wallet to start tokenizing assets
                    </Text>
                </Animatable.View>

                {/* MetaMask Connection Button */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={200}
                    className="mb-4"
                >
                    <TouchableOpacity
                        onPress={handleWalletConnection}
                        disabled={isConnecting}
                    >
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                            className="p-4 rounded-xl"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Image
                                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' }}
                                        className="w-8 h-8"
                                        resizeMode="contain"
                                    />
                                    <View className="ml-3">
                                        <Text className="text-white font-psemibold">MetaMask</Text>
                                        <Text className="text-gray-100 font-pregular text-sm">
                                            {connectionStep === 2
                                                ? `${formatAddress(account)} (${balance} ETH)`
                                                : connectionStep === 1
                                                    ? 'Connecting...'
                                                    : 'Connect with MetaMask wallet'
                                            }
                                        </Text>
                                    </View>
                                </View>
                                {isConnecting ? (
                                    <ActivityIndicator color="#af67db" />
                                ) : (
                                    <MaterialCommunityIcons
                                        name={connectionStep === 2 ? "link-variant-off" : "chevron-right"}
                                        size={24}
                                        color="#af67db"
                                    />
                                )}
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>

                {/* Connected Status */}
                {connectionStep === 2 && (
                    <Animatable.View
                        animation="fadeInUp"
                        delay={400}
                        className="mt-6"
                    >
                        <LinearGradient
                            colors={['rgba(76, 175, 80, 0.1)', 'rgba(76, 175, 80, 0.2)']}
                            className="p-4 rounded-xl"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <MaterialCommunityIcons
                                        name="check-circle"
                                        size={24}
                                        color="#4CAF50"
                                    />
                                    <Text className="text-white font-pmedium ml-2">
                                        Wallet Connected Successfully
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Disconnect Wallet",
                                            "Are you sure you want to disconnect your wallet?",
                                            [
                                                {
                                                    text: "Cancel",
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Yes",
                                                    style: "destructive",
                                                    onPress: disconnectWallet
                                                }
                                            ]
                                        );
                                    }}
                                >
                                    <Text className="text-secondary font-pmedium">Disconnect</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </Animatable.View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default WalletConnection; 