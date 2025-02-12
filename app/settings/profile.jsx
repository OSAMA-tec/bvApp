import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileSettings = () => {
    const [profileData, setProfileData] = useState({
        name: "BlockVest Investor",
        email: "investor@blockvest.com",
        phone: "+1 234 567 8900",
        country: "United States",
        language: "English",
        timezone: "EST (UTC-5)"
    });

    const SettingItem = ({ icon, title, value, action }) => (
        <TouchableOpacity onPress={action}>
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl mb-4"
            >
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name={icon}
                            size={24}
                            color="#af67db"
                        />
                        <View className="ml-3">
                            <Text className="text-white font-psemibold">{title}</Text>
                            <Text className="text-gray-100 text-sm">{value}</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="#af67db"
                    />
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

                    <Text className="text-2xl text-white font-psemibold">Profile Settings</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Manage your profile information
                    </Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={300}>
                    <SettingItem
                        icon="account"
                        title="Full Name"
                        value={profileData.name}
                        action={() => { }}
                    />
                    <SettingItem
                        icon="email"
                        title="Email"
                        value={profileData.email}
                        action={() => { }}
                    />
                    <SettingItem
                        icon="phone"
                        title="Phone"
                        value={profileData.phone}
                        action={() => { }}
                    />
                    <SettingItem
                        icon="map-marker"
                        title="Country"
                        value={profileData.country}
                        action={() => { }}
                    />
                    <SettingItem
                        icon="translate"
                        title="Language"
                        value={profileData.language}
                        action={() => { }}
                    />
                    <SettingItem
                        icon="clock-outline"
                        title="Timezone"
                        value={profileData.timezone}
                        action={() => { }}
                    />
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileSettings; 