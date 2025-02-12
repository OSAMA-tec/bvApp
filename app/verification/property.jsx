import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PropertyVerification = () => {
    const [properties, setProperties] = useState([
        {
            id: '1',
            name: 'Miami Beach Villa',
            status: 'Pending',
            type: 'Residential',
            documents: '3/5 Verified',
            lastUpdate: '2024-03-15'
        },
        {
            id: '2',
            name: 'Downtown Condo',
            status: 'In Progress',
            type: 'Commercial',
            documents: '4/5 Verified',
            lastUpdate: '2024-03-14'
        }
    ]);

    const PropertyCard = ({ property }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <TouchableOpacity onPress={() => router.push("/verification/title")}>
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl"
                >
                    <View className="flex-row justify-between items-center mb-2">
                        <View>
                            <Text className="text-white font-psemibold">{property.name}</Text>
                            <Text className="text-gray-100 text-sm">{property.type}</Text>
                        </View>
                        <View className={`px-3 py-1 rounded-full ${property.status === 'Pending' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                            }`}>
                            <Text className={`font-pbold ${property.status === 'Pending' ? 'text-yellow-500' : 'text-blue-500'
                                }`}>
                                {property.status}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-100">{property.documents}</Text>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={24}
                            color="#af67db"
                        />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
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

                    <Text className="text-2xl text-white font-psemibold">Property Verification</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Verify your property documents and title
                    </Text>
                </Animatable.View>

                {/* Properties List */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                >
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PropertyVerification; 