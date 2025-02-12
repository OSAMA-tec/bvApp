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

const TokenizationModal = ({ visible, onClose, onComplete }) => {
    const [step, setStep] = useState(1);
    const [processStep, setProcessStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [contractAddress, setContractAddress] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [password, setPassword] = useState('');
    const [attempts, setAttempts] = useState(3);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (step === 2) {
            setTimeLeft(10);
            setProcessStep(0);
            setStatusMessage('Initializing tokenization process...');

            const steps = [
                {
                    delay: 0,
                    step: 1,
                    message: "Creating secure connection to blockchain..."
                },
                {
                    delay: 10000,
                    step: 2,
                    message: "Generating smart contract for your property..."
                },
                {
                    delay: 20000,
                    step: 3,
                    message: "Establishing connection to Ethereum network..."
                },
                {
                    delay: 30000,
                    step: 4,
                    message: "Converting your property into a unique NFT..."
                },
                {
                    delay: 40000,
                    step: 5,
                    message: "Finalizing blockchain transaction..."
                },
            ];

            steps.forEach(({ delay, step, message }) => {
                setTimeout(() => {
                    setProcessStep(step);
                    setTimeLeft(10);
                    setStatusMessage(message);
                }, delay);
            });

            const timerInterval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        return 10;
                    }
                    return prev - 1;
                });
            }, 1000);

            setTimeout(() => {
                clearInterval(timerInterval);
                const randomContract = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                const randomHash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                setContractAddress(randomContract);
                setTransactionHash(randomHash);
                setStep(3);
            }, 50000);

            return () => clearInterval(timerInterval);
        }
    }, [step]);

    const handlePasswordSubmit = () => {
        if (password === 'hashmi@123') {
            setStep(2);
            setShowPasswordInput(false);
        } else {
            const remainingAttempts = attempts - 1;
            setAttempts(remainingAttempts);
            setPassword('');

            if (remainingAttempts === 0) {
                Alert.alert(
                    "Maximum Attempts Reached",
                    "You can now proceed with tokenization.",
                    [{
                        text: "Continue", onPress: () => {
                            setStep(2);
                            setShowPasswordInput(false);
                        }
                    }]
                );
            } else {
                Alert.alert(
                    "Incorrect Password",
                    `${remainingAttempts} attempts remaining.`
                );
            }
        }
    };

    const copyToClipboard = async (text) => {
        await Clipboard.setString(text);
        Alert.alert("Copied!", "Address copied to clipboard");
    };

    const renderStep1 = () => (
        <Animatable.View animation="fadeIn" className="items-center">
            {/* MetaMask-like Header */}
            <View className="w-full bg-[#24272A] rounded-t-3xl p-4 -mt-6 -mx-6 mb-6">
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' }}
                    className="w-20 h-20 self-center"
                    resizeMode="contain"
                />
                <Text className="text-white text-xl font-pbold text-center mt-2">
                    MetaMask
                </Text>
            </View>

            <Text className="text-2xl text-white font-psemibold text-center">
                Connect with MetaMask
            </Text>

            <View className="bg-[#24272A] rounded-xl p-4 mt-4 w-full">
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="account-circle" size={40} color="#E2E3E8" />
                    <View className="ml-3">
                        <Text className="text-white font-psemibold">Osama Hashmi</Text>
                        <Text className="text-gray-400 text-sm">0x71C...4E12</Text>
                    </View>
                </View>
            </View>

            <Text className="text-gray-300 text-center mt-6 px-6 font-pregular">
                By connecting, you authorize this dApp to view your public address and initiate transactions.
            </Text>

            <View className="w-full space-y-3 mt-8">
                <TouchableOpacity
                    onPress={() => setShowPasswordInput(true)}
                >
                    <LinearGradient
                        colors={['#037DD6', '#0364AB']}
                        className="rounded-xl p-0.5"
                    >
                        <View className="py-4 px-6 items-center">
                            <Text className="text-white font-pbold text-lg">
                                Connect
                            </Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
                    <View className="bg-[#24272A] rounded-xl py-4 px-6 items-center">
                        <Text className="text-[#037DD6] font-pbold text-lg">
                            Cancel
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    );

    const renderPasswordInput = () => (
        <Animatable.View animation="fadeIn" className="items-center">
            <View className="w-full bg-[#24272A] rounded-t-3xl p-4 -mt-6 -mx-6 mb-6">
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' }}
                    className="w-20 h-20 self-center"
                    resizeMode="contain"
                />
                <Text className="text-white text-xl font-pbold text-center mt-2">
                    Unlock Wallet
                </Text>
            </View>

            <Text className="text-gray-300 text-center mt-3 px-6 font-pregular">
                Enter your password to continue
            </Text>

            {attempts < 3 && (
                <Text className="text-red-500 text-center mt-2 px-6 font-pmedium">
                    {attempts} attempts remaining
                </Text>
            )}

            <View className="w-full mt-6">
                <View className="bg-[#24272A] rounded-xl p-4">
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor="#666"
                        secureTextEntry
                        className="text-white font-pregular text-lg px-3 py-2"
                    />
                </View>
            </View>

            <View className="w-full space-y-3 mt-6">
                <TouchableOpacity onPress={handlePasswordSubmit}>
                    <LinearGradient
                        colors={['#037DD6', '#0364AB']}
                        className="rounded-xl p-0.5"
                    >
                        <View className="py-4 px-6 items-center">
                            <Text className="text-white font-pbold text-lg">
                                Unlock
                            </Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setShowPasswordInput(false);
                        setPassword('');
                    }}
                >
                    <View className="bg-[#24272A] rounded-xl py-4 px-6 items-center">
                        <Text className="text-[#037DD6] font-pbold text-lg">
                            Cancel
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    );

    const renderStep2 = () => (
        <Animatable.View animation="fadeIn" className="items-center">
            <View className="w-full bg-[#24272A] rounded-t-3xl p-4 -mt-6 -mx-6 mb-6">
                <MaterialCommunityIcons name="ethereum" size={60} color="#62688F" className="self-center" />
                <Text className="text-white text-xl font-pbold text-center mt-2">
                    Tokenization in Progress
                </Text>
            </View>

            <View className="w-full space-y-6 bg-[#24272A] rounded-xl p-5">
                <ProcessStep
                    step={1}
                    currentStep={processStep}
                    text="Initialize Tokenization"
                    icon="rocket-launch-outline"
                    timeLeft={processStep === 1 ? timeLeft : 0}
                />
                <ProcessStep
                    step={2}
                    currentStep={processStep}
                    text="Deploy Smart Contract"
                    icon="file-code-outline"
                    timeLeft={processStep === 2 ? timeLeft : 0}
                />
                <ProcessStep
                    step={3}
                    currentStep={processStep}
                    text="Connect to Blockchain"
                    icon="link-variant"
                    timeLeft={processStep === 3 ? timeLeft : 0}
                />
                <ProcessStep
                    step={4}
                    currentStep={processStep}
                    text="Convert to NFT"
                    icon="certificate-outline"
                    timeLeft={processStep === 4 ? timeLeft : 0}
                />
                <ProcessStep
                    step={5}
                    currentStep={processStep}
                    text="Finalize Transaction"
                    icon="check-circle-outline"
                    timeLeft={processStep === 5 ? timeLeft : 0}
                />
            </View>

            <Animatable.View
                animation="fadeIn"
                className="w-full mt-6 bg-[#24272A] rounded-xl p-4"
            >
                <View className="items-center">
                    <ActivityIndicator size="large" color="#037DD6" />
                    <Animatable.Text
                        animation="fadeIn"
                        className="text-[#037DD6] font-pmedium text-center mt-3"
                    >
                        {statusMessage}
                    </Animatable.Text>
                </View>
            </Animatable.View>
        </Animatable.View>
    );

    const renderStep3 = () => (
        <Animatable.View animation="fadeInUp" className="items-center">
            <View className="w-full bg-[#24272A] rounded-t-3xl p-4 -mt-6 -mx-6 mb-6">
                <MaterialCommunityIcons name="check-circle" size={60} color="#4CAF50" className="self-center" />
                <Text className="text-white text-xl font-pbold text-center mt-2">
                    Transaction Complete
                </Text>
            </View>

            <Text className="text-2xl text-white font-psemibold text-center mb-6">
                Asset Successfully Tokenized!
            </Text>

            <View className="w-full space-y-4">
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="bg-[#24272A] rounded-xl p-4"
                >
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-[#037DD6] font-pmedium">Contract Address:</Text>
                        <TouchableOpacity
                            onPress={() => copyToClipboard(contractAddress)}
                            className="flex-row items-center bg-[#037DD6]/20 px-3 py-1 rounded-full"
                        >
                            <MaterialCommunityIcons name="content-copy" size={16} color="#037DD6" />
                            <Text className="text-[#037DD6] ml-1 font-pmedium">Copy</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-[#1a1a1a] rounded-lg p-3 mt-2">
                        <Text className="text-gray-300 font-pmedium tracking-wide" selectable>
                            {contractAddress}
                        </Text>
                    </View>
                </Animatable.View>

                <Animatable.View
                    animation="fadeInUp"
                    delay={600}
                    className="bg-[#24272A] rounded-xl p-4"
                >
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-[#037DD6] font-pmedium">Transaction Hash:</Text>
                        <TouchableOpacity
                            onPress={() => copyToClipboard(transactionHash)}
                            className="flex-row items-center bg-[#037DD6]/20 px-3 py-1 rounded-full"
                        >
                            <MaterialCommunityIcons name="content-copy" size={16} color="#037DD6" />
                            <Text className="text-[#037DD6] ml-1 font-pmedium">Copy</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-[#1a1a1a] rounded-lg p-3 mt-2">
                        <Text className="text-gray-300 font-pmedium tracking-wide" selectable>
                            {transactionHash}
                        </Text>
                    </View>
                </Animatable.View>

                <Animatable.View
                    animation="fadeInUp"
                    delay={900}
                    className="bg-[#24272A] rounded-xl p-4"
                >
                    <Text className="text-[#037DD6] font-pmedium mb-2">View on Etherscan:</Text>
                    <TouchableOpacity className="bg-[#1a1a1a] rounded-lg p-3">
                        <Text className="text-blue-400 font-pmedium underline" selectable>
                            https://etherscan.io/tx/{transactionHash}
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>

            <View className="w-full space-y-3 mt-8">
                <TouchableOpacity onPress={onComplete}>
                    <LinearGradient
                        colors={['#037DD6', '#0364AB']}
                        className="rounded-xl p-0.5"
                    >
                        <View className="py-4 px-6 items-center">
                            <Text className="text-white font-pbold text-lg">
                                View Asset Details
                            </Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
                    <View className="bg-[#24272A] rounded-xl py-4 px-6 items-center">
                        <Text className="text-[#037DD6] font-pbold text-lg">
                            Close
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View className="flex-1 bg-black/90 justify-center items-center">
                <View className="w-[90%] bg-[#141618] rounded-3xl p-6">
                    {step === 1 && !showPasswordInput && renderStep1()}
                    {step === 1 && showPasswordInput && renderPasswordInput()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </View>
            </View>
        </Modal>
    );
};

export default TokenizationModal; 