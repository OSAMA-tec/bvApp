import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ROICalculator = () => {
    const [purchasePrice, setPurchasePrice] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [expenses, setExpenses] = useState('');
    const [appreciation, setAppreciation] = useState('');
    const [showResults, setShowResults] = useState(false);

    const calculateROI = () => {
        // Add your ROI calculation logic here
        setShowResults(true);
    };

    const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'numeric' }) => (
        <View className="mb-4">
            <Text className="text-white font-pmedium mb-2">{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#666"
                keyboardType={keyboardType}
                className="bg-black-100/50 p-4 rounded-xl text-white font-pregular"
            />
        </View>
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

                    <Text className="text-2xl text-white font-psemibold">ROI Calculator</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Calculate your potential returns
                    </Text>
                </Animatable.View>

                {/* Calculator Form */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <InputField
                        label="Purchase Price ($)"
                        value={purchasePrice}
                        onChangeText={setPurchasePrice}
                        placeholder="Enter property price"
                    />

                    <InputField
                        label="Monthly Rent ($)"
                        value={monthlyRent}
                        onChangeText={setMonthlyRent}
                        placeholder="Expected monthly rent"
                    />

                    <InputField
                        label="Monthly Expenses ($)"
                        value={expenses}
                        onChangeText={setExpenses}
                        placeholder="Maintenance, taxes, etc."
                    />

                    <InputField
                        label="Annual Appreciation (%)"
                        value={appreciation}
                        onChangeText={setAppreciation}
                        placeholder="Expected appreciation rate"
                    />

                    <TouchableOpacity
                        onPress={calculateROI}
                        className="mt-4"
                    >
                        <LinearGradient
                            colors={['#af67db', '#6b8cce']}
                            className="p-4 rounded-xl"
                        >
                            <Text className="text-white text-center font-psemibold">
                                Calculate ROI
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>

                {/* Results Section */}
                {showResults && (
                    <Animatable.View
                        animation="fadeInUp"
                        className="mb-6"
                    >
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                            className="p-4 rounded-xl"
                        >
                            <Text className="text-white font-psemibold mb-4">Investment Analysis</Text>

                            <View className="space-y-4">
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-100">Cash Flow (Monthly)</Text>
                                    <Text className="text-secondary font-pmedium">$1,200</Text>
                                </View>

                                <View className="flex-row justify-between">
                                    <Text className="text-gray-100">Annual ROI</Text>
                                    <Text className="text-secondary font-pmedium">8.5%</Text>
                                </View>

                                <View className="flex-row justify-between">
                                    <Text className="text-gray-100">5-Year Projection</Text>
                                    <Text className="text-secondary font-pmedium">$125,000</Text>
                                </View>

                                <View className="flex-row justify-between">
                                    <Text className="text-gray-100">Break-even Period</Text>
                                    <Text className="text-secondary font-pmedium">4.2 years</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </Animatable.View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ROICalculator; 