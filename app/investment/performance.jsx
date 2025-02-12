import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const PerformanceTracking = () => {
    const [selectedMetric, setSelectedMetric] = useState('returns');

    const performanceData = {
        returns: {
            current: '+12.5%',
            change: '+2.3%',
            chartData: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        data: [10.2, 11.5, 10.8, 11.2, 12.1, 12.5]
                    }
                ]
            }
        },
        occupancy: {
            current: '95%',
            change: '+5%',
            chartData: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        data: [85, 88, 90, 92, 93, 95]
                    }
                ]
            }
        },
        revenue: {
            current: '$15,000',
            change: '+$1,200',
            chartData: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        data: [12000, 12500, 13200, 13800, 14500, 15000]
                    }
                ]
            }
        }
    };

    const MetricCard = ({ title, current, change, selected, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-1 ${selected ? 'opacity-100' : 'opacity-70'}`}
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <Text className="text-gray-100 font-pregular">{title}</Text>
                <Text className="text-white font-psemibold text-xl mt-1">{current}</Text>
                <View className="flex-row items-center mt-1">
                    <MaterialCommunityIcons
                        name={change.includes('+') ? "trending-up" : "trending-down"}
                        size={16}
                        color={change.includes('+') ? "#22c55e" : "#ef4444"}
                    />
                    <Text className={`ml-1 ${change.includes('+') ? "text-green-500" : "text-red-500"
                        }`}>
                        {change}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
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

                    <Text className="text-2xl text-white font-psemibold">Performance Tracking</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Monitor your investment metrics
                    </Text>
                </Animatable.View>

                {/* Metrics Overview */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="flex-row space-x-4 mb-6"
                >
                    <MetricCard
                        title="Returns"
                        current={performanceData.returns.current}
                        change={performanceData.returns.change}
                        selected={selectedMetric === 'returns'}
                        onPress={() => setSelectedMetric('returns')}
                    />
                    <MetricCard
                        title="Occupancy"
                        current={performanceData.occupancy.current}
                        change={performanceData.occupancy.change}
                        selected={selectedMetric === 'occupancy'}
                        onPress={() => setSelectedMetric('occupancy')}
                    />
                    <MetricCard
                        title="Revenue"
                        current={performanceData.revenue.current}
                        change={performanceData.revenue.change}
                        selected={selectedMetric === 'revenue'}
                        onPress={() => setSelectedMetric('revenue')}
                    />
                </Animatable.View>

                {/* Performance Chart */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">
                        {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trend
                    </Text>

                    <LineChart
                        data={performanceData[selectedMetric].chartData}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#1a1a1a",
                            backgroundGradientFrom: "#1a1a1a",
                            backgroundGradientTo: "#1a1a1a",
                            decimalPlaces: selectedMetric === 'revenue' ? 0 : 1,
                            color: (opacity = 1) => `rgba(175, 103, 219, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </Animatable.View>

                {/* Additional Metrics */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold mb-4">Key Metrics</Text>

                        <View className="space-y-4">
                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Cash on Cash Return</Text>
                                <Text className="text-secondary font-pmedium">8.5%</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Cap Rate</Text>
                                <Text className="text-secondary font-pmedium">6.2%</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Debt Service Ratio</Text>
                                <Text className="text-secondary font-pmedium">1.25</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-gray-100">Gross Yield</Text>
                                <Text className="text-secondary font-pmedium">9.8%</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PerformanceTracking; 