import React, { memo } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";
import { Picker } from '@react-native-picker/picker';

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
  autoCapitalize = "none",
  type = "text",
  options = [],
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = "center",
}) => {
  const handleChange = (text) => {
    if (typeof onChangeText === 'function') {
      onChangeText(text);
    }
  };

  const renderInput = () => {
    if (type === 'dropdown') {
      return (
        <View className="bg-[#1a1a1a] rounded-xl flex-1 ml-3">
          <Picker
            selectedValue={value}
            onValueChange={handleChange}
            style={{ color: 'white' }}
            dropdownIconColor="#af67db"
          >
            <Picker.Item label={placeholder} value="" />
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      );
    }

    const isTextArea = type === 'textarea';
    const inputStyle = isTextArea ? {
      height: 120,
      textAlignVertical: 'top',
      paddingTop: 8,
      paddingBottom: 8
    } : {};

    return (
      <TextInput
        value={value || ''}
        placeholder={placeholder}
        placeholderTextColor="#666"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onChangeText={handleChange}
        multiline={isTextArea}
        numberOfLines={isTextArea ? 6 : 1}
        style={[
          {
            flex: 1,
            marginLeft: 12,
            color: 'white',
            fontFamily: 'DMRegular'
          },
          inputStyle
        ]}
      />
    );
  };

  const isTextArea = type === 'textarea';

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={100}
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
        <View className={`flex-row items-${isTextArea ? 'start' : 'center'} bg-[#1a1a1a] rounded-xl p-3`}>
          <MaterialCommunityIcons
            name={iconName}
            size={24}
            color="#af67db"
            style={isTextArea ? { marginTop: 8 } : {}}
          />
          {renderInput()}
        </View>
      </LinearGradient>
    </Animatable.View>
  );
});

FormField.displayName = 'FormField';

export default FormField;
