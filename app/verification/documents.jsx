import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DocumentVerification = () => {
    const documents = [
        {
            id: '1',
            type: 'Property Deed',
            status: 'Pending',
            uploadDate: '2024-03-15',
            description: 'Original property ownership document'
        },
        {
            id: '2',
            type: 'Tax Records',
            status: 'Verified',
            uploadDate: '2024-03-14',
            description: 'Property tax payment history'
        },
        {
            id: '3',
            type: 'Insurance',
            status: 'Required',
            uploadDate: null,
            description: 'Property insurance documentation'
        }
    ];

    const DocumentCard = ({ document }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name="file-document"
                            size={24}
                            color="#af67db"
                        />
                        <Text className="text-white font-psemibold ml-2">{document.type}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${document.status === 'Verified' ? 'bg-green-500/20' :
                            document.status === 'Pending' ? 'bg-yellow-500/20' :
                                'bg-red-500/20'
                        }`}>
                        <Text className={`font-pbold ${document.status === 'Verified' ? 'text-green-500' :
                                document.status === 'Pending' ? 'text-yellow-500' :
                                    'text-red-500'
                            }`}>
                            {document.status}
                        </Text>
                    </View>
                </View>
                <Text className="text-gray-100 font-pregular">{document.description}</Text>
                {document.uploadDate && (
                    <Text className="text-gray-100 text-sm mt-2">
                        Uploaded: {document.uploadDate}
                    </Text>
                )}
                <TouchableOpacity className="mt-3">
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                        className="py-2 rounded-lg"
                    >
                        <Text className="text-center text-white font-pmedium">
                            {document.status === 'Required' ? 'Upload Document' : 'View Details'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
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

                    <Text className="text-2xl text-white font-psemibold">Document Verification</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Upload and verify your property documents
                    </Text>
                </Animatable.View>

                {/* Progress Section */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                        className="p-4 rounded-xl"
                    >
                        <Text className="text-white font-psemibold">Verification Progress</Text>
                        <View className="h-2 bg-black-100/50 rounded-full mt-2">
                            <View className="h-full bg-secondary rounded-full w-[66%]" />
                        </View>
                        <Text className="text-gray-100 text-sm mt-2">2 of 3 documents verified</Text>
                    </LinearGradient>
                </Animatable.View>

                {/* Documents List */}
                {documents.map((document) => (
                    <DocumentCard key={document.id} document={document} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DocumentVerification; 