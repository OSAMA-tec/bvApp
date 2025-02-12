import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const PortfolioDashboard = () => {
    const [timeframe, setTimeframe] = useState('1M');

    const portfolioData = {
        totalValue: '125,000',
        returns: '+12.5%',
        properties: 3,
        chartData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                    data: [100000, 105000, 103000, 115000, 120000, 125000]
                }
            ]
        }
    };

    const properties = [
        {
            id: '1',
            name: 'Miami Beach Villa',
            value: '75,000',
            returns: '+15.2%',
            type: 'Residential'
        },
        {
            id: '2',
            name: 'Downtown Office Space',
            value: '35,000',
            returns: '+8.7%',
            type: 'Commercial'
        },
        {
            id: '3',
            name: 'Beachfront Condo',
            value: '15,000',
            returns: '+11.3%',
            type: 'Residential'
        }
    ];

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

    const PropertyCard = ({ property }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center mb-2">
                    <View>
                        <Text className="text-white font-psemibold">{property.name}</Text>
                        <Text className="text-gray-100 text-sm">{property.type}</Text>
                    </View>
                    <View className="bg-green-500/20 px-3 py-1 rounded-full">
                        <Text className="text-green-500 font-pbold">{property.returns}</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-secondary font-pmedium">${property.value}</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={24}
                            color="#af67db"
                        />
                    </TouchableOpacity>
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

                    <Text className="text-2xl text-white font-psemibold">Portfolio Dashboard</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Track your investment portfolio
                    </Text>
                </Animatable.View>

                {/* Portfolio Overview */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold">Total Portfolio Value</Text>
                        <View className="flex-row items-center mt-2">
                            <Text className="text-2xl text-white font-pbold">
                                ${portfolioData.totalValue}
                            </Text>
                            <View className="bg-green-500/20 px-3 py-1 rounded-full ml-3">
                                <Text className="text-green-500 font-pbold">
                                    {portfolioData.returns}
                                </Text>
                            </View>
                        </View>
                        <Text className="text-gray-100 mt-1">
                            {portfolioData.properties} Properties
                        </Text>
                    </LinearGradient>
                </Animatable.View>

                {/* Performance Chart */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    <View className="flex-row justify-between mb-4">
                        <Text className="text-white font-psemibold">Performance</Text>
                        <View className="flex-row space-x-2">
                            <TimeframeButton label="1M" active={timeframe === '1M'} />
                            <TimeframeButton label="3M" active={timeframe === '3M'} />
                            <TimeframeButton label="1Y" active={timeframe === '1Y'} />
                        </View>
                    </View>

                    <LineChart
                        data={portfolioData.chartData}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#1a1a1a",
                            backgroundGradientFrom: "#1a1a1a",
                            backgroundGradientTo: "#1a1a1a",
                            decimalPlaces: 0,
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

                {/* Properties List */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                >
                    <Text className="text-white font-psemibold mb-4">Your Properties</Text>
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PortfolioDashboard; 