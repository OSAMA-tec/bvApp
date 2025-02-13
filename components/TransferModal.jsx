import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ============ Constants ============
const STEPS = {
    INPUT: 'input',
    CONFIRMATION: 'confirmation',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    ERROR: 'error'
};

const TransferModal = ({ visible, onClose, onComplete, property, authToken }) => {
    const [currentStep, setCurrentStep] = useState(STEPS.INPUT);
    const [recipientId, setRecipientId] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    const resetState = () => {
        setCurrentStep(STEPS.INPUT);
        setRecipientId('');
        setPrice('');
        setError(null);
        setProgress(0);
    };

    const handleConfirm = () => {
        if (!recipientId.trim()) {
            Alert.alert('Error', 'Please enter a recipient ID');
            return;
        }
        if (!price || isNaN(price) || Number(price) <= 0) {
            Alert.alert('Error', 'Please enter a valid price');
            return;
        }
        setCurrentStep(STEPS.CONFIRMATION);
    };

    const handleTransfer = async () => {
        if (!authToken) {
            setError('Authentication required. Please log in again.');
            setCurrentStep(STEPS.ERROR);
            return;
        }

        setCurrentStep(STEPS.PROCESSING);
        let interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 200);

        try {
            // Generate dummy transaction data
            const dummyTransactionHash = `0x${Array.from({ length: 64 }, () =>
                Math.floor(Math.random() * 16).toString(16)).join('')}`;

            const transferData = {
                toUserId: recipientId.trim(),
                price: Number(price),
                transactionHash: dummyTransactionHash
            };

            await onComplete(transferData);
            setCurrentStep(STEPS.SUCCESS);
        } catch (error) {
            setError(error.message || 'Failed to transfer property');
            setCurrentStep(STEPS.ERROR);
        } finally {
            clearInterval(interval);
        }
    };

    const renderContent = () => {
        switch (currentStep) {
            case STEPS.INPUT:
                return (
                    <Animatable.View animation="fadeIn" className="p-6">
                        <Text className="text-white font-psemibold text-xl mb-4">Transfer Property</Text>
                        <View className="space-y-4">
                            <View>
                                <Text className="text-gray-300 mb-2">Recipient ID</Text>
                                <TextInput
                                    value={recipientId}
                                    onChangeText={setRecipientId}
                                    placeholder="Enter recipient ID"
                                    placeholderTextColor="#666"
                                    className="bg-[#1a1a1a] text-white p-3 rounded-xl"
                                />
                            </View>
                            <View>
                                <Text className="text-gray-300 mb-2">Price (ETH)</Text>
                                <TextInput
                                    value={price}
                                    onChangeText={setPrice}
                                    placeholder="Enter transfer price"
                                    placeholderTextColor="#666"
                                    keyboardType="numeric"
                                    className="bg-[#1a1a1a] text-white p-3 rounded-xl"
                                />
                            </View>
                            <TouchableOpacity onPress={handleConfirm}>
                                <LinearGradient
                                    colors={['#af67db', '#194db5']}
                                    className="py-4 rounded-xl"
                                >
                                    <Text className="text-white font-pbold text-center">Continue</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                );

            case STEPS.CONFIRMATION:
                return (
                    <Animatable.View animation="fadeIn" className="p-6">
                        <Text className="text-white font-psemibold text-xl mb-4">Confirm Transfer</Text>
                        <View className="bg-black-100/50 p-4 rounded-xl mb-6">
                            <Text className="text-gray-300 mb-2">Property</Text>
                            <Text className="text-white font-pmedium">{property.title}</Text>
                            <Text className="text-secondary">{property.price} ETH</Text>
                        </View>
                        <View className="bg-black-100/50 p-4 rounded-xl mb-6">
                            <Text className="text-gray-300 mb-2">Transfer Details</Text>
                            <Text className="text-white">Recipient ID: {recipientId}</Text>
                            <Text className="text-white">Price: {price} ETH</Text>
                        </View>
                        <Text className="text-gray-300 mb-4">
                            Are you sure you want to transfer this property?
                        </Text>
                        <View className="flex-row space-x-4">
                            <TouchableOpacity
                                className="flex-1"
                                onPress={() => setCurrentStep(STEPS.INPUT)}
                            >
                                <View className="bg-[#1a1a1a] py-4 rounded-xl">
                                    <Text className="text-white font-pbold text-center">Back</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1"
                                onPress={handleTransfer}
                            >
                                <LinearGradient
                                    colors={['#af67db', '#194db5']}
                                    className="py-4 rounded-xl"
                                >
                                    <Text className="text-white font-pbold text-center">Confirm</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                );

            case STEPS.PROCESSING:
                return (
                    <Animatable.View animation="fadeIn" className="p-6 items-center">
                        <ActivityIndicator size="large" color="#af67db" />
                        <Text className="text-white font-psemibold text-xl mt-4 mb-2">Processing</Text>
                        <Text className="text-gray-300 text-center mb-4">
                            Transferring property... Please wait.
                        </Text>
                        <View className="w-full bg-black-100/50 rounded-full h-2">
                            <View
                                className="bg-secondary rounded-full h-2"
                                style={{ width: `${progress}%` }}
                            />
                        </View>
                        <Text className="text-secondary mt-2">{progress}%</Text>
                    </Animatable.View>
                );

            case STEPS.SUCCESS:
                return (
                    <Animatable.View animation="fadeIn" className="p-6 items-center">
                        <MaterialCommunityIcons name="check-circle" size={64} color="#4CAF50" />
                        <Text className="text-white font-psemibold text-xl mt-4">Success!</Text>
                        <Text className="text-gray-300 text-center mt-2">
                            Property has been successfully transferred.
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                resetState();
                                onClose();
                            }}
                            className="mt-6"
                        >
                            <Text className="text-secondary font-pmedium">Close</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                );

            case STEPS.ERROR:
                return (
                    <Animatable.View animation="fadeIn" className="p-6 items-center">
                        <MaterialCommunityIcons name="alert-circle" size={64} color="#f44336" />
                        <Text className="text-white font-psemibold text-xl mt-4">Error</Text>
                        <Text className="text-gray-300 text-center mt-2">
                            {error || 'An error occurred during transfer.'}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                resetState();
                                onClose();
                            }}
                            className="mt-6"
                        >
                            <Text className="text-secondary font-pmedium">Close</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                );
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => {
                if (currentStep !== STEPS.PROCESSING) {
                    resetState();
                    onClose();
                }
            }}
        >
            <View className="flex-1 bg-black/80 justify-center items-center">
                <View className="w-11/12 bg-primary rounded-2xl overflow-hidden">
                    {currentStep !== STEPS.PROCESSING && (
                        <TouchableOpacity
                            onPress={() => {
                                resetState();
                                onClose();
                            }}
                            className="absolute right-4 top-4 z-10"
                        >
                            <MaterialCommunityIcons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                    {renderContent()}
                </View>
            </View>
        </Modal>
    );
};

export default TransferModal; 