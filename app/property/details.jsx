import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TokenizationModal, TransferModal } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../lib/api';
import { useGlobalContext } from '../../context/GlobalProvider';
import propertyAPI from '../../lib/propertyApi';

// ============ Constants ============
const ETH_TO_PKR = 746929; // 1 ETH = 746,929 PKR
const ETH_TO_USD = 3000; // 1 ETH = $3,000 USD

// Price formatter functions
const formatPKR = (amount) => {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

const formatUSD = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

// ============ Price Prediction Logic ============
const getMultipliers = (eth) => {
    // Different growth patterns based on ETH ranges
    if (eth <= 1) {
        return [1, 1.12, 1.25]; // Conservative growth for small investments
    } else if (eth <= 5) {
        return [1, 1.28, 1.65]; // Moderate growth for medium investments
    } else if (eth <= 10) {
        return [1, 1.45, 2.10]; // Aggressive growth for larger investments
    } else if (eth <= 25) {
        return [1, 1.60, 2.56]; // Very aggressive growth for substantial investments
    } else {
        return [1, 1.75, 3.06]; // Premium growth for major investments
    }
};

// Generate monthly variations for more realistic graph patterns
const generateMonthlyData = (ethPrice, multipliers) => {
    const monthlyPoints = 24; // 2 years * 12 months
    const finalMultiplier = multipliers[2];
    const data = [];

    // Different patterns based on ETH amount
    const pattern = ethPrice <= 1 ? {
        // Conservative pattern: Small steady growth with minor fluctuations
        trend: 0.008,
        volatility: 0.02,
        cycleAmplitude: 0.01,
        cycleLength: 3
    } : ethPrice <= 5 ? {
        // Moderate pattern: More volatility, clear growth cycles
        trend: 0.015,
        volatility: 0.04,
        cycleAmplitude: 0.03,
        cycleLength: 4
    } : ethPrice <= 10 ? {
        // Aggressive pattern: High volatility, strong growth cycles
        trend: 0.025,
        volatility: 0.06,
        cycleAmplitude: 0.05,
        cycleLength: 6
    } : ethPrice <= 25 ? {
        // Very aggressive pattern: Very high volatility, pronounced cycles
        trend: 0.035,
        volatility: 0.08,
        cycleAmplitude: 0.07,
        cycleLength: 4
    } : {
        // Premium pattern: Extreme volatility, complex cycles
        trend: 0.045,
        volatility: 0.1,
        cycleAmplitude: 0.09,
        cycleLength: 3
    };

    let currentValue = ethPrice;

    for (let i = 0; i <= monthlyPoints; i++) {
        // Base trend
        const trendGrowth = 1 + pattern.trend;

        // Market cycles (sine wave pattern)
        const cycleEffect = 1 + pattern.cycleAmplitude *
            Math.sin((i / pattern.cycleLength) * Math.PI);

        // Random volatility
        const randomFactor = 1 + (Math.random() - 0.5) * pattern.volatility;

        // Combine all factors
        currentValue = currentValue * trendGrowth * cycleEffect * randomFactor;

        // Ensure we reach approximate target by end of period
        if (i === monthlyPoints) {
            currentValue = ethPrice * finalMultiplier;
        }

        // Convert to PKR and add to data
        data.push(Math.round(currentValue * ETH_TO_PKR));
    }

    return data;
};

const getPricePrediction = (ethPrice) => {
    const multipliers = getMultipliers(ethPrice);
    const currentYear = new Date().getFullYear();
    const monthlyData = generateMonthlyData(ethPrice, multipliers);

    // Create labels for every 6 months
    const labels = [];
    for (let i = 0; i <= 24; i += 6) {
        const monthsAhead = i;
        const date = new Date();
        date.setMonth(date.getMonth() + monthsAhead);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    }

    return {
        labels,
        datasets: [{
            data: monthlyData.filter((_, index) => index % 6 === 0), // Sample every 6 months for display
            color: (opacity = 1) => {
                // Different colors based on ETH amount
                if (ethPrice <= 1) return `rgba(75, 192, 192, ${opacity})`; // Teal
                if (ethPrice <= 5) return `rgba(54, 162, 235, ${opacity})`; // Blue
                if (ethPrice <= 10) return `rgba(153, 102, 255, ${opacity})`; // Purple
                if (ethPrice <= 25) return `rgba(255, 159, 64, ${opacity})`; // Orange
                return `rgba(255, 99, 132, ${opacity})`; // Red
            },
            strokeWidth: 2
        }]
    };
};

const formatLargeNumber = (num) => {
    if (num >= 10000000) { // 10 million or more
        return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) { // 100k or more
        return `${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};

// ============ Components ============

const ImageCarousel = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;

    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                    setActiveIndex(newIndex);
                }}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ width: screenWidth, height: 300 }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
            <View className="flex-row justify-center mt-2">
                {images.map((_, index) => (
                    <View
                        key={index}
                        className={`w-2 h-2 rounded-full mx-1 ${index === activeIndex ? 'bg-secondary' : 'bg-gray-500'}`}
                    />
                ))}
            </View>
        </View>
    );
};

const PriceChart = ({ propertyId, basePrice = 0 }) => {
    const data = getPricePrediction(basePrice);
    const multipliers = getMultipliers(basePrice);
    const finalPriceETH = basePrice * multipliers[2];
    const initialPricePKR = basePrice * ETH_TO_PKR;
    const finalPricePKR = finalPriceETH * ETH_TO_PKR;

    // Calculate min and max for better graph scaling
    const maxValue = Math.max(...data.datasets[0].data);
    const minValue = Math.min(...data.datasets[0].data);
    const valueRange = maxValue - minValue;
    const yAxisMin = Math.max(0, minValue - valueRange * 0.1);
    const yAxisMax = maxValue + valueRange * 0.1;

    return (
        <View className="mt-6">
            <Text className="text-white font-psemibold text-lg mb-4">Price Prediction (2 Years)</Text>
            <View className="bg-[#1a1a1a] p-4 rounded-xl">
                <LineChart
                    data={data}
                    width={Dimensions.get('window').width - 64}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1a1a1a',
                        backgroundGradientFrom: '#1a1a1a',
                        backgroundGradientTo: '#1a1a1a',
                        decimalPlaces: 0,
                        color: (opacity = 1) => {
                            // Different colors based on ETH amount
                            if (basePrice <= 1) return `rgba(75, 192, 192, ${opacity})`; // Teal
                            if (basePrice <= 5) return `rgba(54, 162, 235, ${opacity})`; // Blue
                            if (basePrice <= 10) return `rgba(153, 102, 255, ${opacity})`; // Purple
                            if (basePrice <= 25) return `rgba(255, 159, 64, ${opacity})`; // Orange
                            return `rgba(255, 99, 132, ${opacity})`; // Red
                        },
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#af67db"
                        },
                        propsForBackgroundLines: {
                            strokeDasharray: "", // Solid lines
                            stroke: "rgba(255,255,255,0.1)",
                            strokeWidth: 1
                        },
                        formatYLabel: (value) => formatLargeNumber(value)
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                    fromZero={false}
                    segments={5}
                    yAxisInterval={4}
                    yAxisSuffix=""
                    yAxisLabel="Rs. "
                />
            </View>

            <View className="mt-4 bg-black-100/50 p-4 rounded-xl">
                <Text className="text-white font-psemibold mb-4">Predicted Returns</Text>

                {/* Initial Investment */}
                <View className="mb-4 border-b border-gray-800 pb-4">
                    <Text className="text-gray-300 mb-2">Initial Investment</Text>
                    <View className="flex-row justify-between">
                        <Text className="text-white">{basePrice} ETH</Text>
                        <Text className="text-white">{formatPKR(initialPricePKR)}</Text>
                    </View>
                </View>

                {/* Year 1 Projection */}
                <View className="mb-4 border-b border-gray-800 pb-4">
                    <Text className="text-gray-300 mb-2">Year 1 Projection</Text>
                    <View className="flex-row justify-between">
                        <Text className="text-green-500">
                            {(basePrice * multipliers[1]).toFixed(2)} ETH
                        </Text>
                        <Text className="text-green-500">
                            {formatPKR(basePrice * multipliers[1] * ETH_TO_PKR)}
                        </Text>
                    </View>
                </View>

                {/* Year 2 Projection */}
                <View className="mb-4 border-b border-gray-800 pb-4">
                    <Text className="text-gray-300 mb-2">Year 2 Projection</Text>
                    <View className="flex-row justify-between">
                        <Text className="text-green-500">{finalPriceETH.toFixed(2)} ETH</Text>
                        <Text className="text-green-500">{formatPKR(finalPricePKR)}</Text>
                    </View>
                </View>

                {/* Potential Returns */}
                <View>
                    <Text className="text-gray-300 mb-2">Total Returns (2 Years)</Text>
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-green-500">
                                +{(finalPriceETH - basePrice).toFixed(2)} ETH
                            </Text>
                            <Text className="text-gray-300 text-sm">
                                {((finalPriceETH - basePrice) * 100 / basePrice).toFixed(1)}% Growth
                            </Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-green-500">
                                {formatPKR(finalPricePKR - initialPricePKR)}
                            </Text>
                            <Text className="text-gray-300 text-sm">Total Profit</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const PropertyDetails = () => {
    const params = useLocalSearchParams();
    const { logout } = useGlobalContext();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTokenizationModal, setShowTokenizationModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [tokenizationStatus, setTokenizationStatus] = useState('pending');
    const [authToken, setAuthToken] = useState(null);
    const [error, setError] = useState(null);

    const handleAuthError = async () => {
        await AsyncStorage.removeItem('token');
        await logout();
        router.replace('/sign-in');
    };

    useEffect(() => {
        const initializeData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('Token from storage:', token ? 'Present' : 'Missing');

                if (!token) {
                    throw new Error('Authentication required');
                }

                // Validate token format
                if (!token.startsWith('Bearer ')) {
                    console.log('Adding Bearer prefix to token');
                    setAuthToken(`${token}`);
                } else {
                    setAuthToken(token);
                }

                console.log('Property ID:', params.id);
                const propertyData = await propertyAPI.getPropertyById(params.id, token);

                if (propertyData) {
                    console.log('Property data received:', {
                        id: propertyData._id,
                        title: propertyData.title,
                        owner: propertyData.owner
                    });
                    setProperty(propertyData);
                } else {
                    throw new Error('Property not found');
                }
            } catch (error) {
                console.error('Error initializing:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data
                });

                if (error.response?.status === 403) {
                    console.log('Handling 403 error - checking token validity');
                    await handleAuthError();
                } else if (error.response?.status === 401) {
                    console.log('Handling 401 error - unauthorized');
                    await handleAuthError();
                }

                setError(error.response?.data?.message || error.message || 'Failed to load property details');
            } finally {
                setLoading(false);
            }
        };

        initializeData();
    }, [params.id]);

    const handleTokenizationComplete = async (tokenData) => {
        try {
            if (!authToken) {
                throw new Error('Authentication required');
            }

            const response = await propertyAPI.tokenizeProperty(params.id, {
                tokenId: tokenData.tokenId,
                contractAddress: tokenData.contractAddress,
                tokenURI: tokenData.tokenURI,
                transactionHash: tokenData.transactionHash
            }, authToken);

            // Update property state with tokenization data
            setProperty(prev => ({
                ...prev,
                isTokenized: true,
                status: 'tokenized',
                tokenId: tokenData.tokenId,
                contractAddress: tokenData.contractAddress,
                tokenURI: tokenData.tokenURI,
                transactionHash: tokenData.transactionHash
            }));

            setTokenizationStatus('completed');
            setShowTokenizationModal(false);

            // Show success message
            Alert.alert(
                "Success",
                "Property tokenized successfully!",
                [{ text: "OK" }]
            );
        } catch (error) {
            console.error('Tokenization error:', error);
            if (error.response?.status === 403) {
                await handleAuthError();
            }
            setTokenizationStatus('failed');
            Alert.alert(
                "Error",
                error.message || "Failed to tokenize property"
            );
            throw error;
        }
    };

    const handleTransferComplete = async (transferData) => {
        const token = await AsyncStorage.getItem('token');
        try {
            if (!authToken) {
                throw new Error('Authentication required');
            }

            const response = await propertyAPI.transferProperty(params.id, transferData, token);

            // Update property state with transfer data
            // Since 201 status means success, we don't need to check response.success
            setProperty(prev => ({
                ...prev,
                owner: {
                    ...prev.owner,
                    id: transferData.toUserId
                },
                lastTransferPrice: transferData.price,
                lastTransferDate: new Date().toISOString()
            }));

            // Show success message
            Alert.alert(
                "Success",
                "Property transferred successfully!",
                [{ text: "OK" }]
            );

            return response;
        } catch (error) {
            console.error('Transfer error:', error);
            if (error.response?.status === 403) {
                await handleAuthError();
            }
            throw new Error(error.response?.data?.message || 'Transfer failed');
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-primary justify-center items-center">
                <ActivityIndicator size="large" color="#af67db" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-primary justify-center items-center">
                <Text className="text-white text-lg">{error}</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 bg-secondary px-6 py-3 rounded-xl"
                >
                    <Text className="text-white font-pbold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute z-10 top-4 left-4 bg-black/50 p-2 rounded-full"
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>

                {/* Image Carousel */}
                <ImageCarousel images={property.images} />

                {/* Property Details */}
                <View className="p-4">
                    <Animatable.View animation="fadeInUp" delay={300}>
                        <Text className="text-white font-psemibold text-2xl">{property.title}</Text>
                        <View className="mt-2">
                            <Text className="text-secondary font-pmedium text-lg">
                                {property.price} ETH
                            </Text>
                            <Text className="text-gray-300 text-sm">
                                {formatPKR(property.price * ETH_TO_PKR)} PKR
                            </Text>
                            <Text className="text-gray-300 text-sm">
                                {formatUSD(property.price * ETH_TO_USD)} USD
                            </Text>
                        </View>
                        <Text className="text-gray-300 mt-2">{property.address}</Text>

                        {/* Status Badge */}
                        <View className="flex-row mt-2">
                            <View className={`px-3 py-1 rounded-full ${property.isTokenized ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                                <Text className={`font-pbold ${property.isTokenized ? 'text-green-500' : 'text-yellow-500'}`}>
                                    {property.isTokenized ? 'Tokenized' : property.status}
                                </Text>
                            </View>
                        </View>
                    </Animatable.View>

                    {/* Property Stats */}
                    <Animatable.View
                        animation="fadeInUp"
                        delay={400}
                        className="flex-row justify-between mt-6 bg-black-100/50 p-4 rounded-xl"
                    >
                        <View className="items-center">
                            <MaterialCommunityIcons name="bed" size={24} color="#af67db" />
                            <Text className="text-white mt-1">{property.bedrooms} Beds</Text>
                        </View>
                        <View className="items-center">
                            <MaterialCommunityIcons name="shower" size={24} color="#af67db" />
                            <Text className="text-white mt-1">{property.bathrooms} Baths</Text>
                        </View>
                        <View className="items-center">
                            <MaterialCommunityIcons name="ruler-square" size={24} color="#af67db" />
                            <Text className="text-white mt-1">{property.area} sqft</Text>
                        </View>
                        <View className="items-center">
                            <MaterialCommunityIcons name="calendar" size={24} color="#af67db" />
                            <Text className="text-white mt-1">{property.yearBuilt}</Text>
                        </View>
                    </Animatable.View>

                    {/* Description */}
                    <Animatable.View animation="fadeInUp" delay={500} className="mt-6">
                        <Text className="text-white font-psemibold text-lg">Description</Text>
                        <Text className="text-gray-300 mt-2">{property.description}</Text>
                    </Animatable.View>

                    {/* Price Prediction Chart */}
                    <Animatable.View animation="fadeInUp" delay={600}>
                        <PriceChart propertyId={property._id} basePrice={property.price} />
                    </Animatable.View>

                    {/* Property Details */}
                    <Animatable.View animation="fadeInUp" delay={700} className="mt-6">
                        <Text className="text-white font-psemibold text-lg mb-4">Property Details</Text>
                        <View className="bg-black-100/50 p-4 rounded-xl">
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-300">Property ID</Text>
                                <Text className="text-white">{property.propertyId}</Text>
                            </View>
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-300">Property Type</Text>
                                <Text className="text-white">{property.propertyType}</Text>
                            </View>
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-300">Construction Status</Text>
                                <Text className="text-white">{property.constructionStatus}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-300">Verification Status</Text>
                                <Text className={property.isVerified ? 'text-green-500' : 'text-yellow-500'}>
                                    {property.isVerified ? 'Verified' : 'Pending'}
                                </Text>
                            </View>
                        </View>
                    </Animatable.View>

                    {/* Owner Details */}
                    <Animatable.View animation="fadeInUp" delay={800} className="mt-6">
                        <Text className="text-white font-psemibold text-lg mb-4">Owner Details</Text>
                        <View className="bg-black-100/50 p-4 rounded-xl">
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-300">Name</Text>
                                <Text className="text-white">{property.owner.name}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-300">Email</Text>
                                <Text className="text-white">{property.owner.email}</Text>
                            </View>
                        </View>
                    </Animatable.View>

                    {/* Action Buttons */}
                    <Animatable.View animation="fadeInUp" delay={900} className="mt-6 mb-8">
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                className="flex-1 mr-2"
                                onPress={() => {
                                    if (!property.isTokenized) {
                                        setShowTokenizationModal(true);
                                    }
                                }}
                                disabled={property.isTokenized}
                            >
                                <LinearGradient
                                    colors={property.isTokenized ? ['#4CAF50', '#45a049'] : ['#af67db', '#194db5']}
                                    className="py-4 px-6 rounded-xl"
                                >
                                    <Text className="text-white font-pbold text-center">
                                        {property.isTokenized ? 'Already Tokenized' : 'Tokenize Property'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 ml-2"
                                onPress={() => {
                                    if (property.isTokenized) {
                                        setShowTransferModal(true);
                                    } else {
                                        Alert.alert(
                                            "Property Not Tokenized",
                                            "Please tokenize the property before transferring.",
                                            [
                                                {
                                                    text: "Tokenize Now",
                                                    onPress: () => setShowTokenizationModal(true)
                                                },
                                                {
                                                    text: "Cancel",
                                                    style: "cancel"
                                                }
                                            ]
                                        );
                                    }
                                }}
                            >
                                <LinearGradient
                                    colors={property.isTokenized ? ['#194db5', '#af67db'] : ['#666', '#444']}
                                    className={`py-4 px-6 rounded-xl ${!property.isTokenized ? 'opacity-70' : ''}`}
                                >
                                    <Text className="text-white font-pbold text-center">
                                        {property.isTokenized ? 'Transfer Property' : 'Tokenize First'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            </ScrollView>

            {/* Tokenization Modal */}
            <TokenizationModal
                visible={showTokenizationModal}
                onClose={() => setShowTokenizationModal(false)}
                onComplete={(tokenData) => {
                    handleTokenizationComplete(tokenData)
                        .then(() => {
                            setShowTokenizationModal(false);
                        })
                        .catch((error) => {
                            // Error will be handled by the modal
                            console.error('Tokenization failed:', error);
                        });
                }}
                property={property}
                authToken={authToken}
            />

            {/* Transfer Modal */}
            <TransferModal
                visible={showTransferModal}
                onClose={() => setShowTransferModal(false)}
                onComplete={handleTransferComplete}
                property={property}
                authToken={authToken}
            />
        </SafeAreaView>
    );
};

export default PropertyDetails; 