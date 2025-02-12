import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Navigation error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View className="flex-1 bg-primary justify-center items-center p-4">
                    <Text className="text-white text-xl font-psemibold mb-4">
                        Something went wrong
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ hasError: false });
                            router.replace('/(tabs)');
                        }}
                        className="bg-secondary px-6 py-3 rounded-xl"
                    >
                        <Text className="text-white font-pmedium">Go Back Home</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 