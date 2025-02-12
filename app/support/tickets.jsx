import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SupportTickets = () => {
    const [tickets] = useState([
        {
            id: '1',
            title: 'Investment Withdrawal Issue',
            status: 'Open',
            priority: 'High',
            category: 'Payment',
            lastUpdate: '2024-03-15',
            messages: 3
        },
        {
            id: '2',
            title: 'Document Upload Failed',
            status: 'In Progress',
            priority: 'Medium',
            category: 'Technical',
            lastUpdate: '2024-03-14',
            messages: 5
        },
        {
            id: '3',
            title: 'Property Verification Query',
            status: 'Resolved',
            priority: 'Low',
            category: 'Verification',
            lastUpdate: '2024-03-13',
            messages: 4
        }
    ]);

    const TicketCard = ({ ticket }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <TouchableOpacity onPress={() => router.push(`/support/ticket/${ticket.id}`)}>
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl"
                >
                    <View className="flex-row justify-between items-center mb-2">
                        <View className="flex-1 mr-3">
                            <Text className="text-white font-psemibold">{ticket.title}</Text>
                            <Text className="text-gray-100 text-sm">{ticket.category}</Text>
                        </View>
                        <View className={`px-3 py-1 rounded-full ${ticket.status === 'Open' ? 'bg-yellow-500/20' :
                                ticket.status === 'In Progress' ? 'bg-blue-500/20' :
                                    'bg-green-500/20'
                            }`}>
                            <Text className={`font-pbold ${ticket.status === 'Open' ? 'text-yellow-500' :
                                    ticket.status === 'In Progress' ? 'text-blue-500' :
                                        'text-green-500'
                                }`}>
                                {ticket.status}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons
                                name="message-outline"
                                size={20}
                                color="#af67db"
                            />
                            <Text className="text-gray-100 ml-1">{ticket.messages} messages</Text>
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

                    <Text className="text-2xl text-white font-psemibold">Support Tickets</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Track your support requests
                    </Text>
                </Animatable.View>

                {/* New Ticket Button */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <TouchableOpacity onPress={() => router.push('/support/ticket/new')}>
                        <LinearGradient
                            colors={['#af67db', '#6b8cce']}
                            className="p-4 rounded-xl"
                        >
                            <Text className="text-white text-center font-psemibold">
                                Create New Ticket
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>

                {/* Tickets List */}
                {tickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SupportTickets; 