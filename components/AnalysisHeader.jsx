import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnalysisHeader = ({ title, subtitle }) => (
    <Animatable.View
        animation="fadeInDown"
        className="mt-4 mb-6"
    >
        <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center mb-6 w-[100px]"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                className="p-2 rounded-xl flex-row items-center justify-center w-full"
            >
                <MaterialCommunityIcons
                    name="chevron-left"
                    size={24}
                    color="#af67db"
                />
                <Text className="text-secondary ml-1 font-pmedium">Back</Text>
            </LinearGradient>
        </TouchableOpacity>

        <Text className="text-2xl text-white font-psemibold">{title}</Text>
        <Text className="text-gray-100 mt-2 font-pregular">{subtitle}</Text>
    </Animatable.View>
);

export default AnalysisHeader; 