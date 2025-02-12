import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import LocationMap from './components/LocationMap';

const PredictionSection = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [bedrooms, setBedrooms] = useState(1);
    const [baths, setBaths] = useState(1);
    const [size, setSize] = useState(1000);
    const [predictionResult, setPredictionResult] = useState(null);

    const cities = ["Faisalabad", "Islamabad", "Karachi", "Lahore", "Rawalpindi"];

    const handlePredict = async () => {
        try {
            const response = await fetch('https://ml-bv.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city: selectedCity,
                    location: selectedLocation,
                    bedrooms: bedrooms,
                    baths: baths,
                    size: size
                })
            });

            const data = await response.json();
            setPredictionResult(data);
        } catch (error) {
            console.error('Prediction error:', error);
        }
    };

    const renderPriceChart = () => {
        if (!predictionResult) return null;

        const years = Object.keys(predictionResult.future_predictions);
        const prices = years.map(year =>
            predictionResult.future_predictions[year].price / 1000000); // Convert to millions

        return (
            <LineChart
                data={{
                    labels: years,
                    datasets: [{
                        data: prices
                    }]
                }}
                width={350}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 100, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        );
    };

    return (
        <ScrollView className="p-4">
            <View className="space-y-4">
                {/* City Selection */}
                <Picker
                    selectedValue={selectedCity}
                    onValueChange={(value) => setSelectedCity(value)}
                >
                    <Picker.Item label="Select City" value="" />
                    {cities.map(city => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>

                {/* Location Selection */}
                <Picker
                    selectedValue={selectedLocation}
                    onValueChange={(value) => setSelectedLocation(value)}
                >
                    <Picker.Item label="Select Location" value="" />
                    {locations.map(location => (
                        <Picker.Item key={location} label={location} value={location} />
                    ))}
                </Picker>

                {/* Property Details */}
                <View className="space-y-2">
                    <Text className="text-lg font-semibold">Property Details</Text>
                    <TextInput
                        placeholder="Bedrooms"
                        value={bedrooms.toString()}
                        onChangeText={(text) => setBedrooms(parseInt(text) || 1)}
                        keyboardType="numeric"
                        className="border p-2 rounded"
                    />
                    <TextInput
                        placeholder="Bathrooms"
                        value={baths.toString()}
                        onChangeText={(text) => setBaths(parseInt(text) || 1)}
                        keyboardType="numeric"
                        className="border p-2 rounded"
                    />
                    <TextInput
                        placeholder="Size (sq ft)"
                        value={size.toString()}
                        onChangeText={(text) => setSize(parseInt(text) || 1000)}
                        keyboardType="numeric"
                        className="border p-2 rounded"
                    />
                </View>

                {/* Predict Button */}
                <TouchableOpacity
                    onPress={handlePredict}
                    className="bg-blue-500 p-4 rounded-lg"
                >
                    <Text className="text-white text-center font-semibold">
                        Predict Price
                    </Text>
                </TouchableOpacity>

                {/* Results Section */}
                {predictionResult && (
                    <View className="space-y-4">
                        <Text className="text-xl font-bold">
                            Current Prediction: {predictionResult.current_prediction.price_formatted}
                        </Text>

                        <Text className="text-lg font-semibold">Price Trend</Text>
                        {renderPriceChart()}

                        <LocationMap
                            location={selectedLocation}
                            city={selectedCity}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default PredictionSection; 