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
import AsyncStorage from '@react-native-async-storage/async-storage';
import propertyAPI from "../../lib/propertyApi";

const { width } = Dimensions.get('window');

const Create = () => {
  const initialFormState = {
    // Required Fields
    title: "",
    description: "",
    propertyType: "",
    price: "",
    address: "",
    coordinates: [],

    // Property Details
    area: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [],
    yearBuilt: "",
    constructionStatus: "",

    // Blockchain Related
    isAuctionEnabled: false,
    minimumBid: "",
    auctionEndTime: "",

    // Legal Information
    legalDescription: "",
    propertyId: "",
    verificationDocument: "",

    // Files
    images: [],
    documents: []
  };

  const [form, setForm] = useState(initialFormState);
  const [showTokenizationModal, setShowTokenizationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png", "image/jpg"],
        multiple: true,
        copyToCacheDirectory: true
      });

      if (!result.canceled && result.assets) {
        // Check if adding new images would exceed the limit
        if (form.images.length + result.assets.length > 10) {
          Alert.alert("Error", "Maximum 10 images allowed");
          return;
        }

        setForm(prev => ({
          ...prev,
          images: [...prev.images, ...result.assets]
        }));
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert("Error", "Failed to select images. Please try again.");
    }
  };

  const openDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        copyToCacheDirectory: true
      });

      if (!result.canceled && result.assets?.[0]) {
        setForm(prev => ({
          ...prev,
          documents: result.assets[0]
        }));
      }
    } catch (error) {
      console.error('Document picker error:', error);
      Alert.alert("Error", "Failed to select document. Please try again.");
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

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = {
      title: 'Property Title',
      description: 'Description',
      propertyType: 'Property Type',
      price: 'Price',
      address: 'Address',
      coordinates: 'Coordinates'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => {
        if (key === 'coordinates') {
          return !form.coordinates || form.coordinates.length !== 2;
        }
        return !form[key];
      })
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      return Alert.alert(
        "Required Fields Missing",
        `Please fill in the following required fields:\n${missingFields.join('\n')}`,
        [{ text: "OK" }]
      );
    }

    try {
      setIsSubmitting(true);

      // Get token from storage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }

      // Format data for API
      const propertyData = {
        // Required fields
        title: form.title.trim(),
        description: form.description.trim(),
        propertyType: form.propertyType,
        price: parseFloat(form.price) || 0,
        address: form.address.trim(),
        coordinates: form.coordinates.map(coord => parseFloat(coord) || 0),

        // Property Details (optional)
        ...(form.area ? { area: parseFloat(form.area) } : {}),
        ...(form.bedrooms ? { bedrooms: parseInt(form.bedrooms, 10) } : {}),
        ...(form.bathrooms ? { bathrooms: parseInt(form.bathrooms, 10) } : {}),
        ...(form.amenities.length > 0 ? { amenities: form.amenities } : {}),
        ...(form.yearBuilt ? { yearBuilt: parseInt(form.yearBuilt, 10) } : {}),
        ...(form.constructionStatus ? { constructionStatus: form.constructionStatus } : {}),

        // Blockchain Related (optional)
        isAuctionEnabled: form.isAuctionEnabled,
        ...(form.minimumBid ? { minimumBid: parseFloat(form.minimumBid) } : {}),
        ...(form.auctionEndTime ? { auctionEndTime: form.auctionEndTime } : {}),

        // Legal Information (optional)
        ...(form.legalDescription ? { legalDescription: form.legalDescription.trim() } : {}),
        ...(form.propertyId ? { propertyId: form.propertyId.trim() } : {}),
        ...(form.verificationDocument ? { verificationDocument: form.verificationDocument.trim() } : {}),

        // Files
        images: form.images,
        documents: form.documents
      };

      // Validate numeric fields are non-negative
      const numericFields = ['price', 'area', 'bedrooms', 'bathrooms', 'minimumBid'];
      numericFields.forEach(field => {
        if (propertyData[field] !== undefined && propertyData[field] < 0) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number.`);
        }
      });

      // Validate year built
      if (propertyData.yearBuilt) {
        const currentYear = new Date().getFullYear();
        if (propertyData.yearBuilt < 1800 || propertyData.yearBuilt > currentYear) {
          throw new Error(`Year built must be between 1800 and ${currentYear}.`);
        }
      }

      // Validate coordinates
      if (propertyData.coordinates.length === 2) {
        const [longitude, latitude] = propertyData.coordinates;
        if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
          throw new Error('Invalid coordinates. Longitude must be between -180 and 180, and latitude between -90 and 90.');
        }
      }

      // Validate files
      if (propertyData.images?.length > 10) {
        throw new Error('Maximum 10 images allowed.');
      }
      if (propertyData.documents?.length > 5) {
        throw new Error('Maximum 5 documents allowed.');
      }

      // Show loading message
      Alert.alert(
        "Processing",
        "Creating your property listing. This may take a few moments...",
        [{ text: "OK" }]
      );

      // Create property
      const response = await propertyAPI.createProperty(propertyData, token);

      Alert.alert(
        "Success",
        "Your property has been successfully listed!",
        [
          {
            text: "View Property",
            onPress: () => router.push(`/property/${response.id}`)
          },
          {
            text: "OK",
            onPress: () => {
              resetForm();
              router.push("/home");
            }
          }
        ]
      );
    } catch (error) {
      console.error('Property creation error:', error);
      Alert.alert("Error", error.message || "Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Basic Information - Required Fields */}
        <View className="mb-8">
          <SectionHeader title="Basic Information (Required)" />
          <FormField
            title="Property Title"
            value={form.title}
            placeholder="Enter property title..."
            iconName="home-outline"
            required
            onChangeText={(value) => handleFormChange(value, 'title')}
          />
          <FormField
            title="Description"
            value={form.description}
            placeholder="Enter property description..."
            iconName="text"
            type="textarea"
            required
            onChangeText={(value) => handleFormChange(value, 'description')}
          />
          <FormField
            title="Property Type"
            value={form.propertyType}
            placeholder="Select property type..."
            iconName="home-city-outline"
            required
            type="dropdown"
            options={[
              { label: 'Residential', value: 'residential' },
              { label: 'Commercial', value: 'commercial' },
              { label: 'Land', value: 'land' }
            ]}
            onChangeText={(value) => handleFormChange(value, 'propertyType')}
          />
          <FormField
            title="Price"
            value={form.price}
            placeholder="Enter price..."
            iconName="cash"
            keyboardType="numeric"
            required
            onChangeText={(value) => handleFormChange(value, 'price')}
          />
          <FormField
            title="Address"
            value={form.address}
            placeholder="Enter property address..."
            iconName="map-marker-outline"
            required
            onChangeText={(value) => handleFormChange(value, 'address')}
          />
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <FormField
                title="Longitude"
                value={form.coordinates?.[0]?.toString()}
                placeholder="Longitude (-180 to 180)..."
                iconName="longitude"
                keyboardType="numeric"
                required
                onChangeText={(value) => {
                  const coords = [...(form.coordinates || [0, 0])];
                  coords[0] = value ? parseFloat(value) : '';
                  handleFormChange(coords, 'coordinates');
                }}
              />
            </View>
            <View className="flex-1">
              <FormField
                title="Latitude"
                value={form.coordinates?.[1]?.toString()}
                placeholder="Latitude (-90 to 90)..."
                iconName="latitude"
                keyboardType="numeric"
                required
                onChangeText={(value) => {
                  const coords = [...(form.coordinates || [0, 0])];
                  coords[1] = value ? parseFloat(value) : '';
                  handleFormChange(coords, 'coordinates');
                }}
              />
            </View>
          </View>
        </View>

        {/* Property Details - Optional */}
        <View className="mb-8">
          <SectionHeader title="Property Details (Optional)" delay={200} />
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <FormField
                title="Area (sq ft)"
                value={form.area}
                placeholder="Area..."
                iconName="ruler-square"
                keyboardType="numeric"
                onChangeText={(value) => handleFormChange(value, 'area')}
              />
            </View>
            <View className="flex-1">
              <FormField
                title="Year Built"
                value={form.yearBuilt?.toString()}
                placeholder="Year..."
                iconName="calendar"
                keyboardType="number-pad"
                maxLength={4}
                onChangeText={(value) => {
                  const numericValue = value.replace(/[^0-9]/g, '');
                  handleFormChange(numericValue, 'yearBuilt');
                }}
              />
            </View>
          </View>
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <FormField
                title="Bedrooms"
                value={form.bedrooms?.toString()}
                placeholder="Number of bedrooms..."
                iconName="bed-empty"
                keyboardType="number-pad"
                onChangeText={(value) => handleFormChange(value, 'bedrooms')}
              />
            </View>
            <View className="flex-1">
              <FormField
                title="Bathrooms"
                value={form.bathrooms?.toString()}
                placeholder="Number of bathrooms..."
                iconName="shower"
                keyboardType="number-pad"
                onChangeText={(value) => handleFormChange(value, 'bathrooms')}
              />
            </View>
          </View>
          <FormField
            title="Construction Status"
            value={form.constructionStatus}
            placeholder="Select construction status..."
            iconName="crane"
            type="dropdown"
            options={[
              { label: 'Select status...', value: '' },
              { label: 'Completed', value: 'completed' },
              { label: 'Under Construction', value: 'under_construction' },
              { label: 'Off Plan', value: 'off_plan' }
            ]}
            onChangeText={(value) => handleFormChange(value, 'constructionStatus')}
          />
        </View>

        {/* Blockchain Details - Optional */}
        <View className="mb-8">
          <SectionHeader title="Blockchain Details (Optional)" delay={300} />
          <View className="flex-row items-center mb-4">
            <Text className="text-white mr-2">Enable Auction</Text>
            <TouchableOpacity
              onPress={() => handleFormChange(!form.isAuctionEnabled, 'isAuctionEnabled')}
              className={`p-2 rounded-lg ${form.isAuctionEnabled ? 'bg-secondary' : 'bg-gray-600'}`}
            >
              <MaterialCommunityIcons
                name={form.isAuctionEnabled ? "check" : "close"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {form.isAuctionEnabled && (
            <>
              <FormField
                title="Minimum Bid"
                value={form.minimumBid}
                placeholder="Enter minimum bid amount..."
                iconName="cash-multiple"
                keyboardType="numeric"
                onChangeText={(value) => handleFormChange(value, 'minimumBid')}
              />
              <FormField
                title="Auction End Time"
                value={form.auctionEndTime}
                placeholder="YYYY-MM-DDTHH:mm:ssZ"
                iconName="clock-outline"
                onChangeText={(value) => handleFormChange(value, 'auctionEndTime')}
              />
            </>
          )}
        </View>

        {/* Legal Information - Optional */}
        <View className="mb-8">
          <SectionHeader title="Legal Information (Optional)" delay={400} />
          <FormField
            title="Legal Description"
            value={form.legalDescription}
            placeholder="Enter legal description..."
            iconName="file-document-outline"
            type="textarea"
            onChangeText={(value) => handleFormChange(value, 'legalDescription')}
          />
          <FormField
            title="Country ID"
            value={form.propertyId}
            placeholder="Enter Country ID..."
            iconName="identifier"
            onChangeText={(value) => handleFormChange(value, 'propertyId')}
          />
          <FormField
            title="Verification Document URL"
            value={form.verificationDocument}
            placeholder="Enter verification document URL..."
            iconName="link-variant"
            onChangeText={(value) => handleFormChange(value, 'verificationDocument')}
          />
        </View>

        {/* Media Upload */}
        <View className="mb-8">
          <SectionHeader title="Media & Documents" delay={500} />

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
    </SafeAreaView>
  );
};

export default Create;
