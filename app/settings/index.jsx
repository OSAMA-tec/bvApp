import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [isPasskeyEnabled, setIsPasskeyEnabled] = useState(false);
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const settingSections = [
        {
            title: "Security",
            items: [
                {
                    icon: "shield-lock",
                    title: "Two-Factor Authentication",
                    description: "Add an extra layer of security",
                    type: "toggle",
                    value: is2FAEnabled,
                    onToggle: setIs2FAEnabled,
                    route: "/settings/2fa"
                },
                {
                    icon: "key-chain",
                    title: "Passkey Settings",
                    description: "Manage your passkeys",
                    type: "toggle",
                    value: isPasskeyEnabled,
                    onToggle: setIsPasskeyEnabled,
                    route: "/settings/passkey"
                },
                {
                    icon: "fingerprint",
                    title: "Biometric Authentication",
                    description: "Use fingerprint or Face ID",
                    type: "toggle",
                    value: isBiometricEnabled,
                    onToggle: setIsBiometricEnabled
                },
                {
                    icon: "lock-reset",
                    title: "Change Password",
                    description: "Update your password",
                    type: "link",
                    route: "/settings/password"
                }
            ]
        },
        {
            title: "Profile",
            items: [
                {
                    icon: "account-edit",
                    title: "Edit Profile",
                    description: "Update your information",
                    type: "link",
                    route: "/settings/profile"
                },
                {
                    icon: "email",
                    title: "Email Settings",
                    description: "Manage email preferences",
                    type: "link",
                    route: "/settings/email"
                },
                {
                    icon: "phone",
                    title: "Phone Number",
                    description: "Update contact number",
                    type: "link",
                    route: "/settings/phone"
                }
            ]
        },
        {
            title: "Preferences",
            items: [
                {
                    icon: "bell",
                    title: "Notifications",
                    description: "Manage notifications",
                    type: "toggle",
                    value: isNotificationsEnabled,
                    onToggle: setIsNotificationsEnabled,
                    route: "/settings/notifications"
                },
                {
                    icon: "translate",
                    title: "Language",
                    description: "Change app language",
                    type: "link",
                    route: "/settings/language"
                },
                {
                    icon: "theme-light-dark",
                    title: "Appearance",
                    description: "Dark mode and themes",
                    type: "link",
                    route: "/settings/appearance"
                }
            ]
        }
    ];

    const SettingCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => item.route && router.push(item.route)}
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                        <MaterialCommunityIcons
                            name={item.icon}
                            size={24}
                            color="#af67db"
                        />
                        <View className="ml-3 flex-1">
                            <Text className="text-white font-psemibold">{item.title}</Text>
                            <Text className="text-gray-100 text-sm">{item.description}</Text>
                        </View>
                    </View>
                    {item.type === 'toggle' ? (
                        <Switch
                            value={item.value}
                            onValueChange={item.onToggle}
                            trackColor={{ false: '#3f3f3f', true: '#af67db' }}
                            thumbColor={item.value ? '#fff' : '#f4f3f4'}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={24}
                            color="#af67db"
                        />
                    )}
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

                    <Text className="text-2xl text-white font-psemibold">Settings</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Manage your preferences and security
                    </Text>
                </Animatable.View>

                {/* Settings Sections */}
                {settingSections.map((section, index) => (
                    <Animatable.View
                        key={section.title}
                        animation="fadeInUp"
                        delay={300 + (index * 100)}
                        className="mb-6"
                    >
                        <Text className="text-white font-psemibold mb-4">{section.title}</Text>
                        {section.items.map((item, itemIndex) => (
                            <SettingCard key={itemIndex} item={item} />
                        ))}
                    </Animatable.View>
                ))}

                {/* Version Info */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={600}
                    className="mb-6 items-center"
                >
                    <Text className="text-gray-100">Version 1.0.0</Text>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings; 