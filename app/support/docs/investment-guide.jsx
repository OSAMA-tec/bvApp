import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InvestmentGuide = () => {
    const [expandedSection, setExpandedSection] = useState(null);

    const investmentGuides = [
        {
            id: 'fundamentals',
            title: 'Investment Fundamentals',
            icon: 'book-open-variant',
            content: {
                overview: 'Understanding key real estate investment metrics and analysis',
                sections: [
                    {
                        title: 'Key Metrics',
                        items: [
                            {
                                name: 'Cap Rate',
                                description: 'Net Operating Income / Property Value',
                                example: '8% Cap Rate = $80,000 NOI / $1,000,000 Property Value'
                            },
                            {
                                name: 'Cash on Cash Return',
                                description: 'Annual Cash Flow / Total Cash Invested',
                                example: '12% CoC = $12,000 Cash Flow / $100,000 Investment'
                            },
                            {
                                name: 'ROI',
                                description: 'Total Return / Total Investment',
                                example: '15% ROI = $150,000 Return / $1,000,000 Investment'
                            }
                        ]
                    },
                    {
                        title: 'Operating Expenses',
                        items: [
                            'Property Management (8-12% of rent)',
                            'Property Tax (varies by location)',
                            'Insurance (0.5-1% of property value)',
                            'Maintenance (1-2% of property value)',
                            'Utilities (if not tenant-paid)',
                            'HOA Fees (if applicable)'
                        ]
                    }
                ]
            }
        },
        {
            id: 'analysis',
            title: 'Property Analysis',
            icon: 'chart-box',
            content: {
                overview: 'Step-by-step property analysis process',
                steps: [
                    {
                        title: 'Income Analysis',
                        items: [
                            'Research market rents',
                            'Calculate potential gross income',
                            'Factor in vacancy rates (5-10%)',
                            'Determine other income sources'
                        ]
                    },
                    {
                        title: 'Expense Analysis',
                        items: [
                            'List all operating expenses',
                            'Calculate net operating income',
                            'Project future expenses',
                            'Include replacement reserves'
                        ]
                    },
                    {
                        title: 'Value Analysis',
                        items: [
                            'Compare similar properties',
                            'Calculate price per square foot',
                            'Assess property condition',
                            'Review historical appreciation'
                        ]
                    }
                ]
            }
        },
        {
            id: 'strategies',
            title: 'Investment Strategies',
            icon: 'strategy',
            content: {
                overview: 'Different approaches to real estate investment',
                strategies: [
                    {
                        name: 'Buy and Hold',
                        description: 'Long-term investment focusing on appreciation and rental income',
                        pros: [
                            'Steady cash flow',
                            'Property appreciation',
                            'Tax benefits'
                        ],
                        cons: [
                            'Lower liquidity',
                            'Property management required',
                            'Market risk'
                        ]
                    },
                    {
                        name: 'Fix and Flip',
                        description: 'Purchase, renovate, and sell for profit',
                        pros: [
                            'Quick returns',
                            'Higher potential profit',
                            'No long-term management'
                        ],
                        cons: [
                            'Higher risk',
                            'Renovation expertise needed',
                            'Market timing crucial'
                        ]
                    },
                    {
                        name: 'REIT Investment',
                        description: 'Invest in real estate investment trusts',
                        pros: [
                            'High liquidity',
                            'Professional management',
                            'Diversification'
                        ],
                        cons: [
                            'Lower control',
                            'Market volatility',
                            'Lower potential returns'
                        ]
                    }
                ]
            }
        }
    ];

    const renderContent = (content) => (
        <View className="space-y-4">
            <Text className="text-gray-100">{content.overview}</Text>

            {content.sections && content.sections.map((section, idx) => (
                <View key={idx} className="mt-4">
                    <Text className="text-white font-psemibold mb-2">{section.title}</Text>
                    {section.items.map((item, itemIdx) => (
                        <View key={itemIdx} className="bg-black-100/30 p-3 rounded-lg mb-2">
                            <Text className="text-secondary font-pmedium">{item.name}</Text>
                            <Text className="text-gray-100 mt-1">{item.description}</Text>
                            {item.example && (
                                <Text className="text-gray-300 mt-1 italic">Example: {item.example}</Text>
                            )}
                        </View>
                    ))}
                </View>
            ))}

            {content.steps && content.steps.map((step, idx) => (
                <View key={idx} className="mt-4">
                    <Text className="text-white font-psemibold mb-2">{step.title}</Text>
                    {step.items.map((item, itemIdx) => (
                        <View key={itemIdx} className="flex-row items-center mb-2">
                            <View className="w-6 h-6 rounded-full bg-secondary/20 items-center justify-center mr-2">
                                <Text className="text-secondary">{itemIdx + 1}</Text>
                            </View>
                            <Text className="text-gray-100">{item}</Text>
                        </View>
                    ))}
                </View>
            ))}

            {content.strategies && content.strategies.map((strategy, idx) => (
                <View key={idx} className="bg-black-100/30 p-4 rounded-lg mb-4">
                    <Text className="text-white font-psemibold">{strategy.name}</Text>
                    <Text className="text-gray-100 mt-2">{strategy.description}</Text>

                    <View className="mt-3">
                        <Text className="text-secondary mb-2">Pros:</Text>
                        {strategy.pros.map((pro, proIdx) => (
                            <View key={proIdx} className="flex-row items-center mb-1">
                                <MaterialCommunityIcons
                                    name="plus-circle"
                                    size={16}
                                    color="#af67db"
                                    style={{ marginRight: 8 }}
                                />
                                <Text className="text-gray-100">{pro}</Text>
                            </View>
                        ))}
                    </View>

                    <View className="mt-3">
                        <Text className="text-secondary mb-2">Cons:</Text>
                        {strategy.cons.map((con, conIdx) => (
                            <View key={conIdx} className="flex-row items-center mb-1">
                                <MaterialCommunityIcons
                                    name="minus-circle"
                                    size={16}
                                    color="#af67db"
                                    style={{ marginRight: 8 }}
                                />
                                <Text className="text-gray-100">{con}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
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

                    <Text className="text-2xl text-white font-psemibold">Investment Guide</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Learn about real estate investment analysis
                    </Text>
                </Animatable.View>

                {/* Guide Sections */}
                {investmentGuides.map((section) => (
                    <Animatable.View
                        key={section.id}
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
                                className="mt-2 p-4 bg-black-100/50 rounded-xl"
                            >
                                {renderContent(section.content)}
                            </Animatable.View>
                        )}
                    </Animatable.View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default InvestmentGuide; 