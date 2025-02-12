import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from "expo-document-picker";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    amenities: [],
    returns: "",
    images: [],
    documents: null,
  });

  const openImagePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
      multiple: true
    });

    if (!result.canceled) {
      setForm({
        ...form,
        images: [...form.images, ...result.assets]
      });
    }
  };

  const openDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf"]
    });

    if (!result.canceled) {
      setForm({
        ...form,
        documents: result.assets[0]
      });
    }
  };

  const SectionHeader = ({ title, delay = 0 }) => (
    <Animatable.View
      animation="fadeInLeft"
      delay={delay}
      className="flex-row items-center space-x-2 mb-4"
    >
      <View className="w-1 h-6 bg-secondary rounded-full" />
      <Text className="text-lg text-white font-psemibold">{title}</Text>
    </Animatable.View>
  );

  const FormInput = ({ title, value, placeholder, iconName, keyboardType = "default", required = false }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={300}
      className="mt-5 space-y-2"
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
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#666"
            keyboardType={keyboardType}
            onChangeText={(text) => setForm({ ...form, [title.toLowerCase()]: text })}
            className="flex-1 ml-3 text-white font-pregular"
          />
        </View>
      </LinearGradient>
    </Animatable.View>
  );

  const submit = () => {
    // Validation logic here
    if (!form.title || !form.price || !form.location) {
      return Alert.alert("Error", "Please fill in all required fields");
    }

    // Submit logic here
    Alert.alert("Success", "Property listed successfully!");
    router.push("/home");
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="px-4 py-6">
        {/* Header */}
        <Animatable.View animation="fadeIn" className="mb-8">
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.15)', 'rgba(25, 77, 181, 0.15)']}
            className="rounded-3xl p-6"
          >
            <View className="flex-row items-center justify-between mb-3">
              <Animatable.Text
                animation="fadeInLeft"
                className="text-2xl text-white font-psemibold"
              >
                List Property
              </Animatable.Text>
              <MaterialCommunityIcons name="home-plus" size={28} color="#af67db" />
            </View>
            <Text className="text-gray-300 font-pregular">
              Fill in the details below to list your property as an NFT
            </Text>
          </LinearGradient>
        </Animatable.View>

        {/* Basic Information */}
        <View className="mb-8">
          <SectionHeader title="Basic Information" />
          <FormInput
            title="Property Title"
            value={form.title}
            placeholder="Enter property title..."
            iconName="home-outline"
            required
          />
          <FormInput
            title="Price (ETH)"
            value={form.price}
            placeholder="Enter price in ETH..."
            iconName="ethereum"
            keyboardType="numeric"
            required
          />
          <FormInput
            title="Expected Returns (APY)"
            value={form.returns}
            placeholder="Expected annual returns..."
            iconName="chart-line"
            keyboardType="numeric"
          />
        </View>

        {/* Property Details */}
        <View className="mb-8">
          <SectionHeader title="Property Details" delay={200} />
          <FormInput
            title="Location"
            value={form.location}
            placeholder="Property location..."
            iconName="map-marker-outline"
            required
          />
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <FormInput
                title="Area (sq ft)"
                value={form.area}
                placeholder="Area..."
                iconName="ruler-square"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <FormInput
                title="Property Type"
                value={form.propertyType}
                placeholder="Type..."
                iconName="home-city-outline"
              />
            </View>
          </View>
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <FormInput
                title="Bedrooms"
                value={form.bedrooms}
                placeholder="Bedrooms..."
                iconName="bed-empty"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <FormInput
                title="Bathrooms"
                value={form.bathrooms}
                placeholder="Bathrooms..."
                iconName="shower"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Media Upload */}
        <View className="mb-8">
          <SectionHeader title="Media & Documents" delay={400} />

          {/* Image Upload */}
          <TouchableOpacity
            onPress={openImagePicker}
            className="mb-4"
          >
            <LinearGradient
              colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
              className="rounded-xl p-0.5"
            >
              <View className="h-24 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
                <MaterialCommunityIcons name="image-plus" size={32} color="#af67db" />
                <Text className="text-gray-100 mt-2">
                  {form.images.length > 0
                    ? `${form.images.length} images selected`
                    : "Upload property images"}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Image Preview */}
          {form.images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {form.images.map((image, index) => (
                <Animatable.View
                  key={index}
                  animation="fadeIn"
                  delay={index * 100}
                  className="relative mr-3"
                >
                  <Image
                    source={{ uri: image.uri }}
                    className="w-24 h-24 rounded-xl"
                  />
                  <TouchableOpacity
                    className="absolute -top-2 -right-2 bg-secondary rounded-full p-1"
                    onPress={() => {
                      const newImages = [...form.images];
                      newImages.splice(index, 1);
                      setForm({ ...form, images: newImages });
                    }}
                  >
                    <MaterialCommunityIcons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </Animatable.View>
              ))}
            </ScrollView>
          )}

          {/* Document Upload */}
          <TouchableOpacity onPress={openDocumentPicker}>
            <LinearGradient
              colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
              className="rounded-xl p-0.5"
            >
              <View className="h-24 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
                <MaterialCommunityIcons name="file-document-outline" size={32} color="#af67db" />
                <Text className="text-gray-100 mt-2">
                  {form.documents
                    ? "Document selected"
                    : "Upload property documents"}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <Animatable.View
          animation="fadeInUp"
          delay={600}
          className="mb-6"
        >
          <TouchableOpacity onPress={submit}>
            <LinearGradient
              colors={['#af67db', '#8547a8']}
              className="rounded-xl p-0.5"
            >
              <View className="bg-[#1a1a1a] rounded-xl py-4 items-center">
                <Text className="text-white font-pbold text-lg">
                  List Property
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
