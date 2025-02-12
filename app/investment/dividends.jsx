import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const DividendHistory = () => {
    const [timeframe, setTimeframe] = useState('1Y');

    const dividendData = {
        totalReturns: '12,500',
        yearToDate: '8,250',
        monthlyAverage: '1,042',
        history: [
            { month: 'Jan', amount: 1000, growth: '+5%' },
            { month: 'Feb', amount: 1100, growth: '+10%' },
            { month: 'Mar', amount: 950, growth: '-14%' },
            { month: 'Apr', amount: 1200, growth: '+26%' },
            { month: 'May', amount: 1150, growth: '-4%' },
            { month: 'Jun', amount: 1300, growth: '+13%' }
        ],
        chartData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                data: [1000, 1100, 950, 1200, 1150, 1300]
            }]
        }
    };

    const TimeframeButton = ({ label, active }) => (
        <TouchableOpacity
            onPress={() => setTimeframe(label)}
            className={`px-4 py-2 rounded-full ${active ? 'bg-secondary/20' : 'bg-black-100/50'
                }`}
        >
            <Text className={`${active ? 'text-secondary' : 'text-gray-100'
                } font-pmedium`}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    const DividendCard = ({ data }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center">
                    <Text className="text-white font-psemibold">{data.month}</Text>
                    <View className={`px-3 py-1 rounded-full ${data.growth.includes('+') ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                        <Text className={`font-pbold ${data.growth.includes('+') ? 'text-green-500' : 'text-red-500'
                            }`}>
                            {data.growth}
                        </Text>
                    </View>
                </View>
                <View className="mt-2">
                    <Text className="text-secondary font-pmedium text-lg">
                        ${data.amount.toLocaleString()}
                    </Text>
                    <Text className="text-gray-100 text-sm">Monthly Return</Text>
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

                    <Text className="text-2xl text-white font-psemibold">Dividend History</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Track your investment returns
                    </Text>
                </Animatable.View>

                {/* Overview Cards */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <LinearGradient
                                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                className="p-4 rounded-xl"
                            >
                                <Text className="text-gray-100">Total Returns</Text>
                                <Text className="text-white font-psemibold text-lg mt-1">
                                    ${dividendData.totalReturns}
                                </Text>
                            </LinearGradient>
                        </View>
                        <View className="flex-1">
                            <LinearGradient
                                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                className="p-4 rounded-xl"
                            >
                                <Text className="text-gray-100">Year to Date</Text>
                                <Text className="text-white font-psemibold text-lg mt-1">
                                    ${dividendData.yearToDate}
                                </Text>
                            </LinearGradient>
                        </View>
                        <View className="flex-1">
                            <LinearGradient
                                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                className="p-4 rounded-xl"
                            >
                                <Text className="text-gray-100">Monthly Average</Text>
                                <Text className="text-white font-psemibold text-lg mt-1">
                                    ${dividendData.monthlyAverage}
                                </Text>
                            </LinearGradient>
                        </View>
                    </View>
                </Animatable.View>

                {/* Dividend History Cards */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={600}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">Dividend History</Text>
                    <ScrollView horizontal>
                        {dividendData.history.map((item, index) => (
                            <DividendCard key={index} data={item} />
                        ))}
                    </ScrollView>
                </Animatable.View>

                {/* Dividend Chart */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={900}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold mb-4">Dividend Chart</Text>
                    <BarChart
                        data={dividendData.chartData}
                        width={screenWidth - 40}
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix=""
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default DividendHistory; 