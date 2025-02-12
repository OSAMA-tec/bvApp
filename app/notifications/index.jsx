import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationCenter = () => {
    const [filter, setFilter] = useState('all');

    const notifications = [
        {
            id: '1',
            type: 'transaction',
            title: 'Payment Successful',
            message: 'Your payment of $1,500 has been processed',
            timestamp: '2 hours ago',
            read: false
        },
        {
            id: '2',
            type: 'security',
            title: 'New Login Detected',
            message: 'New login from Chrome browser',
            timestamp: '5 hours ago',
            read: true
        },
        {
            id: '3',
            type: 'update',
            title: 'Property Update',
            message: 'Price change alert for Miami Beach Villa',
            timestamp: '1 day ago',
            read: false
        }
    ];

    const getIconForType = (type) => {
        const icons = {
            transaction: 'cash',
            security: 'shield-alert',
            update: 'bell-ring',
            system: 'cog'
        };
        return icons[type] || 'bell';
    };

    const FilterButton = ({ label, value }) => (
        <TouchableOpacity
            onPress={() => setFilter(value)}
            className={`px-4 py-2 rounded-full ${filter === value ? 'bg-secondary/20' : 'bg-black-100/50'
                }`}
        >
            <Text className={`${filter === value ? 'text-secondary' : 'text-gray-100'
                } font-pmedium`}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    const NotificationCard = ({ notification }) => (
        <TouchableOpacity className="mb-4">
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className={`p-4 rounded-xl ${!notification.read ? 'border border-secondary/30' : ''}`}
            >
                <View className="flex-row items-start">
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${notification.read ? 'bg-gray-700' : 'bg-secondary/20'
                        }`}>
                        <MaterialCommunityIcons
                            name={getIconForType(notification.type)}
                            size={24}
                            color={notification.read ? '#666' : '#af67db'}
                        />
                    </View>
                    <View className="ml-3 flex-1">
                        <View className="flex-row justify-between items-start">
                            <Text className="text-white font-psemibold flex-1">
                                {notification.title}
                            </Text>
                            <Text className="text-gray-100 text-sm">
                                {notification.timestamp}
                            </Text>
                        </View>
                        <Text className="text-gray-100 mt-1">
                            {notification.message}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                {/* Header */}
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

                    <Text className="text-2xl text-white font-psemibold">Notifications</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Stay updated with important alerts
                    </Text>
                </Animatable.View>

                {/* Filter Section */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="space-x-3"
                    >
                        <FilterButton label="All" value="all" />
                        <FilterButton label="Transactions" value="transaction" />
                        <FilterButton label="Security" value="security" />
                        <FilterButton label="Updates" value="update" />
                    </ScrollView>
                </Animatable.View>

                {/* Notifications List */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                >
                    {notifications
                        .filter(n => filter === 'all' || n.type === filter)
                        .map(notification => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                            />
                        ))}
                </Animatable.View>

                {/* Settings Button */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <TouchableOpacity
                        onPress={() => router.push("/settings/notifications")}
                    >
                        <LinearGradient
                            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                            className="p-4 rounded-xl mt-4"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <MaterialCommunityIcons
                                        name="cog"
                                        size={24}
                                        color="#af67db"
                                    />
                                    <Text className="text-white font-psemibold ml-3">
                                        Notification Settings
                                    </Text>
                                </View>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={24}
                                    color="#af67db"
                                />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationCenter; 