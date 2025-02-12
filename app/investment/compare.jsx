import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InvestmentComparison = () => {
    const [properties, setProperties] = useState([
        {
            id: '1',
            name: 'Miami Beach Villa',
            price: '350000',
            monthlyRent: '2500',
            expenses: '800',
            appreciation: '5',
            selected: true
        },
        {
            id: '2',
            name: 'Downtown Condo',
            price: '275000',
            monthlyRent: '2000',
            expenses: '600',
            appreciation: '4',
            selected: true
        }
    ]);

    const metrics = [
        { label: 'Cash on Cash Return', property1: '8.5%', property2: '7.8%' },
        { label: 'Cap Rate', property1: '6.2%', property2: '5.9%' },
        { label: 'Price per Sqft', property1: '$280', property2: '$310' },
        { label: '5-Year Projection', property1: '$425,000', property2: '$335,000' }
    ];

    const ComparisonCard = ({ metric }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <Text className="text-white font-psemibold mb-3">{metric.label}</Text>
                <View className="flex-row justify-between">
                    <View className="flex-1">
                        <Text className="text-secondary font-pmedium text-lg">
                            {metric.property1}
                        </Text>
                        <Text className="text-gray-100 text-sm">Property 1</Text>
                    </View>
                    <View className="w-px bg-gray-700 mx-4" />
                    <View className="flex-1">
                        <Text className="text-secondary font-pmedium text-lg">
                            {metric.property2}
                        </Text>
                        <Text className="text-gray-100 text-sm">Property 2</Text>
                    </View>
                </View>
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

                    <Text className="text-2xl text-white font-psemibold">Compare Investments</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Compare property investments side by side
                    </Text>
                </Animatable.View>

                {/* Property Selection */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">Select Properties</Text>
                    {properties.map((property, index) => (
                        <TouchableOpacity
                            key={property.id}
                            className="mb-4"
                        >
                            <LinearGradient
                                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                className="p-4 rounded-xl"
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-white font-psemibold">{property.name}</Text>
                                        <Text className="text-gray-100">${property.price}</Text>
                                    </View>
                                    <MaterialCommunityIcons
                                        name={property.selected ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                                        size={24}
                                        color="#af67db"
                                    />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </Animatable.View>

                {/* Comparison Metrics */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                >
                    <Text className="text-white font-psemibold mb-4">Comparison Analysis</Text>
                    {metrics.map((metric, index) => (
                        <ComparisonCard key={index} metric={metric} />
                    ))}
                </Animatable.View>

                {/* Recommendation */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl mt-4"
                    >
                        <Text className="text-white font-psemibold mb-2">Recommendation</Text>
                        <Text className="text-gray-100">
                            Based on the analysis, Property 1 shows better potential returns with higher
                            cash on cash return and appreciation rate. Consider factors such as location
                            and market conditions before making a final decision.
                        </Text>
                    </LinearGradient>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default InvestmentComparison; 