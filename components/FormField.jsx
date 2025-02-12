import React, { memo } from "react";
import { View, Text, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";

const FormField = memo(({
  title,
  value,
  placeholder,
  iconName,
  keyboardType = "default",
  required = false,
  secureTextEntry = false,
  onChangeText,
  otherStyles = "",
  autoCapitalize = "none"
}) => {
  const handleChange = (text) => {
    if (typeof onChangeText === 'function') {
      const fieldName = title.toLowerCase().replace(/\s+/g, ''); // Remove spaces from field name
      onChangeText(text, fieldName);
    }
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={300}
      className={`mt-5 space-y-2 ${otherStyles}`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-100 font-pmedium">
          {title}
        </Text>
        {required && (
          <Text className="text-secondary text-sm">Required *</Text>
        )}
      </View>
      <LinearGradient
        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
        className="rounded-xl p-0.5"
      >
        <View className="flex-row items-center bg-[#1a1a1a] rounded-xl p-3">
          <MaterialCommunityIcons name={iconName} size={24} color="#af67db" />
          <TextInput
            value={value || ''}
            placeholder={placeholder}
            placeholderTextColor="#666"
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            onChangeText={handleChange}
            className="flex-1 ml-3 text-white font-pregular"
          />
        </View>
      </LinearGradient>
    </Animatable.View>
  );
});

FormField.displayName = 'FormField';

export default FormField;
