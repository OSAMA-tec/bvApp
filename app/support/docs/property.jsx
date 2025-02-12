import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PropertyDocs = () => {
    const [expandedSection, setExpandedSection] = useState(null);

    const propertyGuides = [
        {
            id: 'listing',
            title: 'Property Listing Guide',
            icon: 'home-plus',
            content: [
                {
                    title: 'Creating Effective Listings',
                    steps: [
                        'Professional photography requirements',
                        'Property description best practices',
                        'Setting competitive pricing',
                        'Location and amenities details'
                    ],
                    tips: [
                        'Use high-resolution images',
                        'Highlight unique features',
                        'Include virtual tours',
                        'Specify property dimensions'
                    ]
                }
            ]
        },
        {
            id: 'verification',
            title: 'Verification Process',
            icon: 'shield-check',
            content: [
                {
                    title: 'Required Documents',
                    documents: [
                        'Property deed',
                        'Tax assessment records',
                        'Recent utility bills',
                        'Insurance documents',
                        'Property survey report'
                    ]
                },
                {
                    title: 'Verification Steps',
                    steps: [
                        'Document submission',
                        'Background verification',
                        'Property inspection',
                        'Title check',
                        'Final approval'
                    ]
                }
            ]
        },
        {
            id: 'blockchain',
            title: 'Blockchain Integration',
            icon: 'cube-outline',
            content: [
                {
                    title: 'Smart Contracts',
                    features: [
                        'Automated property transfers',
                        'Secure payment processing',
                        'Transaction history tracking',
                        'Digital ownership certificates'
                    ]
                },
                {
                    title: 'Token Standards',
                    standards: [
                        'ERC-721 for unique properties',
                        'ERC-1155 for fractional ownership',
                        'Property metadata structure',
                        'Token transfer protocols'
                    ]
                }
            ]
        },
        {
            id: 'investment',
            title: 'Investment Analysis',
            icon: 'chart-box',
            content: [
                {
                    title: 'ROI Calculation',
                    metrics: [
                        'Cash on cash return',
                        'Cap rate analysis',
                        'Appreciation potential',
                        'Operating expenses',
                        'Net operating income'
                    ]
                },
                {
                    title: 'Market Analysis',
                    factors: [
                        'Location demographics',
                        'Market trends',
                        'Comparable properties',
                        'Economic indicators'
                    ]
                }
            ]
        }
    ];

    const GuideSection = ({ section }) => (
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
                    className="mt-2 space-y-4"
                >
                    {section.content.map((item, index) => (
                        <View key={index} className="bg-black-100/50 p-4 rounded-xl">
                            <Text className="text-white font-pmedium mb-3">{item.title}</Text>

                            {item.steps && (
                                <View className="mb-4">
                                    <Text className="text-secondary mb-2">Steps:</Text>
                                    {item.steps.map((step, idx) => (
                                        <View key={idx} className="flex-row items-center mb-2">
                                            <View className="w-6 h-6 rounded-full bg-secondary/20 items-center justify-center mr-2">
                                                <Text className="text-secondary">{idx + 1}</Text>
                                            </View>
                                            <Text className="text-gray-100">{step}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {item.tips && (
                                <View className="mb-4">
                                    <Text className="text-secondary mb-2">Tips:</Text>
                                    {item.tips.map((tip, idx) => (
                                        <View key={idx} className="flex-row items-center mb-2">
                                            <MaterialCommunityIcons
                                                name="lightbulb-outline"
                                                size={20}
                                                color="#af67db"
                                                style={{ marginRight: 8 }}
                                            />
                                            <Text className="text-gray-100">{tip}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {item.documents && (
                                <View className="mb-4">
                                    <Text className="text-secondary mb-2">Required Documents:</Text>
                                    {item.documents.map((doc, idx) => (
                                        <View key={idx} className="flex-row items-center mb-2">
                                            <MaterialCommunityIcons
                                                name="file-document-outline"
                                                size={20}
                                                color="#af67db"
                                                style={{ marginRight: 8 }}
                                            />
                                            <Text className="text-gray-100">{doc}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {item.features && (
                                <View className="mb-4">
                                    <Text className="text-secondary mb-2">Smart Contract Features:</Text>
                                    {item.features.map((feature, idx) => (
                                        <View key={idx} className="flex-row items-center mb-2">
                                            <MaterialCommunityIcons
                                                name="check-circle-outline"
                                                size={20}
                                                color="#af67db"
                                                style={{ marginRight: 8 }}
                                            />
                                            <Text className="text-gray-100">{feature}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {item.metrics && (
                                <View className="mb-4">
                                    <Text className="text-secondary mb-2">Investment Metrics:</Text>
                                    {item.metrics.map((metric, idx) => (
                                        <View key={idx} className="flex-row items-center mb-2">
                                            <MaterialCommunityIcons
                                                name="chart-line"
                                                size={20}
                                                color="#af67db"
                                                style={{ marginRight: 8 }}
                                            />
                                            <Text className="text-gray-100">{metric}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </Animatable.View>
            )}
        </Animatable.View>
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

                    <Text className="text-2xl text-white font-psemibold">Property Guide</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Comprehensive property management documentation
                    </Text>
                </Animatable.View>

                {/* Guide Sections */}
                {propertyGuides.map((section) => (
                    <GuideSection key={section.id} section={section} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PropertyDocs; 