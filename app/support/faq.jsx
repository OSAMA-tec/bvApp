import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FAQ = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [faqs] = useState([
        {
            id: '1',
            category: 'Investment',
            icon: 'chart-line',
            questions: [
                {
                    id: 'inv1',
                    question: 'How do I start investing?',
                    answer: 'To start investing, complete your KYC verification, add funds to your wallet, and browse available properties.'
                },
                {
                    id: 'inv2',
                    question: 'What is the minimum investment?',
                    answer: 'The minimum investment varies by property but typically starts at $100.'
                }
            ]
        },
        {
            id: '2',
            category: 'Property',
            icon: 'home',
            questions: [
                {
                    id: 'prop1',
                    question: 'How are properties verified?',
                    answer: 'Properties undergo thorough verification including title checks, legal compliance, and physical inspection.'
                },
                {
                    id: 'prop2',
                    question: 'What documents are required?',
                    answer: 'Required documents include property deed, tax records, and insurance documentation.'
                }
            ]
        },
        {
            id: '3',
            category: 'Returns',
            icon: 'cash',
            questions: [
                {
                    id: 'ret1',
                    question: 'How are returns distributed?',
                    answer: 'Returns are distributed monthly through your registered payment method.'
                },
                {
                    id: 'ret2',
                    question: 'What is the average ROI?',
                    answer: 'Historical ROI ranges from 8-12% annually, varying by property type and location.'
                }
            ]
        }
    ]);

    const FAQCategory = ({ category }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-6"
        >
            <View className="flex-row items-center mb-3">
                <MaterialCommunityIcons
                    name={category.icon}
                    size={24}
                    color="#af67db"
                />
                <Text className="text-white font-psemibold ml-2">{category.category}</Text>
            </View>

            {category.questions.map(item => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="mb-3"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <View className="flex-row justify-between items-center">
                            <Text className="text-white font-psemibold flex-1 mr-2">{item.question}</Text>
                            <MaterialCommunityIcons
                                name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                                size={24}
                                color="#af67db"
                            />
                        </View>
                        {expandedId === item.id && (
                            <Text className="text-gray-100 mt-3">{item.answer}</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </Animatable.View>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                {/* Back Button and Header - Following pattern from verification/kyc.jsx */}
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

                    <Text className="text-2xl text-white font-psemibold">FAQ</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Frequently asked questions
                    </Text>
                </Animatable.View>

                {/* FAQ Categories */}
                {faqs.map(category => (
                    <FAQCategory key={category.id} category={category} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default FAQ; 