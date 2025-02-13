import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, Dimensions, TextInput, Alert, Clipboard } from 'react-native';
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

const ProcessStep = ({ step, currentStep, text, icon, delay = 0, timeLeft = 0 }) => (
    <Animatable.View
        animation={currentStep >= step ? "fadeInRight" : "fadeIn"}
        delay={delay}
        className={`flex-row items-center justify-between ${currentStep === step ? 'opacity-100' : 'opacity-50'}`}
    >
        <View className="flex-row items-center space-x-3">
            <View className={`w-8 h-8 rounded-full items-center justify-center ${currentStep >= step ? 'bg-[#037DD6]' : 'bg-gray-700'}`}>
                <MaterialCommunityIcons
                    name={currentStep > step ? "check" : icon}
                    size={20}
                    color="#fff"
                />
            </View>
            <View>
                <Text className="text-white font-pmedium">{text}</Text>
                {currentStep === step && (
                    <Text className="text-[#037DD6] text-sm font-pregular">In progress...</Text>
                )}
            </View>
        </View>
        {currentStep === step && timeLeft > 0 && (
            <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                className="bg-[#037DD6]/20 px-3 py-1 rounded-full"
            >
                <Text className="text-[#037DD6] font-pmedium">
                    {timeLeft}s
                </Text>
            </Animatable.View>
        )}
    </Animatable.View>
);

// ============ Constants ============
const STEPS = {
    CONFIRMATION: 'confirmation',
    METAMASK: 'metamask',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    ERROR: 'error'
};

const TokenizationModal = ({ visible, onClose, onComplete, property, authToken }) => {
    const [currentStep, setCurrentStep] = useState(STEPS.CONFIRMATION);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (visible) {
            setCurrentStep(STEPS.CONFIRMATION);
            setError(null);
            setProgress(0);
        }
    }, [visible]);

    useEffect(() => {
        let interval;
        if (currentStep === STEPS.PROCESSING) {
            if (!authToken) {
                setError('Authentication token not found. Please log in again.');
                setCurrentStep(STEPS.ERROR);
                return;
            }

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        // Generate dummy tokenization data
                        const tokenData = {
                            tokenId: `BV${Date.now()}${Math.random().toString(36).substring(2, 6)}`,
                            contractAddress: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                            tokenURI: `ipfs://bafybeih${Math.random().toString(36).substring(2, 30)}`,
                            transactionHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
                        };

                        try {
                            onComplete(tokenData);
                        } catch (error) {
                            setError(error.message || 'Failed to tokenize property');
                            setCurrentStep(STEPS.ERROR);
                        }
                        return 100;
                    }
                    return prev + 2;
                });
            }, 200);
        }
        return () => clearInterval(interval);
    }, [currentStep, authToken]);

    const handleConfirm = () => {
        if (!authToken) {
            setError('Authentication required. Please log in again.');
            setCurrentStep(STEPS.ERROR);
            return;
        }
        setCurrentStep(STEPS.METAMASK);
    };

    const handleMetaMaskConfirm = () => {
        setCurrentStep(STEPS.PROCESSING);
    };

    const renderContent = () => {
        switch (currentStep) {
            case STEPS.CONFIRMATION:
                return (
                    <Animatable.View animation="fadeIn" className="p-6">
                        <Text className="text-white font-psemibold text-xl mb-4">Confirm Tokenization</Text>
                        <View className="bg-black-100/50 p-4 rounded-xl mb-6">
                            <Text className="text-gray-300 mb-2">Property Owner</Text>
                            <Text className="text-white font-pmedium">{property.owner.name}</Text>
                            <Text className="text-secondary">{property.owner.email}</Text>
                        </View>
                        <View className="bg-black-100/50 p-4 rounded-xl mb-6">
                            <Text className="text-gray-300 mb-2">Property Details</Text>
                            <Text className="text-white font-pmedium">{property.title}</Text>
                            <Text className="text-secondary">{property.price} ETH</Text>
                            <Text className="text-gray-300 mt-2">{property.address}</Text>
                        </View>
                        <Text className="text-gray-300 mb-4">
                            You are about to tokenize your property. This action cannot be undone.
                        </Text>
                        <TouchableOpacity onPress={handleConfirm}>
                            <LinearGradient
                                colors={['#af67db', '#194db5']}
                                className="py-4 rounded-xl"
                            >
                                <Text className="text-white font-pbold text-center">Continue</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animatable.View>
                );

            case STEPS.METAMASK:
                return (
                    <Animatable.View animation="fadeIn" className="p-6">
                        <Text className="text-white font-psemibold text-xl mb-4">MetaMask Authentication</Text>
                        <View className="items-center mb-6">
                            <MaterialCommunityIcons name="wallet" size={64} color="#af67db" />
                        </View>
                        <Text className="text-gray-300 mb-4">
                            Please confirm the transaction in your MetaMask wallet to proceed with tokenization.
                        </Text>
                        <TouchableOpacity onPress={handleMetaMaskConfirm}>
                            <LinearGradient
                                colors={['#af67db', '#194db5']}
                                className="py-4 rounded-xl"
                            >
                                <Text className="text-white font-pbold text-center">Confirm in MetaMask</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animatable.View>
                );

            case STEPS.PROCESSING:
                return (
                    <Animatable.View animation="fadeIn" className="p-6 items-center">
                        <ActivityIndicator size="large" color="#af67db" />
                        <Text className="text-white font-psemibold text-xl mt-4 mb-2">Processing</Text>
                        <Text className="text-gray-300 text-center mb-4">
                            Tokenizing your property... Please wait.
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
                            Your property has been successfully tokenized.
                        </Text>
                    </Animatable.View>
                );

            case STEPS.ERROR:
                return (
                    <Animatable.View animation="fadeIn" className="p-6 items-center">
                        <MaterialCommunityIcons name="alert-circle" size={64} color="#f44336" />
                        <Text className="text-white font-psemibold text-xl mt-4">Error</Text>
                        <Text className="text-gray-300 text-center mt-2">
                            {error || 'An error occurred during tokenization.'}
                        </Text>
                        <TouchableOpacity onPress={onClose} className="mt-4">
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
                    onClose();
                }
            }}
        >
            <View className="flex-1 bg-black/80 justify-center items-center">
                <View className="w-11/12 bg-primary rounded-2xl overflow-hidden">
                    {/* Close button */}
                    {currentStep !== STEPS.PROCESSING && (
                        <TouchableOpacity
                            onPress={onClose}
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

export default TokenizationModal; 