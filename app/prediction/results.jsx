import { useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PredictionResults = () => {
    const predictionData = {
        currentPrice: "650,000",
        predictedPrice: "725,000",
        confidence: "92%",
        timeframe: "12 months",
        factors: [
            {
                name: "Location Growth",
                impact: "High Positive",
                value: "+15%",
                icon: "map-marker-radius",
            },
            {
                name: "Market Demand",
                impact: "Medium Positive",
                value: "+8%",
                icon: "trending-up",
            },
            {
                name: "Infrastructure",
                impact: "Medium Positive",
                value: "+6%",
                icon: "road-variant",
            },
            {
                name: "Economic Indicators",
                impact: "Low Positive",
                value: "+3%",
                icon: "chart-bar",
            },
        ],
    };

    const PredictionFactor = ({ factor }) => (
        <Animatable.View
            animation="fadeInRight"
            delay={predictionData.factors.indexOf(factor) * 200}
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name={factor.icon}
                            size={24}
                            color="#af67db"
                        />
                        <Text className="text-white font-psemibold ml-3">{factor.name}</Text>
                    </View>
                    <Text className="text-green-500 font-pbold">{factor.value}</Text>
                </View>
                <Text className="text-gray-100 mt-2 font-pregular">Impact: {factor.impact}</Text>
            </LinearGradient>
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
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color="#fff"
                        />
                        <Text className="text-white ml-2 font-pmedium">Back to Analysis</Text>
                    </TouchableOpacity>

                    <Text className="text-2xl text-white font-psemibold">Price Prediction</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        AI-powered price forecast based on market data
                    </Text>
                </Animatable.View>

                {/* Price Prediction Card */}
                <Animatable.View
                    animation="zoomIn"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                        className="p-6 rounded-xl"
                    >
                        <View className="flex-row justify-between items-center mb-4">
                            <View>
                                <Text className="text-gray-100 font-pregular">Current Price</Text>
                                <Text className="text-white font-pbold text-xl">
                                    ${predictionData.currentPrice}
                                </Text>
                            </View>
                            <MaterialCommunityIcons
                                name="arrow-right"
                                size={24}
                                color="#af67db"
                            />
                            <View>
                                <Text className="text-gray-100 font-pregular">Predicted Price</Text>
                                <Text className="text-secondary font-pbold text-xl">
                                    ${predictionData.predictedPrice}
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-100 font-pregular">
                                Confidence: {predictionData.confidence}
                            </Text>
                            <Text className="text-gray-100 font-pregular">
                                Timeframe: {predictionData.timeframe}
                            </Text>
                        </View>
                    </LinearGradient>
                </Animatable.View>

                {/* Contributing Factors */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={600}
                    className="mb-6"
                >
                    <Text className="text-xl text-white font-psemibold mb-4">
                        Contributing Factors
                    </Text>
                    {predictionData.factors.map((factor, index) => (
                        <PredictionFactor key={index} factor={factor} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PredictionResults; 