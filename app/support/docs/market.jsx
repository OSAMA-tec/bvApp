import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MarketDocumentation = () => {
    const [sections] = useState([
        {
            id: '1',
            title: 'Market Analysis',
            description: 'Understanding market trends and analysis',
            icon: 'chart-line',
            articles: [
                { id: '1', title: 'Reading Market Trends', status: 'new' },
                { id: '2', title: 'Investment Metrics', status: 'updated' },
                { id: '3', title: 'Market Indicators', status: '' }
            ]
        },
        {
            id: '2',
            title: 'Property Valuation',
            description: 'Learn about property valuation methods',
            icon: 'home-analytics',
            articles: [
                { id: '4', title: 'Valuation Methods', status: '' },
                { id: '5', title: 'Price Analysis', status: 'new' },
                { id: '6', title: 'Location Impact', status: '' }
            ]
        },
        {
            id: '3',
            title: 'Investment Strategy',
            description: 'Develop your investment strategy',
            icon: 'strategy',
            articles: [
                { id: '7', title: 'Portfolio Building', status: '' },
                { id: '8', title: 'Risk Management', status: 'updated' },
                { id: '9', title: 'Growth Planning', status: 'new' }
            ]
        }
    ]);

    // Following the DocumentCard pattern from verification/documents.jsx
    const DocumentSection = ({ section }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row items-center mb-3">
                    <MaterialCommunityIcons
                        name={section.icon}
                        size={24}
                        color="#af67db"
                    />
                    <View className="ml-3">
                        <Text className="text-white font-psemibold">{section.title}</Text>
                        <Text className="text-gray-100 text-sm">{section.description}</Text>
                    </View>
                </View>

                {section.articles.map(article => (
                    <TouchableOpacity
                        key={article.id}
                        onPress={() => router.push(`/support/docs/articles/${article.id}`)}
                        className="mt-2"
                    >
                        <View className="flex-row items-center justify-between bg-black-100/10 p-3 rounded-lg">
                            <Text className="text-white">{article.title}</Text>
                            {article.status && (
                                <View className={`px-2 py-1 rounded-full ${article.status === 'new' ? 'bg-green-500/20' : 'bg-blue-500/20'
                                    }`}>
                                    <Text className={
                                        article.status === 'new' ? 'text-green-500' : 'text-blue-500'
                                    }>
                                        {article.status.toUpperCase()}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </LinearGradient>
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

                    <Text className="text-2xl text-white font-psemibold">Market Documentation</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Learn about market analysis and investment
                    </Text>
                </Animatable.View>

                {/* Documentation Sections */}
                {sections.map(section => (
                    <DocumentSection key={section.id} section={section} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MarketDocumentation; 