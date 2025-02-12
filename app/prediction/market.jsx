import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AnalysisHeader from "../../components/AnalysisHeader";

const { width } = Dimensions.get("window");

const MarketTrends = () => {
    const marketData = {
        priceHistory: {
            labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
            datasets: [{
                data: [350, 380, 420, 450, 480, 520]
            }]
        },
        salesVolume: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [{
                data: [120, 145, 132, 158]
            }]
        },
        trends: [
            {
                name: "Price Growth",
                value: "+8.3%",
                status: "positive",
                period: "Year over Year",
                icon: "trending-up"
            },
            {
                name: "Market Activity",
                value: "High",
                status: "positive",
                period: "Current Quarter",
                icon: "chart-bell-curve"
            },
            {
                name: "Buyer Demand",
                value: "Strong",
                status: "positive",
                period: "Current Month",
                icon: "account-group"
            },
            {
                name: "Supply Level",
                value: "Moderate",
                status: "neutral",
                period: "Current Month",
                icon: "home-group"
            }
        ]
    };

    const TrendCard = ({ trend }) => (
        <Animatable.View
            animation="fadeInRight"
            delay={marketData.trends.indexOf(trend) * 200}
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name={trend.icon}
                            size={24}
                            color="#af67db"
                        />
                        <View className="ml-3">
                            <Text className="text-white font-psemibold">{trend.name}</Text>
                            <Text className="text-gray-100 font-pregular text-sm">
                                {trend.period}
                            </Text>
                        </View>
                    </View>
                    <Text className={`font-pbold ${trend.status === 'positive' ? 'text-green-500' :
                            trend.status === 'neutral' ? 'text-yellow-500' :
                                'text-red-500'
                        }`}>
                        {trend.value}
                    </Text>
                </View>
            </LinearGradient>
        </Animatable.View>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                <AnalysisHeader
                    title="Market Trends"
                    subtitle="Historical data and market analysis"
                />

                {/* Price History Chart */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Price History
                    </Text>
                    <LineChart
                        data={marketData.priceHistory}
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

                {/* Sales Volume Chart */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Sales Volume
                    </Text>
                    <BarChart
                        data={marketData.salesVolume}
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
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </Animatable.View>

                {/* Market Trends */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={700}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Current Trends
                    </Text>
                    {marketData.trends.map((trend, index) => (
                        <TrendCard key={index} trend={trend} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MarketTrends; 