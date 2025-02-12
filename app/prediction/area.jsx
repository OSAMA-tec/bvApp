import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AnalysisHeader from "../../components/AnalysisHeader";

const { width } = Dimensions.get("window");

const AreaDevelopment = () => {
    const developmentData = {
        developmentScore: 85,
        metrics: {
            labels: ["Infrastructure", "Economic", "Social"],
            data: [0.8, 0.9, 0.75]
        },
        factors: [
            {
                name: "Infrastructure Development",
                status: "Excellent",
                details: "Major transport hub under construction",
                progress: 80,
                icon: "road-variant"
            },
            {
                name: "Economic Growth",
                status: "Strong",
                details: "New business district planned",
                progress: 90,
                icon: "office-building"
            },
            {
                name: "Social Amenities",
                status: "Good",
                details: "Schools and healthcare facilities nearby",
                progress: 75,
                icon: "hospital-building"
            },
            {
                name: "Green Spaces",
                status: "Moderate",
                details: "Parks and recreation areas in development",
                progress: 65,
                icon: "tree"
            }
        ],
        upcoming: [
            {
                project: "Metro Station",
                completion: "2025",
                impact: "High Positive",
                icon: "train"
            },
            {
                project: "Shopping Complex",
                completion: "2024",
                impact: "Medium Positive",
                icon: "store"
            },
            {
                project: "School District",
                completion: "2024",
                impact: "Medium Positive",
                icon: "school"
            }
        ]
    };

    const DevelopmentFactor = ({ factor }) => (
        <Animatable.View
            animation="fadeInRight"
            delay={developmentData.factors.indexOf(factor) * 200}
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name={factor.icon}
                            size={24}
                            color="#af67db"
                        />
                        <Text className="text-white font-psemibold ml-3">{factor.name}</Text>
                    </View>
                    <Text className="text-secondary font-pbold">{factor.status}</Text>
                </View>
                <Text className="text-gray-100 font-pregular mb-2">{factor.details}</Text>
                <View className="bg-black-100 h-2 rounded-full overflow-hidden">
                    <View
                        className="bg-secondary h-full rounded-full"
                        style={{ width: `${factor.progress}%` }}
                    />
                </View>
            </LinearGradient>
        </Animatable.View>
    );

    const UpcomingProject = ({ project }) => (
        <Animatable.View
            animation="fadeInUp"
            delay={developmentData.upcoming.indexOf(project) * 200}
            className="mb-4"
        >
            <LinearGradient
                colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
                className="p-4 rounded-xl"
            >
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name={project.icon}
                            size={24}
                            color="#af67db"
                        />
                        <View className="ml-3">
                            <Text className="text-white font-psemibold">{project.project}</Text>
                            <Text className="text-gray-100 font-pregular text-sm">
                                Completion: {project.completion}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-green-500 font-pbold">{project.impact}</Text>
                </View>
            </LinearGradient>
        </Animatable.View>
    );

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView className="px-4">
                <AnalysisHeader
                    title="Area Development"
                    subtitle="Infrastructure and development analysis"
                />

                {/* Development Score */}
                <Animatable.View
                    animation="zoomIn"
                    delay={300}
                    className="mb-6"
                >
                    <LinearGradient
                        colors={['rgba(175, 103, 219, 0.2)', 'rgba(25, 77, 181, 0.2)']}
                        className="p-6 rounded-xl"
                    >
                        <Text className="text-white font-psemibold text-lg mb-2">
                            Development Score
                        </Text>
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-secondary font-pbold text-3xl">
                                    {developmentData.developmentScore}/100
                                </Text>
                                <Text className="text-gray-100 font-pregular">
                                    Excellent Development Potential
                                </Text>
                            </View>
                            <MaterialCommunityIcons
                                name="star-circle"
                                size={48}
                                color="#af67db"
                            />
                        </View>
                    </LinearGradient>
                </Animatable.View>

                {/* Development Metrics Chart */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={500}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Development Metrics
                    </Text>
                    <ProgressChart
                        data={developmentData.metrics}
                        width={width - 32}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#1a1a1a",
                            backgroundGradientFrom: "#1a1a1a",
                            backgroundGradientTo: "#1a1a1a",
                            decimalPlaces: 1,
                            color: (opacity = 1) => `rgba(175, 103, 219, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </Animatable.View>

                {/* Development Factors */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={700}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Development Factors
                    </Text>
                    {developmentData.factors.map((factor, index) => (
                        <DevelopmentFactor key={index} factor={factor} />
                    ))}
                </Animatable.View>

                {/* Upcoming Projects */}
                <Animatable.View
                    animation="fadeInUp"
                    delay={900}
                    className="mb-6"
                >
                    <Text className="text-white font-psemibold text-lg mb-4">
                        Upcoming Projects
                    </Text>
                    {developmentData.upcoming.map((project, index) => (
                        <UpcomingProject key={index} project={project} />
                    ))}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AreaDevelopment; 