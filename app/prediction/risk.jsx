import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AnalysisHeader from "../../components/AnalysisHeader";

const { width } = Dimensions.get("window");

const RiskAssessment = () => {
    const riskData = {
        overallRisk: "Low",
        riskScore: 28,
        historicalVolatility: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                data: [20, 25, 22, 28, 26, 28]
            }]
        },
        riskFactors: [
            {
                name: "Market Volatility",
                risk: "Low",
                score: 25,
                trend: "Stable",
                icon: "chart-line-variant"
            },
            {
                name: "Liquidity Risk",
                risk: "Medium",
                score: 45,
                trend: "Improving",
                icon: "cash-fast"
            },
            {
                name: "Regulatory Risk",
                risk: "Low",
                score: 15,
                trend: "Stable",
                icon: "gavel"
            },
            {
                name: "Economic Risk",
                risk: "Low",
                score: 28,
                trend: "Stable",
                icon: "bank"
            }
        ]
    };

    const RiskFactor = ({ factor }) => (
        <Animatable.View
            animation="fadeInRight"
            delay={riskData.riskFactors.indexOf(factor) * 200}
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
                        <View className="ml-3">
                            <Text className="text-white font-psemibold">{factor.name}</Text>
                            <Text className="text-gray-100 font-pregular text-sm">
                                Trend: {factor.trend}
                            </Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className={`font-pbold ${factor.risk === 'Low' ? 'text-green-500' : factor.risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                            {factor.risk}
                        </Text>
                        <Text className="text-gray-100 font-pregular text-sm">
                            Score: {factor.score}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </Animatable.View>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                <AnalysisHeader
                    title="Risk Assessment"
                    subtitle="Comprehensive risk analysis and metrics"
                />

                {/* Overall Risk Score */}
                <Animatable.View
                    animation="zoomIn"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                        className="p-6 rounded-xl"
                    >
                        <Text className="text-white font-psemibold text-lg mb-2">
                            Overall Risk Score
                        </Text>
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-green-500 font-pbold text-3xl">
                                    {riskData.riskScore}
                                </Text>
                                <Text className="text-gray-100 font-pregular">
                                    Risk Level: {riskData.overallRisk}
                                </Text>
                            </View>
                            <MaterialCommunityIcons
                                name="shield-check"
                                size={48}
                                color="#22c55e"
                            />
                        </View>
                    </LinearGradient>
                </Animatable.View>

                {/* Historical Volatility Chart */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Historical Volatility
                    </Text>
                    <LineChart
                        data={riskData.historicalVolatility}
                        width={width - 32}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#1a1a1a",
                            backgroundGradientFrom: "#1a1a1a",
                            backgroundGradientTo: "#1a1a1a",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(175, 103, 219, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#af67db"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </Animatable.View>

                {/* Risk Factors */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={700}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Risk Factors
                    </Text>
                    {riskData.riskFactors.map((factor, index) => (
                        <RiskFactor key={index} factor={factor} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RiskAssessment; 