import { useState, useCallback, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from "expo-document-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FormField, TokenizationModal } from "../../components";

const { width } = Dimensions.get('window');

const Create = () => {
  const initialFormState = {
    propertytitle: "",
    price: "",
    location: "",
    propertytype: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    amenities: [],
    returns: "",
    images: [],
    documents: null,
  };

  const [form, setForm] = useState(initialFormState);
  const [showTokenizationModal, setShowTokenizationModal] = useState(false);

  // Clear form on component mount
  useEffect(() => {
    setForm(initialFormState);
  }, []);

  const handleFormChange = useCallback((value, fieldName) => {
    if (fieldName) {
      setForm(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
  }, []);

  const resetForm = () => {
    setForm(initialFormState);
  };

  const openImagePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
      multiple: true
    });

    if (!result.canceled) {
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...result.assets]
      }));
    }
  };

  const openDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf"]
    });

    if (!result.canceled) {
      setForm(prev => ({
        ...prev,
        documents: result.assets[0]
      }));
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

  const handleSubmit = () => {
    if (!form.propertytitle || !form.price || !form.location) {
      return Alert.alert("Error", "Please fill in all required fields");
    }
    setShowTokenizationModal(true);
  };

  const handleTokenizationComplete = () => {
    setShowTokenizationModal(false);
    router.push("/home");
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="px-4 py-6">
        {/* Header with Reset Button */}
        <Animatable.View animation="fadeIn" className="mb-8">
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.15)', 'rgba(25, 77, 181, 0.15)']}
            className="rounded-3xl p-6"
          >
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Animatable.Text
                  animation="fadeInLeft"
                  className="text-2xl text-white font-psemibold"
                >
                  List Property
                </Animatable.Text>
                <Text className="text-gray-300 font-pregular mt-1">
                  Fill in the details below to list your property as an NFT
                </Text>
              </View>
              <View className="flex-row items-center space-x-4">
                <TouchableOpacity
                  onPress={resetForm}
                  className="bg-[#1a1a1a] rounded-full p-2"
                >
                  <MaterialCommunityIcons name="refresh" size={24} color="#af67db" />
                </TouchableOpacity>
                <MaterialCommunityIcons name="home-plus" size={28} color="#af67db" />
              </View>
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Basic Information */}
        <View className="mb-8">
          <SectionHeader title="Basic Information" />
          <FormField
            title="Property Title"
            value={form.propertytitle}
            placeholder="Enter property title..."
            iconName="home-outline"
            required
            onChangeText={handleFormChange}
          />
          <FormField
            title="Price"
            value={form.price}
            placeholder="Enter price in ETH..."
            iconName="ethereum"
            keyboardType="numeric"
            required
            onChangeText={handleFormChange}
          />
          <FormField
            title="Returns"
            value={form.returns}
            placeholder="Expected annual returns..."
            iconName="chart-line"
            keyboardType="numeric"
            onChangeText={handleFormChange}
          />
        </View>

        {/* Property Details */}
        <View className="mb-8">
          <SectionHeader title="Property Details" delay={200} />
          <FormField
            title="Location"
            value={form.location}
            placeholder="Property location..."
            iconName="map-marker-outline"
            required
            onChangeText={handleFormChange}
          />
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <FormField
                title="Area"
                value={form.area}
                placeholder="Area in sq ft..."
                iconName="ruler-square"
                keyboardType="numeric"
                onChangeText={handleFormChange}
              />
            </View>
            <View className="flex-1">
              <FormField
                title="Property Type"
                value={form.propertytype}
                placeholder="Type..."
                iconName="home-city-outline"
                onChangeText={handleFormChange}
              />
            </View>
          </View>
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <FormField
                title="Bedrooms"
                value={form.bedrooms}
                placeholder="Bedrooms..."
                iconName="bed-empty"
                keyboardType="numeric"
                onChangeText={handleFormChange}
              />
            </View>
            <View className="flex-1">
              <FormField
                title="Bathrooms"
                value={form.bathrooms}
                placeholder="Bathrooms..."
                iconName="shower"
                keyboardType="numeric"
                onChangeText={handleFormChange}
              />
            </View>
          </View>
        </View>

        {/* Media Upload */}
        <View className="mb-8">
          <SectionHeader title="Media & Documents" delay={400} />

          {/* Image Upload */}
          <TouchableOpacity onPress={openImagePicker} className="mb-4">
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
                      setForm(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }));
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
          <TouchableOpacity onPress={handleSubmit}>
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

        {/* Clear Form Button */}
        <Animatable.View
          animation="fadeInUp"
          delay={700}
          className="mb-6"
        >
          <TouchableOpacity onPress={resetForm}>
            <LinearGradient
              colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
              className="rounded-xl p-0.5"
            >
              <View className="bg-[#1a1a1a] rounded-xl py-4 items-center">
                <Text className="text-gray-300 font-pbold text-lg">
                  Clear All Fields
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>

      <TokenizationModal
        visible={showTokenizationModal}
        onClose={() => setShowTokenizationModal(false)}
        onComplete={handleTokenizationComplete}
      />
    </SafeAreaView>
  );
};

export default Create;
