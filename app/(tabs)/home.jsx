import { useState, useRef, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, Dimensions, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { images, icons } from "../../constants";
import { EmptyState, SearchInput, NFTCard, TrendingNFTs } from "../../components";
import {
  IoWalletOutline,
  IoLocationOutline,
  IoHomeOutline,
  IoStatsChartOutline,
  IoPricetagOutline,
  IoChevronDownOutline,
  IoBuildingOutline,
  IoSearchOutline,
  IoFilterOutline
} from "react-icons/io5";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import propertyAPI from "../../lib/propertyApi";

const { width } = Dimensions.get('window');

// Enhanced NFT data with more details
const nftData = [
  {
    id: '1',
    title: "Luxury Beach Villa NFT",
    price: "2.5 ETH",
    usdPrice: "$4,250",
    creator: "BlockVest Premium",
    thumbnail: images.cards,
    location: "Miami Beach, Florida",
    propertyType: "Luxury Villa",
    tokenId: "#BV8923",
    area: "5,200 sq ft",
    bedrooms: "5",
    bathrooms: "6",
    returns: "12% APY",
    description: "Exclusive beachfront property with panoramic ocean views, private beach access, and luxury amenities.",
    amenities: ["Private Pool", "Beach Access", "Smart Home", "24/7 Security", "Wine Cellar"],
    status: "Available",
    investmentDetails: {
      minInvestment: "0.5 ETH",
      totalInvestors: "24",
      totalRaised: "1.8 ETH",
      targetRaise: "2.5 ETH",
      propertyValue: "$7.2M"
    }
  },
  {
    id: '2',
    title: "Manhattan Sky Loft",
    price: "3.2 ETH",
    usdPrice: "$5,440",
    creator: "Urban Property DAO",
    thumbnail: images.cards,
    location: "Upper East Side, NY",
    propertyType: "Penthouse",
    tokenId: "#BV8924",
    area: "3,800 sq ft",
    bedrooms: "4",
    bathrooms: "4.5",
    returns: "10.5% APY",
    description: "Stunning penthouse with 360° city views, featuring modern design and premium finishes.",
    amenities: ["Rooftop Terrace", "Gym", "Concierge", "Parking", "Pet Spa"],
    status: "Featured",
    investmentDetails: {
      minInvestment: "0.8 ETH",
      totalInvestors: "18",
      totalRaised: "2.1 ETH",
      targetRaise: "3.2 ETH",
      propertyValue: "$5.8M"
    }
  },
  {
    id: '3',
    title: "Beverly Hills Estate",
    price: "4.5 ETH",
    usdPrice: "$7,650",
    creator: "Luxury Estates DAO",
    thumbnail: images.cards,
    location: "Beverly Hills, CA",
    propertyType: "Mansion",
    tokenId: "#BV8925",
    area: "8,500 sq ft",
    bedrooms: "7",
    bathrooms: "8.5",
    returns: "11.2% APY",
    description: "Iconic Beverly Hills estate with premium amenities and celebrity neighbors.",
    amenities: ["Theater", "Tennis Court", "Wine Cellar", "Guest House", "Spa"],
    status: "Hot",
    investmentDetails: {
      minInvestment: "1.0 ETH",
      totalInvestors: "12",
      totalRaised: "3.2 ETH",
      targetRaise: "4.5 ETH",
      propertyValue: "$12.5M"
    }
  },
  {
    id: '4',
    title: "Dubai Marina Residence",
    price: "2.8 ETH",
    usdPrice: "$4,760",
    creator: "Global Property DAO",
    thumbnail: images.cards,
    location: "Dubai Marina, UAE",
    propertyType: "Luxury Apartment",
    tokenId: "#BV8926",
    area: "2,800 sq ft",
    bedrooms: "3",
    bathrooms: "3.5",
    returns: "13.5% APY",
    description: "Ultra-luxury apartment in the heart of Dubai Marina with stunning waterfront views.",
    amenities: ["Infinity Pool", "Private Beach", "Valet", "Marina View", "Smart Home"],
    status: "New",
    investmentDetails: {
      minInvestment: "0.6 ETH",
      totalInvestors: "15",
      totalRaised: "1.9 ETH",
      targetRaise: "2.8 ETH",
      propertyValue: "$3.9M"
    }
  },
  {
    id: '5',
    title: "Aspen Mountain Lodge",
    price: "3.8 ETH",
    usdPrice: "$6,460",
    creator: "Mountain Estates DAO",
    thumbnail: images.cards,
    location: "Aspen, Colorado",
    propertyType: "Ski Lodge",
    tokenId: "#BV8927",
    area: "4,200 sq ft",
    bedrooms: "5",
    bathrooms: "5",
    returns: "9.8% APY",
    description: "Luxury ski-in/ski-out lodge with breathtaking mountain views and premium amenities.",
    amenities: ["Ski Access", "Hot Tub", "Fireplace", "Game Room", "Heated Garage"],
    status: "Limited",
    investmentDetails: {
      minInvestment: "0.9 ETH",
      totalInvestors: "20",
      totalRaised: "2.8 ETH",
      targetRaise: "3.8 ETH",
      propertyValue: "$6.2M"
    }
  },
  {
    id: '6',
    title: "Santorini Villa",
    price: "2.9 ETH",
    usdPrice: "$4,930",
    creator: "Mediterranean DAO",
    thumbnail: images.cards,
    location: "Santorini, Greece",
    propertyType: "Villa",
    tokenId: "#BV8928",
    area: "3,200 sq ft",
    bedrooms: "4",
    bathrooms: "4",
    returns: "11.8% APY",
    description: "Stunning clifftop villa with infinity pool and panoramic Aegean Sea views.",
    amenities: ["Infinity Pool", "Wine Cellar", "Private Chef", "Helipad", "Sunset View"],
    status: "Popular",
    investmentDetails: {
      minInvestment: "0.7 ETH",
      totalInvestors: "22",
      totalRaised: "2.1 ETH",
      targetRaise: "2.9 ETH",
      propertyValue: "$4.8M"
    }
  }
];

// Featured NFT Component
const FeaturedNFT = ({ item, index }) => (
  <Animatable.View
    animation="fadeIn"
    duration={1000}
    delay={index * 200}
    style={{
      width: width * 0.85,
      marginHorizontal: width * 0.075,
    }}
  >
    <LinearGradient
      colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
      className="rounded-3xl p-4"
    >
      <Image
        source={item.thumbnail}
        className="w-full h-[250px] rounded-2xl"
        resizeMode="cover"
      />
      <View className="mt-4">
        <Text className="text-white font-psemibold text-xl">{item.title}</Text>
        <Text className="text-gray-100 mt-1">{item.location}</Text>
        <View className="flex-row justify-between mt-3">
          <Text className="text-secondary font-pbold">{item.price}</Text>
          <Text className="text-green-500">{item.returns}</Text>
        </View>
      </View>
    </LinearGradient>
  </Animatable.View>
);

// Add these new components
const AnimatedSearchBox = () => (
  <Animatable.View
    animation="fadeInDown"
    delay={800}
    className="px-4 mb-6"
  >
    <LinearGradient
      colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
      className="rounded-2xl p-3 flex-row items-center"
    >
      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5 mr-3"
          tintColor="#af67db"
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Search properties..."
        placeholderTextColor="#666"
        className="flex-1 text-white font-pregular text-base"
      />
      <TouchableOpacity>
        <View className="bg-[#1a1a1a] rounded-xl p-2">
          <Image
            source={icons.filter}
            className="w-5 h-5"
            tintColor="#af67db"
          />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  </Animatable.View>
);

const QuickStats = () => (
  <Animatable.View
    animation="fadeInUp"
    delay={1000}
    className="px-4 mb-6"
  >
    <LinearGradient
      colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
      className="rounded-2xl p-4 flex-row justify-between"
    >
      <View className="items-center">
        <Text className="text-secondary font-pbold text-lg">24</Text>
        <Text className="text-gray-100 text-xs">Properties</Text>
      </View>
      <View className="items-center">
        <Text className="text-secondary font-pbold text-lg">$12.5M</Text>
        <Text className="text-gray-100 text-xs">Total Value</Text>
      </View>
      <View className="items-center">
        <Text className="text-secondary font-pbold text-lg">11.2%</Text>
        <Text className="text-gray-100 text-xs">Avg Returns</Text>
      </View>
    </LinearGradient>
  </Animatable.View>
);

const CategoryButton = ({ category, isSelected, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Animatable.View
      animation={isSelected ? "pulse" : "fadeIn"}
      duration={1000}
    >
      <LinearGradient
        colors={isSelected ? ['#af67db', '#8547a8'] : ['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
        className="rounded-full px-4 py-2"
      >
        <Text className={`font-pmedium ${isSelected ? 'text-white' : 'text-gray-100'}`}>
          {category}
        </Text>
      </LinearGradient>
    </Animatable.View>
  </TouchableOpacity>
);

// ============ Filter Options ============
const filterOptions = {
  priceRanges: [
    { min: 0, max: 100, label: "Under 100 ETH" },
    { min: 100, max: 500, label: "100-500 ETH" },
    { min: 500, max: 1000, label: "500-1000 ETH" },
    { min: 1000, max: null, label: "Over 1000 ETH" }
  ],
  propertyTypes: ["residential", "commercial"],
  status: ["pending", "tokenized", "sold"]
};

// Quick Filters Component
const QuickFilters = ({ activeFilter, setActiveFilter, selectedFilters, handleFilterSelect }) => (
  <Animatable.View
    animation="fadeInUp"
    duration={500}
    className="px-4 py-2"
  >
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="space-x-3"
    >
      {/* Price Range Filter */}
      <TouchableOpacity
        onPress={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
      >
        <LinearGradient
          colors={activeFilter === 'price' ? ['#af67db', '#8547a8'] : ['rgba(26,26,26,0.9)', 'rgba(26,26,26,0.9)']}
          className="rounded-full px-4 py-2 flex-row items-center"
        >
          <MaterialCommunityIcons
            name="currency-usd"
            size={20}
            color={activeFilter === 'price' ? "#fff" : "#af67db"}
          />
          <Text className={`ml-2 ${activeFilter === 'price' ? 'text-white' : 'text-gray-100'}`}>
            {selectedFilters.priceRange?.label || "Price Range"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Property Type Filter */}
      <TouchableOpacity
        onPress={() => setActiveFilter(activeFilter === 'type' ? null : 'type')}
      >
        <LinearGradient
          colors={activeFilter === 'type' ? ['#af67db', '#8547a8'] : ['rgba(26,26,26,0.9)', 'rgba(26,26,26,0.9)']}
          className="rounded-full px-4 py-2 flex-row items-center"
        >
          <MaterialCommunityIcons
            name="home-outline"
            size={20}
            color={activeFilter === 'type' ? "#fff" : "#af67db"}
          />
          <Text className={`ml-2 ${activeFilter === 'type' ? 'text-white' : 'text-gray-100'}`}>
            {selectedFilters.propertyType || "Property Type"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Status Filter */}
      <TouchableOpacity
        onPress={() => setActiveFilter(activeFilter === 'status' ? null : 'status')}
      >
        <LinearGradient
          colors={activeFilter === 'status' ? ['#af67db', '#8547a8'] : ['rgba(26,26,26,0.9)', 'rgba(26,26,26,0.9)']}
          className="rounded-full px-4 py-2 flex-row items-center"
        >
          <MaterialCommunityIcons
            name="tag-outline"
            size={20}
            color={activeFilter === 'status' ? "#fff" : "#af67db"}
          />
          <Text className={`ml-2 ${activeFilter === 'status' ? 'text-white' : 'text-gray-100'}`}>
            {selectedFilters.status || "Status"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>

    {/* Filter Dropdowns */}
    {activeFilter && (
      <Animatable.View
        animation="fadeIn"
        duration={300}
        className="mt-3 bg-[#1a1a1a] rounded-xl p-3"
      >
        {activeFilter === 'price' && (
          <View>
            {filterOptions.priceRanges.map((range) => (
              <TouchableOpacity
                key={range.label}
                onPress={() => handleFilterSelect('priceRange', range)}
                className="flex-row justify-between items-center py-2 px-3"
              >
                <Text className="text-gray-100">{range.label}</Text>
                <View className={`w-5 h-5 rounded-full border border-secondary 
                  ${selectedFilters.priceRange?.label === range.label ? 'bg-secondary' : ''}`}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeFilter === 'type' && (
          <View>
            {filterOptions.propertyTypes.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => handleFilterSelect('propertyType', type)}
                className="flex-row justify-between items-center py-2 px-3"
              >
                <Text className="text-gray-100 capitalize">{type}</Text>
                <View className={`w-5 h-5 rounded-full border border-secondary 
                  ${selectedFilters.propertyType === type ? 'bg-secondary' : ''}`}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeFilter === 'status' && (
          <View>
            {filterOptions.status.map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => handleFilterSelect('status', status)}
                className="flex-row justify-between items-center py-2 px-3"
              >
                <Text className="text-gray-100 capitalize">{status}</Text>
                <View className={`w-5 h-5 rounded-full border border-secondary 
                  ${selectedFilters.status === status ? 'bg-secondary' : ''}`}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animatable.View>
    )}
  </Animatable.View>
);

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null,
    propertyType: null,
    status: null
  });

  // Fetch properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
      const data = await propertyAPI.getProperties(token);
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(error.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProperties();
    setRefreshing(false);
  };

  // Filter properties based on selected filters and search query
  const getFilteredProperties = useCallback(() => {
    let filtered = properties;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    if (selectedFilters.priceRange) {
      filtered = filtered.filter(property => {
        const price = property.price;
        return price >= selectedFilters.priceRange.min &&
          (!selectedFilters.priceRange.max || price <= selectedFilters.priceRange.max);
      });
    }

    // Apply property type filter
    if (selectedFilters.propertyType) {
      filtered = filtered.filter(property =>
        property.propertyType.toLowerCase() === selectedFilters.propertyType.toLowerCase()
      );
    }

    // Apply status filter
    if (selectedFilters.status) {
      filtered = filtered.filter(property =>
        property.status.toLowerCase() === selectedFilters.status.toLowerCase()
      );
    }

    return filtered;
  }, [properties, searchQuery, selectedFilters]);

  // Handle filter selection
  const handleFilterSelect = useCallback((filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setActiveFilter(null);
  }, []);

  // Render loading state
  if (loading && !refreshing) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#af67db" />
        <Text className="text-white mt-4">Loading properties...</Text>
      </SafeAreaView>
    );
  }

  // Render error state
  if (error && !refreshing) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center px-4">
        <Text className="text-white text-center mb-4">{error}</Text>
        <TouchableOpacity
          onPress={fetchProperties}
          className="bg-secondary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-pbold">Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <View>
      {/* Animated Welcome Header */}
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        className="flex-row justify-between items-center px-4 pt-4"
      >
        <Animatable.View
          animation="slideInLeft"
          duration={1000}
          delay={400}
        >
          <Text className="text-gray-100 font-pmedium text-lg">
            Welcome to
          </Text>
          <Text className="text-3xl font-psemibold text-white">
            BlockVest
          </Text>
          <Animatable.Text
            animation="fadeIn"
            duration={1000}
            delay={600}
            className="text-secondary font-pmedium mt-1"
          >
            Discover Premium Real Estate NFTs
          </Animatable.Text>
        </Animatable.View>

        {/* Logo */}
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          delay={500}
          className="relative"
        >
          <Image
            source={images.logo}
            className="w-[100px] h-[100px]"
            resizeMode="contain"
          />
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            className="absolute -top-1 -right-1 bg-secondary rounded-full p-2"
          >
            <Text className="text-white text-xs font-pbold">LIVE</Text>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>

      {/* Search Input */}
      <Animatable.View
        animation="fadeInDown"
        delay={800}
        className="px-4 mb-6"
      >
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search properties..."
          containerStyle="bg-[#1a1a1a]"
        />
      </Animatable.View>

      {/* Quick Filters */}
      <QuickFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedFilters={selectedFilters}
        handleFilterSelect={handleFilterSelect}
      />

      {/* Properties Count */}
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        delay={1000}
        className="px-4 mt-6 mb-4"
      >
        <Text className="text-white font-psemibold text-xl">
          Available Properties
        </Text>
        <Text className="text-gray-100">
          {getFilteredProperties().length} properties found
        </Text>
      </Animatable.View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={getFilteredProperties()}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Animatable.View
            animation="fadeInUp"
            delay={index * 200}
          >
            <NFTCard {...item} />
          </Animatable.View>
        )}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#af67db"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Properties Found"
            message="Try adjusting your search or filters"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
