import { useState, useRef } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SupportChat = () => {
    const [message, setMessage] = useState('');
    const scrollViewRef = useRef();

    const [chatHistory] = useState([
        {
            id: 1,
            type: 'system',
            message: 'Welcome to Support! How can we help you today?',
            timestamp: '10:00 AM'
        },
        {
            id: 2,
            type: 'user',
            message: 'I need help with property verification',
            timestamp: '10:01 AM'
        },
        {
            id: 3,
            type: 'agent',
            message: 'I understand you need help with property verification. Could you please provide your property ID?',
            timestamp: '10:02 AM'
        }
    ]);

    const ChatMessage = ({ message }) => (
        <View className={`mb-4 ${message.type === 'user' ? 'items-end' : 'items-start'
            }`}>
            {message.type === 'system' && (
                <View className="bg-gray-700/50 px-4 py-2 rounded-xl max-w-[80%]">
                    <Text className="text-gray-100">{message.message}</Text>
                    <Text className="text-gray-400 text-xs mt-1">{message.timestamp}</Text>
                </View>
            )}

            {message.type === 'user' && (
                <View>
                    <LinearGradient
                        colors={['#af67db', '#6b8cce']}
                        className="px-4 py-2 rounded-xl max-w-[80%]"
                    >
                        <Text className="text-white">{message.message}</Text>
                        <Text className="text-white/70 text-xs mt-1">{message.timestamp}</Text>
                    </LinearGradient>
                </View>
            )}

            {message.type === 'agent' && (
                <View className="flex-row items-start">
                    <View className="w-8 h-8 rounded-full bg-secondary/20 items-center justify-center mr-2">
                        <MaterialCommunityIcons
                            name="headset"
                            size={20}
                            color="#af67db"
                        />
                    </View>
                    <View className="bg-black-100/50 px-4 py-2 rounded-xl max-w-[80%]">
                        <Text className="text-white">{message.message}</Text>
                        <Text className="text-gray-400 text-xs mt-1">{message.timestamp}</Text>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                {/* Header */}
                <Animatable.View
                    animation="fadeInDown"
                    className="px-4 py-4 border-b border-gray-800"
                >
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="flex-row items-center"
                        >
                            <MaterialCommunityIcons
                                name="chevron-left"
                                size={24}
                                color="#af67db"
                            />
                            <Text className="text-secondary ml-1 font-pmedium">Back</Text>
                        </TouchableOpacity>
                        <Text className="text-white font-psemibold">Support Chat</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name="dots-vertical"
                                size={24}
                                color="#af67db"
                            />
                        </TouchableOpacity>
                    </View>
                </Animatable.View>

                {/* Chat Messages */}
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 px-4"
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
                >
                    {chatHistory.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                </ScrollView>

                {/* Message Input */}
                <Animatable.View
                    animation="fadeInUp"
                    className="p-4 border-t border-gray-800"
                >
                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-3">
                            <MaterialCommunityIcons
                                name="attachment"
                                size={24}
                                color="#af67db"
                            />
                        </TouchableOpacity>
                        <View className="flex-1 bg-black-100/50 rounded-xl flex-row items-center px-4">
                            <TextInput
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Type your message..."
                                placeholderTextColor="#666"
                                className="flex-1 py-3 text-white"
                                multiline
                            />
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    name="send"
                                    size={24}
                                    color="#af67db"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SupportChat; 