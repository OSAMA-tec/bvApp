import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HelpSupport = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const supportCategories = [
        {
            icon: 'account-question',
            title: 'Account Issues',
            description: 'Login, security, and profile',
            route: '/support/account'
        },
        {
            icon: 'cash-lock',
            title: 'Payments & Billing',
            description: 'Transactions and invoices',
            route: '/support/payments'
        },
        {
            icon: 'home-search',
            title: 'Property Issues',
            description: 'Listings and verification',
            route: '/support/property'
        },
        {
            icon: 'book-open-variant',
            title: 'Documentation',
            description: 'Guides and tutorials',
            route: '/support/docs'
        }
    ];

    const quickHelp = [
        {
            question: "How do I verify my property?",
            answer: "To verify your property, navigate to the Property Verification section and follow these steps...",
            route: "/support/docs/verification"
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept various payment methods including credit cards, bank transfers, and cryptocurrencies...",
            route: "/support/docs/payments"
        },
        {
            question: "How to enable 2FA?",
            answer: "You can enable Two-Factor Authentication in your security settings...",
            route: "/support/docs/2fa"
        }
    ];

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

                    <Text className="text-2xl text-white font-psemibold">Help & Support</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        How can we help you today?
                    </Text>
                </Animatable.View>

                {/* Search Bar */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <View className="relative">
                        <MaterialCommunityIcons
                            name="magnify"
                            size={24}
                            color="#666"
                            style={{ position: 'absolute', left: 12, top: 12 }}
                        />
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search for help"
                            placeholderTextColor="#666"
                            className="bg-black-100/50 pl-12 pr-4 py-4 rounded-xl text-white font-pregular"
                        />
                    </View>
                </Animatable.View>

                {/* Support Categories */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">Categories</Text>
                    <View className="flex-row flex-wrap justify-between">
                        {supportCategories.map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => router.push(category.route)}
                                className="w-[48%] mb-4"
                            >
                                <LinearGradient
                                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                    className="p-4 rounded-xl"
                                >
                                    <MaterialCommunityIcons
                                        name={category.icon}
                                        size={32}
                                        color="#af67db"
                                    />
                                    <Text className="text-white font-psemibold mt-2">
                                        {category.title}
                                    </Text>
                                    <Text className="text-gray-100 text-sm mt-1">
                                        {category.description}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animatable.View>

                {/* Quick Help */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">Quick Help</Text>
                    {quickHelp.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push(item.route)}
                            className="mb-4"
                        >
                            <LinearGradient
                                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                className="p-4 rounded-xl"
                            >
                                <Text className="text-white font-psemibold">{item.question}</Text>
                                <Text className="text-gray-100 mt-2 text-sm" numberOfLines={2}>
                                    {item.answer}
                                </Text>
                                <View className="flex-row items-center mt-2">
                                    <Text className="text-secondary font-pmedium">Learn more</Text>
                                    <MaterialCommunityIcons
                                        name="chevron-right"
                                        size={20}
                                        color="#af67db"
                                    />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </Animatable.View>

                {/* Contact Support */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={600}
                    className="mb-6"
                >
                    <TouchableOpacity
                        onPress={() => router.push("/support/chat")}
                    >
                        <LinearGradient
                            colors={['#af67db', '#6b8cce']}
                            className="p-4 rounded-xl"
                        >
                            <View className="flex-row items-center justify-center">
                                <MaterialCommunityIcons
                                    name="message-text"
                                    size={24}
                                    color="white"
                                />
                                <Text className="text-white font-psemibold ml-2">
                                    Contact Support
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HelpSupport; 