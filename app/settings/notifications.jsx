import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState({
        investment: {
            updates: true,
            alerts: true,
            news: false,
            dividends: true
        },
        security: {
            login: true,
            transactions: true,
            changes: true
        },
        general: {
            marketing: false,
            announcements: true,
            maintenance: true
        }
    });

    const NotificationGroup = ({ title, description, settings, groupKey }) => (
        <Animatable.View animation="fadeInUp" className="mb-6">
            <Text className="text-white font-psemibold mb-2">{title}</Text>
            <Text className="text-gray-100 text-sm mb-4">{description}</Text>

            {Object.entries(settings).map(([key, value]) => (
                <LinearGradient
                    key={key}
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl mb-3"
                >
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center flex-1 mr-4">
                            <MaterialCommunityIcons
                                name={getIconForNotification(key)}
                                size={24}
                                color="#af67db"
                            />
                            <View className="ml-3">
                                <Text className="text-white font-psemibold">
                                    {formatNotificationTitle(key)}
                                </Text>
                                <Text className="text-gray-100 text-sm">
                                    {getNotificationDescription(key)}
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={value}
                            onValueChange={(newValue) =>
                                setNotifications(prev => ({
                                    ...prev,
                                    [groupKey]: {
                                        ...prev[groupKey],
                                        [key]: newValue
                                    }
                                }))
                            }
                            trackColor={{ false: "#3f3f46", true: "#af67db" }}
                            thumbColor={value ? "#ffffff" : "#71717a"}
                        />
                    </View>
                </LinearGradient>
            ))}
        </Animatable.View>
    );

    // Following header pattern from verification/kyc.jsx
    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
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
                        Manage your notification preferences
                    </Text>
                </Animatable.View>

                <NotificationGroup
                    title="Investment Notifications"
                    description="Updates about your investments and opportunities"
                    settings={notifications.investment}
                    groupKey="investment"
                />

                <NotificationGroup
                    title="Security Alerts"
                    description="Important security-related notifications"
                    settings={notifications.security}
                    groupKey="security"
                />

                <NotificationGroup
                    title="General Notifications"
                    description="Platform updates and announcements"
                    settings={notifications.general}
                    groupKey="general"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationSettings;

// Helper functions
const getIconForNotification = (key) => {
    const icons = {
        updates: 'update',
        alerts: 'alert',
        news: 'newspaper',
        dividends: 'cash',
        login: 'login',
        transactions: 'bank-transfer',
        changes: 'account-alert',
        marketing: 'mailbox',
        announcements: 'bullhorn',
        maintenance: 'tools'
    };
    return icons[key] || 'bell';
};

const formatNotificationTitle = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};

const getNotificationDescription = (key) => {
    const descriptions = {
        updates: 'Get updates about your investments',
        alerts: 'Important investment alerts',
        news: 'Latest market news and updates',
        dividends: 'Dividend payment notifications',
        login: 'New login attempts',
        transactions: 'Transaction confirmations',
        changes: 'Account changes alerts',
        marketing: 'Promotional offers and updates',
        announcements: 'Platform announcements',
        maintenance: 'System maintenance updates'
    };
    return descriptions[key] || '';
}; 