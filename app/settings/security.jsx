import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SecuritySettings = () => {
    const [securitySettings, setSecuritySettings] = useState({
        twoFactor: true,
        biometric: false,
        transactionPin: true,
        loginNotifications: true,
        deviceManagement: true
    });

    const SecurityItem = ({ icon, title, description, value, onToggle }) => (
        <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl mb-4"
        >
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center flex-1 mr-4">
                    <MaterialCommunityIcons
                        name={icon}
                        size={24}
                        color="#af67db"
                    />
                    <View className="ml-3">
                        <Text className="text-white font-psemibold">{title}</Text>
                        <Text className="text-gray-100 text-sm">{description}</Text>
                    </View>
                </View>
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    trackColor={{ false: "#3f3f46", true: "#af67db" }}
                    thumbColor={value ? "#ffffff" : "#71717a"}
                />
            </View>
        </LinearGradient>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                {/* Back Button and Header - Following pattern from verification/kyc.jsx */}
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

                    <Text className="text-2xl text-white font-psemibold">Security Settings</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Manage your account security
                    </Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={300}>
                    <SecurityItem
                        icon="two-factor-authentication"
                        title="Two-Factor Authentication"
                        description="Secure your account with 2FA"
                        value={securitySettings.twoFactor}
                        onToggle={(value) => setSecuritySettings(prev => ({ ...prev, twoFactor: value }))}
                    />
                    <SecurityItem
                        icon="fingerprint"
                        title="Biometric Login"
                        description="Use fingerprint or face ID"
                        value={securitySettings.biometric}
                        onToggle={(value) => setSecuritySettings(prev => ({ ...prev, biometric: value }))}
                    />
                    <SecurityItem
                        icon="lock-check"
                        title="Transaction PIN"
                        description="Require PIN for transactions"
                        value={securitySettings.transactionPin}
                        onToggle={(value) => setSecuritySettings(prev => ({ ...prev, transactionPin: value }))}
                    />
                    <SecurityItem
                        icon="bell-ring"
                        title="Login Notifications"
                        description="Get alerts for new logins"
                        value={securitySettings.loginNotifications}
                        onToggle={(value) => setSecuritySettings(prev => ({ ...prev, loginNotifications: value }))}
                    />
                    <SecurityItem
                        icon="devices"
                        title="Device Management"
                        description="Manage trusted devices"
                        value={securitySettings.deviceManagement}
                        onToggle={(value) => setSecuritySettings(prev => ({ ...prev, deviceManagement: value }))}
                    />
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SecuritySettings; 