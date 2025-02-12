import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import LocationMap from './components/LocationMap';
import AnalysisHeader from '../../components/AnalysisHeader';

const { width } = Dimensions.get('window');

const PriceAnalysis = () => {
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [bedrooms, setBedrooms] = useState('3');
    const [baths, setBaths] = useState('2');
    const [size, setSize] = useState('1000');
    const [predictionResult, setPredictionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingLocations, setFetchingLocations] = useState(true);
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await fetch('https://ml-bv.onrender.com/locations');
            const data = await response.json();
            setCities(data.cities);
            setLocations(data.locations);
        } catch (error) {
            console.error('Error fetching locations:', error);
        } finally {
            setFetchingLocations(false);
        }
    };

    const handlePredict = async () => {
        if (!selectedCity || !selectedLocation || !bedrooms || !baths || !size) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://ml-bv.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city: selectedCity,
                    location: selectedLocation,
                    bedrooms: parseInt(bedrooms),
                    baths: parseInt(baths),
                    size: parseInt(size)
                })
            });
            const data = await response.json();
            setPredictionResult(data);
        } catch (error) {
            alert('Error making prediction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const CustomPicker = ({ selectedValue, onValueChange, items, placeholder, enabled = true, icon }) => (
        <Animatable.View animation="fadeIn" className="mb-6">
            <Text className="text-gray-300 mb-2 font-pregular ml-2">{placeholder}</Text>
            <View className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg">
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="flex-row items-center px-4"
                >
                    <MaterialCommunityIcons name={icon} size={24} color="#af67db" />
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={onValueChange}
                        enabled={enabled}
                        style={{
                            color: enabled ? 'white' : '#666',
                            height: 56,
                            backgroundColor: 'transparent',
                            flex: 1,
                            marginLeft: 12
                        }}
                    >
                        <Picker.Item
                            label={placeholder}
                            value=""
                            style={{ color: '#666', fontSize: 16 }}
                        />
                        {items.map(item => (
                            <Picker.Item
                                key={item}
                                label={item}
                                value={item}
                                style={{
                                    backgroundColor: '#2a2a2a',
                                    color: 'white',
                                    fontSize: 16
                                }}
                            />
                        ))}
                    </Picker>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={24}
                        color="#af67db"
                    />
                </LinearGradient>
            </View>
        </Animatable.View>
    );

    const CustomInput = ({ placeholder, value, onChangeText, keyboardType, icon }) => (
        <Animatable.View animation="fadeIn" className="mb-6">
            <Text className="text-gray-300 mb-2 font-pregular ml-2">{placeholder}</Text>
            <View className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg">
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="flex-row items-center px-4"
                >
                    <MaterialCommunityIcons name={icon} size={24} color="#af67db" />
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        className="flex-1 text-white py-4 px-3 ml-2 text-base font-pregular"
                        placeholderTextColor="#666"
                        style={{ height: 56 }}
                    />
                </LinearGradient>
            </View>
        </Animatable.View>
    );

    const renderDetailedAnalysisButton = () => (
        <Animatable.View animation="fadeInUp" delay={500}>
            <TouchableOpacity
                onPress={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                className="mt-6 mb-4"
            >
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                    className="p-4 rounded-xl flex-row justify-between items-center"
                >
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons name="chart-box-outline" size={24} color="#af67db" />
                        <Text className="text-white font-psemibold ml-3">
                            {showDetailedAnalysis ? 'Hide Detailed Analysis' : 'View Detailed Analysis'}
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        name={showDetailedAnalysis ? "chevron-up" : "chevron-down"}
                        size={24}
                        color="#af67db"
                    />
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View>
    );

    const renderDetailedAnalysis = () => {
        if (!showDetailedAnalysis) return null;

        const futureYears = Object.keys(predictionResult.future_predictions);

        return (
            <Animatable.View animation="fadeInDown" className="space-y-4 mt-4">
                {futureYears.map((year, index) => (
                    <Animatable.View
                        key={year}
                        animation="fadeInRight"
                        delay={index * 100}
                    >
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                            className="p-4 rounded-xl"
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-gray-300 font-pregular">{year}</Text>
                                    <Text className="text-white font-pbold text-lg">
                                        {predictionResult.future_predictions[year].price_formatted}
                                    </Text>
                                </View>
                                <View>
                                    <Text className="text-gray-300 text-right font-pregular">Price per sq ft</Text>
                                    <Text className="text-secondary font-pbold">
                                        ₨{predictionResult.future_predictions[year].price_per_sqft}
                                    </Text>
                                </View>
                            </View>
                            <View className="mt-2 flex-row items-center">
                                <MaterialCommunityIcons
                                    name="trending-up"
                                    size={20}
                                    color="#10b981"
                                />
                                <Text className="text-green-500 ml-2 font-psemibold">
                                    {((predictionResult.future_predictions[year].price /
                                        predictionResult.current_prediction.price - 1) * 100).toFixed(1)}% growth
                                </Text>
                            </View>
                        </LinearGradient>
                    </Animatable.View>
                ))}
            </Animatable.View>
        );
    };

    const renderPriceChart = () => {
        if (!predictionResult) return null;

        const years = Object.keys(predictionResult.future_predictions);
        const prices = years.map(year =>
            predictionResult.future_predictions[year].price / 1000000);

        return (
            <Animatable.View animation="fadeIn" delay={300} className="mt-6">
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl"
                >
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white font-psemibold text-lg">Price Trend</Text>
                        <MaterialCommunityIcons name="chart-line" size={24} color="#af67db" />
                    </View>
                    <LineChart
                        data={{
                            labels: years,
                            datasets: [{
                                data: prices,
                                strokeWidth: 2,
                                color: (opacity = 1) => `rgba(175, 103, 219, ${opacity})`
                            }]
                        }}
                        width={width - 48}
                        height={220}
                        chartConfig={{
                            backgroundColor: 'transparent',
                            backgroundGradientFrom: '#2a2a2a',
                            backgroundGradientTo: '#1a1a1a',
                            decimalPlaces: 1,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#af67db"
                            },
                            propsForLabels: {
                                fontSize: 12
                            }
                        }}
                        bezier
                        style={{
                            borderRadius: 16,
                            paddingRight: 0
                        }}
                    />
                </LinearGradient>
            </Animatable.View>
        );
    };

    const renderPredictionDetails = () => (
        <Animatable.View animation="fadeInUp" delay={200} className="space-y-4">
            <View className="flex-row space-x-2">
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                    className="flex-1 p-4 rounded-xl"
                >
                    <MaterialCommunityIcons name="home" size={24} color="#af67db" />
                    <Text className="text-gray-300 mt-2 font-pregular">Property Size</Text>
                    <Text className="text-white font-pbold text-lg">
                        {predictionResult.property_details.size} sq ft
                    </Text>
                </LinearGradient>

                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                    className="flex-1 p-4 rounded-xl"
                >
                    <MaterialCommunityIcons name="currency-usd" size={24} color="#af67db" />
                    <Text className="text-gray-300 mt-2 font-pregular">Price per sq ft</Text>
                    <Text className="text-white font-pbold text-lg">
                        ₨{predictionResult.current_prediction.price_per_sqft}
                    </Text>
                </LinearGradient>
            </View>

            <LinearGradient
                colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                className="p-6 rounded-xl"
            >
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-white font-psemibold text-lg mb-2">
                            Predicted Price
                        </Text>
                        <Text className="text-secondary font-pbold text-3xl">
                            {predictionResult.current_prediction.price_formatted}
                        </Text>
                    </View>
                    <MaterialCommunityIcons name="trending-up" size={48} color="#af67db" />
                </View>
                <Text className="text-gray-300 mt-4 font-pregular">
                    Based on current market trends and property details
                </Text>
            </LinearGradient>
        </Animatable.View>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                <AnalysisHeader
                    title="Price Analysis"
                    subtitle="AI-powered property price predictions"
                />

                <View className="space-y-4">
                    {fetchingLocations ? (
                        <ActivityIndicator color="#af67db" size="large" />
                    ) : (
                        <Animatable.View animation="fadeInUp" className="space-y-4">
                            <LinearGradient
                                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                                className="p-6 rounded-xl mb-6"
                            >
                                <View className="space-y-2">
                                    <CustomPicker
                                        selectedValue={selectedCity}
                                        onValueChange={setSelectedCity}
                                        items={cities}
                                        placeholder="Select City"
                                        icon="city"
                                    />

                                    <CustomPicker
                                        selectedValue={selectedLocation}
                                        onValueChange={setSelectedLocation}
                                        items={locations}
                                        placeholder="Select Location"
                                        enabled={!!selectedCity}
                                        icon="map-marker"
                                    />

                                    <View className="flex-row space-x-4">
                                        <View className="flex-1">
                                            <CustomInput
                                                placeholder="Bedrooms"
                                                value={bedrooms}
                                                onChangeText={setBedrooms}
                                                keyboardType="numeric"
                                                icon="bed"
                                            />
                                        </View>
                                        <View className="flex-1">
                                            <CustomInput
                                                placeholder="Bathrooms"
                                                value={baths}
                                                onChangeText={setBaths}
                                                keyboardType="numeric"
                                                icon="shower"
                                            />
                                        </View>
                                    </View>

                                    <CustomInput
                                        placeholder="Size (sq ft)"
                                        value={size}
                                        onChangeText={setSize}
                                        keyboardType="numeric"
                                        icon="ruler-square"
                                    />
                                </View>
                            </LinearGradient>

                            <TouchableOpacity
                                onPress={handlePredict}
                                disabled={loading}
                                className={`p-4 rounded-xl ${loading ? 'bg-gray-500' : 'bg-secondary'}`}
                            >
                                {loading ? (
                                    <View className="flex-row justify-center items-center space-x-2">
                                        <ActivityIndicator color="white" size="small" />
                                        <Text className="text-white font-psemibold">Analyzing...</Text>
                                    </View>
                                ) : (
                                    <Text className="text-white text-center font-psemibold">
                                        Predict Price
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </Animatable.View>
                    )}

                    {predictionResult && (
                        <>
                            {renderPredictionDetails()}
                            {renderPriceChart()}
                            {renderDetailedAnalysisButton()}
                            {renderDetailedAnalysis()}
                            <Animatable.View animation="fadeInUp" delay={400}>
                                <LocationMap
                                    location={selectedLocation}
                                    city={selectedCity}
                                />
                            </Animatable.View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PriceAnalysis;