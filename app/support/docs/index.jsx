import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Documentation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSection, setExpandedSection] = useState(null);

    const documentationSections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            icon: 'rocket-launch',
            items: [
                {
                    title: 'Account Setup',
                    description: 'Learn how to create and set up your account',
                    route: '/support/docs/account-setup'
                },
                {
                    title: 'Property Verification',
                    description: 'Complete guide to verify your property',
                    route: '/support/docs/verification'
                },
                {
                    title: 'Security Features',
                    description: 'Understand available security options',
                    route: '/support/docs/security'
                }
            ]
        },
        {
            id: 'payments',
            title: 'Payments & Transactions',
            icon: 'cash-multiple',
            items: [
                {
                    title: 'Payment Methods',
                    description: 'Available payment options and setup',
                    route: '/support/docs/payment-methods'
                },
                {
                    title: 'Transaction Process',
                    description: 'Understanding the transaction flow',
                    route: '/support/docs/transactions'
                },
                {
                    title: 'Fees & Charges',
                    description: 'Detailed breakdown of all fees',
                    route: '/support/docs/fees'
                }
            ]
        },
        {
            id: 'investment',
            title: 'Investment Guide',
            icon: 'chart-line',
            items: [
                {
                    title: 'Investment Strategies',
                    description: 'Learn about different investment approaches',
                    route: '/support/docs/strategies'
                },
                {
                    title: 'ROI Calculation',
                    description: 'How to calculate return on investment',
                    route: '/support/docs/roi'
                },
                {
                    title: 'Risk Management',
                    description: 'Understanding and managing investment risks',
                    route: '/support/docs/risks'
                }
            ]
        }
    ];

    const frequentlyAskedQuestions = [
        {
            question: "How do I reset my password?",
            answer: "To reset your password:\n1. Go to Login screen\n2. Click 'Forgot Password'\n3. Enter your email\n4. Follow instructions sent to your email",
            category: "Account"
        },
        {
            question: "What documents are needed for verification?",
            answer: "Required documents include:\n- Government-issued ID\n- Proof of address\n- Property ownership documents\n- Tax records (if applicable)",
            category: "Verification"
        },
        {
            question: "How long does verification take?",
            answer: "Property verification typically takes 2-3 business days. This includes:\n- Document review (24 hours)\n- Background check (24 hours)\n- Final approval (24 hours)",
            category: "Verification"
        }
    ];

    const DocSection = ({ section }) => (
        <Animatable.View
            animation="fadeInUp"
            delay={300}
            className="mb-4"
        >
            <TouchableOpacity
                onPress={() => setExpandedSection(
                    expandedSection === section.id ? null : section.id
                )}
            >
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl"
                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons
                                name={section.icon}
                                size={24}
                                color="#af67db"
                            />
                            <Text className="text-white font-psemibold ml-3">
                                {section.title}
                            </Text>
                        </View>
                        <MaterialCommunityIcons
                            name={expandedSection === section.id ? "chevron-up" : "chevron-down"}
                            size={24}
                            color="#af67db"
                        />
                    </View>
                </LinearGradient>
            </TouchableOpacity>

            {expandedSection === section.id && (
                <Animatable.View
                    animation="fadeIn"
                    duration={300}
                    className="mt-2 space-y-2"
                >
                    {section.items.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push(item.route)}
                            className="bg-black-100/50 p-4 rounded-xl"
                        >
                            <Text className="text-white font-pmedium">{item.title}</Text>
                            <Text className="text-gray-100 text-sm mt-1">
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Animatable.View>
            )}
        </Animatable.View>
    );

    const FAQItem = ({ item }) => (
        <TouchableOpacity className="mb-4">
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row items-start">
                    <MaterialCommunityIcons
                        name="frequently-asked-questions"
                        size={24}
                        color="#af67db"
                    />
                    <View className="ml-3 flex-1">
                        <Text className="text-white font-psemibold">{item.question}</Text>
                        <Text className="text-gray-100 mt-2">{item.answer}</Text>
                        <View className="mt-3 bg-secondary/20 self-start px-3 py-1 rounded-full">
                            <Text className="text-secondary">{item.category}</Text>
                        </View>
                    </View>
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

                    <Text className="text-2xl text-white font-psemibold">Documentation</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Browse guides and frequently asked questions
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
                            placeholder="Search documentation"
                            placeholderTextColor="#666"
                            className="bg-black-100/50 pl-12 pr-4 py-4 rounded-xl text-white font-pregular"
                        />
                    </View>
                </Animatable.View>

                {/* Documentation Sections */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">Documentation</Text>
                    {documentationSections.map((section) => (
                        <DocSection key={section.id} section={section} />
                    ))}
                </Animatable.View>

                {/* FAQ Section */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">
                        Frequently Asked Questions
                    </Text>
                    {frequentlyAskedQuestions.map((faq, index) => (
                        <FAQItem key={index} item={faq} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Documentation; 