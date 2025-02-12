import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, Dimensions, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Helper Components
const StatItem = ({ icon, value, label }) => (
    <View className="items-center">
        <Text className="text-xl mb-1">{icon}</Text>
        <Text className="text-white font-psemibold">{value}</Text>
        <Text className="text-gray-100 text-xs font-pregular">{label}</Text>
    </View>
);

const DetailRow = ({ label, value }) => (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-800">
        <Text className="text-gray-100 font-pregular">{label}</Text>
        <Text className="text-white font-psemibold">{value}</Text>
    </View>
);

const getStatusColor = (status) => {
    const colors = {
        'Available': 'bg-green-500/80',
        'Featured': 'bg-secondary/80',
        'Hot': 'bg-red-500/80',
        'New': 'bg-blue-500/80',
        'Limited': 'bg-yellow-500/80',
        'Popular': 'bg-purple-500/80'
    };
    return colors[status] || 'bg-gray-500/80';
};

const NFTDetailsModal = ({ visible, onClose, ...props }) => (
    <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
    >
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView>
                {/* Header with close button */}
                <View className="flex-row justify-between items-center p-4">
                    <Text className="text-white font-pbold text-xl">Property Details</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close-circle" size={32} color="#af67db" />
                    </TouchableOpacity>
                </View>

                {/* Main Image */}
                <Image
                    source={props.thumbnail}
                    className="w-full h-[300px]"
                    resizeMode="cover"
                />

                {/* Content Container */}
                <View className="p-4">
                    {/* Title and Price Section */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                                <Text className="text-2xl text-white font-pbold">{props.title}</Text>
                                <Text className="text-gray-100 mt-1">{props.location}</Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-secondary text-xl font-pbold">{props.price}</Text>
                                <Text className="text-gray-100">{props.usdPrice}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Status and Type */}
                    <View className="flex-row gap-2 mb-6">
                        <View className={`px-3 py-1 rounded-full ${getStatusColor(props.status)}`}>
                            <Text className="text-white font-pbold">{props.status}</Text>
                        </View>
                        <View className="bg-black-100 px-3 py-1 rounded-full">
                            <Text className="text-white font-pbold">{props.propertyType}</Text>
                        </View>
                    </View>

                    {/* Property Stats */}
                    <View className="flex-row justify-between mb-6 bg-black-100 p-4 rounded-xl">
                        <StatItem icon="🛏️" value={props.bedrooms} label="Bedrooms" />
                        <StatItem icon="🚿" value={props.bathrooms} label="Bathrooms" />
                        <StatItem icon="📏" value={props.area} label="Area" />
                        <StatItem icon="💰" value={props.returns} label="Returns" />
                    </View>

                    {/* Description */}
                    <View className="mb-6">
                        <Text className="text-white font-pbold text-lg mb-2">Description</Text>
                        <Text className="text-gray-100 leading-5">{props.description}</Text>
                    </View>

                    {/* Amenities */}
                    <View className="mb-6">
                        <Text className="text-white font-pbold text-lg mb-2">Amenities</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {props.amenities.map((amenity, index) => (
                                <View key={index} className="bg-black-100 px-3 py-1 rounded-full">
                                    <Text className="text-gray-100">{amenity}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Investment Details */}
                    <View className="mb-6">
                        <Text className="text-white font-pbold text-lg mb-2">Investment Details</Text>
                        <View className="bg-black-100 p-4 rounded-xl">
                            <DetailRow label="Minimum Investment" value={props.investmentDetails.minInvestment} />
                            <DetailRow label="Total Investors" value={props.investmentDetails.totalInvestors} />
                            <DetailRow label="Total Raised" value={props.investmentDetails.totalRaised} />
                            <DetailRow label="Target Raise" value={props.investmentDetails.targetRaise} />
                            <DetailRow label="Property Value" value={props.investmentDetails.propertyValue} />
                        </View>
                    </View>

                    {/* Investment Button */}
                    <TouchableOpacity
                        className="bg-secondary py-4 rounded-xl mb-6"
                        activeOpacity={0.7}
                    >
                        <Text className="text-white font-pbold text-center text-lg">
                            Invest Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    </Modal>
);

const NFTCard = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <Animatable.View
                animation="fadeInUp"
                className="mx-4 mb-8"
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowDetails(true)}
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="rounded-3xl p-4"
                    >
                        {/* Status Badge */}
                        <View className="absolute top-6 right-6 z-10">
                            <View className={`px-4 py-1 rounded-full ${getStatusColor(props.status)}`}>
                                <Text className="text-white font-pbold text-sm">{props.status}</Text>
                            </View>
                        </View>

                        {/* Main Image */}
                        <Image
                            source={props.thumbnail}
                            className="w-full h-[220px] rounded-2xl mb-4"
                            resizeMode="cover"
                        />

                        {/* Title and Price */}
                        <View className="flex-row justify-between items-start mb-3">
                            <View className="flex-1 pr-4">
                                <Text className="font-psemibold text-xl text-white mb-1">
                                    {props.title}
                                </Text>
                                <Text className="text-gray-100 font-pregular">
                                    {props.location}
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-secondary font-pbold text-lg">
                                    {props.price}
                                </Text>
                                <Text className="text-gray-100 font-pregular">
                                    {props.usdPrice}
                                </Text>
                            </View>
                        </View>

                        {/* Quick Stats */}
                        <View className="flex-row justify-between mb-4">
                            <StatItem icon="🛏️" value={props.bedrooms} label="Beds" />
                            <StatItem icon="🚿" value={props.bathrooms} label="Baths" />
                            <StatItem icon="📏" value={props.area} label="Area" />
                            <StatItem icon="💰" value={props.returns} label="ROI" />
                        </View>

                        {/* View Details Button */}
                        <View className="bg-secondary/20 py-4 rounded-xl mt-2">
                            <Text className="text-secondary font-pbold text-center text-lg">
                                View Property Details
                            </Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>

            {/* Details Modal */}
            <NFTDetailsModal
                visible={showDetails}
                onClose={() => setShowDetails(false)}
                {...props}
            />
        </>
    );
};

export default NFTCard;