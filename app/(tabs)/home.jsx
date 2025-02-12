import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, Dimensions, TouchableOpacity, ScrollView, TextInput } from "react-native";
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

// Add filter options
const filterOptions = {
  priceRanges: [
    { min: 0.5, max: 2, label: "0.5 - 2 ETH" },
    { min: 2, max: 5, label: "2 - 5 ETH" },
    { min: 5, max: 10, label: "5 - 10 ETH" },
    { min: 10, max: null, label: "10+ ETH" }
  ],
  propertyTypes: ["Villa", "Apartment", "Penthouse", "Mansion"],
  locations: ["Miami", "New York", "Dubai", "Beverly Hills", "London"]
};

// Quick Filters Component
const QuickFilters = ({
  activeFilter,
  setActiveFilter,
  selectedFilters,
  handleFilterSelect
}) => (
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
            name="currency-eth"
            size={20}
            color={activeFilter === 'price' ? "#fff" : "#af67db"}
          />
          <Text className={`ml-2 ${activeFilter === 'price' ? 'text-white' : 'text-gray-100'}`}>
            {selectedFilters.priceRange?.label || "Price Range"}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={activeFilter === 'price' ? "#fff" : "#af67db"}
            style={{ marginLeft: 8 }}
          />
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
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={activeFilter === 'type' ? "#fff" : "#af67db"}
            style={{ marginLeft: 8 }}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Location Filter */}
      <TouchableOpacity
        onPress={() => setActiveFilter(activeFilter === 'location' ? null : 'location')}
      >
        <LinearGradient
          colors={activeFilter === 'location' ? ['#af67db', '#8547a8'] : ['rgba(26,26,26,0.9)', 'rgba(26,26,26,0.9)']}
          className="rounded-full px-4 py-2 flex-row items-center"
        >
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={20}
            color={activeFilter === 'location' ? "#fff" : "#af67db"}
          />
          <Text className={`ml-2 ${activeFilter === 'location' ? 'text-white' : 'text-gray-100'}`}>
            {selectedFilters.location || "Location"}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={activeFilter === 'location' ? "#fff" : "#af67db"}
            style={{ marginLeft: 8 }}
          />
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
                <Text className="text-gray-100">{type}</Text>
                <View className={`w-5 h-5 rounded-full border border-secondary 
                  ${selectedFilters.propertyType === type ? 'bg-secondary' : ''}`}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeFilter === 'location' && (
          <View>
            {filterOptions.locations.map((location) => (
              <TouchableOpacity
                key={location}
                onPress={() => handleFilterSelect('location', location)}
                className="flex-row justify-between items-center py-2 px-3"
              >
                <Text className="text-gray-100">{location}</Text>
                <View className={`w-5 h-5 rounded-full border border-secondary 
                  ${selectedFilters.location === location ? 'bg-secondary' : ''}`}
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
  const featuredListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(nftData);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null,
    propertyType: null,
    location: null
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter handling function
  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));

    // Apply filters
    let filtered = nftData;

    if (value) {
      switch (filterType) {
        case 'priceRange':
          filtered = filtered.filter(property => {
            const price = parseFloat(property.price);
            return price >= value.min && (!value.max || price <= value.max);
          });
          break;
        case 'propertyType':
          filtered = filtered.filter(property =>
            property.propertyType.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'location':
          filtered = filtered.filter(property =>
            property.location.toLowerCase().includes(value.toLowerCase())
          );
          break;
      }
    }

    setFilteredProperties(filtered);
    setActiveFilter(null);
  };

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

        {/* Logo without gradient background */}
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

      {/* Search and Filter Section */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        delay={800}
        className="px-4 mb-4"
      >
        <View className="flex-row items-center space-x-2">
          <View className="flex-1">
            <SearchInput
              placeholder="Search properties..."
              containerStyle="bg-[#1a1a1a]"
            />
          </View>
          <TouchableOpacity
            onPress={() => setActiveFilter(null)}
            className="bg-[#1a1a1a] p-3 rounded-xl"
          >
            <MaterialCommunityIcons name="filter-variant" size={24} color="#af67db" />
          </TouchableOpacity>
        </View>
      </Animatable.View>

      {/* Quick Filters */}
      <QuickFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedFilters={selectedFilters}
        handleFilterSelect={handleFilterSelect}
      />

      {/* Interactive Categories */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        delay={1200}
        className="px-4 mb-6"
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-3"
        >
          {['All', 'Villas', 'Apartments', 'Penthouses', 'Mansions'].map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onPress={() => {
                setSelectedCategory(category);
                // Add your filter logic here
                const filteredData = category === 'All'
                  ? nftData
                  : nftData.filter(item =>
                    item.propertyType.toLowerCase().includes(category.toLowerCase())
                  );
                // Update your displayed data here
              }}
            />
          ))}
        </ScrollView>
      </Animatable.View>

      {/* Featured Properties Section */}
      <View>
        <Animatable.View
          animation="fadeInLeft"
          duration={1000}
          delay={1400}
          className="px-4 mb-4"
        >
          <Text className="text-xl font-psemibold text-white">
            Featured Properties
          </Text>
          <Text className="text-gray-100 font-pregular mt-1">
            Premium real estate opportunities
          </Text>
        </Animatable.View>

        <FlatList
          ref={featuredListRef}
          data={filteredProperties}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <FeaturedNFT item={item} index={index} />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentIndex(newIndex);
          }}
        />

        {/* Pagination Dots */}
        <View className="flex-row justify-center mt-4 space-x-2">
          {filteredProperties.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full ${index === currentIndex
                ? 'w-4 bg-secondary'
                : 'w-2 bg-gray-500'
                }`}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
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
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 1500);
            }}
            tintColor="#af67db"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
