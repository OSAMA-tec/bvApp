import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NFTDashboard = () => {
    const nftData = [
        {
            id: '1',
            title: 'Miami Beach Villa NFT',
            tokenId: '#1234',
            status: 'Minted',
            value: '2.5 ETH',
            lastUpdated: '2 days ago'
        },
        {
            id: '2',
            title: 'Manhattan Penthouse NFT',
            tokenId: '#1235',
            status: 'Pending',
            value: '3.2 ETH',
            lastUpdated: '1 day ago'
        }
    ];

    const NFTCard = ({ item }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-white font-psemibold">{item.title}</Text>
                    <View className={`px-3 py-1 rounded-full ${item.status === 'Minted' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                        <Text className={`font-pbold ${item.status === 'Minted' ? 'text-green-500' : 'text-yellow-500'
                            }`}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-100">Token ID: {item.tokenId}</Text>
                    <Text className="text-secondary font-pmedium">{item.value}</Text>
                </View>
                <Text className="text-gray-100 text-sm mt-2">
                    Last updated: {item.lastUpdated}
                </Text>
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

                    <Text className="text-2xl text-white font-psemibold">NFT Dashboard</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Manage your property NFTs
                    </Text>
                </Animatable.View>

                {/* Mint New NFT Button */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                            className="p-4 rounded-xl"
                        >
                            <View className="flex-row items-center justify-center">
                                <MaterialCommunityIcons
                                    name="plus-circle"
                                    size={24}
                                    color="#af67db"
                                />
                                <Text className="text-white font-psemibold ml-2">
                                    Mint New Property NFT
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>

                {/* NFT List */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                >
                    <Text className="text-white font-psemibold text-xl mb-4">Your NFTs</Text>
                    {nftData.map((nft) => (
                        <NFTCard key={nft.id} item={nft} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NFTDashboard; 