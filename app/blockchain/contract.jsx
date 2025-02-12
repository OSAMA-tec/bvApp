import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SmartContract = () => {
    const [contractAddress, setContractAddress] = useState('');
    const [functionName, setFunctionName] = useState('');
    const [parameters, setParameters] = useState('');

    const contractFunctions = [
        {
            name: 'mintPropertyNFT',
            description: 'Mint a new property NFT',
            params: ['propertyId', 'price']
        },
        {
            name: 'transferOwnership',
            description: 'Transfer property ownership',
            params: ['tokenId', 'newOwner']
        },
        {
            name: 'getPropertyDetails',
            description: 'View property details',
            params: ['tokenId']
        }
    ];

    const FunctionCard = ({ func }) => (
        <Animatable.View
            animation="fadeInUp"
            className="mb-4"
        >
            <TouchableOpacity
                onPress={() => setFunctionName(func.name)}
            >
                <LinearGradient
                    colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                    className="p-4 rounded-xl"
                >
                    <Text className="text-white font-psemibold">{func.name}</Text>
                    <Text className="text-gray-100 font-pregular mt-1">{func.description}</Text>
                    <Text className="text-secondary font-pmedium mt-2">
                        Parameters: {func.params.join(', ')}
                    </Text>
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

                    <Text className="text-2xl text-white font-psemibold">Smart Contract</Text>
                    <Text className="text-gray-100 mt-2 font-pregular">
                        Interact with your smart contract
                    </Text>
                </Animatable.View>

                {/* Contract Address Input */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={300}
                    className="mb-6"
                >
                    <View className="mb-4">
                        <Text className="text-white font-pmedium mb-2">Contract Address</Text>
                        <TextInput
                            value={contractAddress}
                            onChangeText={setContractAddress}
                            placeholder="Enter contract address"
                            placeholderTextColor="#666"
                            className="bg-black-100/50 p-4 rounded-xl text-white font-pregular"
                        />
                    </View>
                </Animatable.View>

                {/* Function Selection */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={400}
                    className="mb-6"
                >
                    <View className="mb-4">
                        <Text className="text-white font-pmedium mb-2">Function Name</Text>
                        <TextInput
                            value={functionName}
                            onChangeText={setFunctionName}
                            placeholder="Enter function name"
                            placeholderTextColor="#666"
                            className="bg-black-100/50 p-4 rounded-xl text-white font-pregular"
                        />
                    </View>
                </Animatable.View>

                {/* Parameters Input */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <View className="mb-4">
                        <Text className="text-white font-pmedium mb-2">Parameters</Text>
                        <TextInput
                            value={parameters}
                            onChangeText={setParameters}
                            placeholder="Enter parameters"
                            placeholderTextColor="#666"
                            className="bg-black-100/50 p-4 rounded-xl text-white font-pregular"
                        />
                    </View>
                </Animatable.View>

                {/* Function Cards */}
                {contractFunctions.map((func) => (
                    <FunctionCard key={func.name} func={func} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SmartContract; 