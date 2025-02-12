import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Dimensions, Image, Text } from 'react-native';
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = 400;

const TrendingNFTs = ({ posts }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex === posts.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true
        });
        setCurrentIndex(0);
      } else {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true
        });
        setCurrentIndex(prev => prev + 1);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      delay={index * 200}
      style={{
        width: ITEM_WIDTH,
        marginHorizontal: (width - ITEM_WIDTH) / 4,
      }}
    >
      <LinearGradient
        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
        className="rounded-3xl p-4 mb-4"
      >
        {/* Featured Badge */}
        <View className="absolute top-6 right-6 z-10">
          <View className="bg-secondary/80 px-4 py-1 rounded-full">
            <Text className="text-white font-pbold">Featured</Text>
          </View>
        </View>

        {/* NFT Image */}
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          delay={index * 300}
        >
          <Image
            source={item.thumbnail}
            className="w-full h-[250px] rounded-2xl mb-4"
            resizeMode="cover"
          />
        </Animatable.View>

        {/* NFT Details */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={index * 400}
        >
          <Text className="text-white font-psemibold text-xl mb-2">
            {item.title}
          </Text>
          <Text className="text-gray-100 font-pregular mb-2">
            {item.location}
          </Text>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-100 font-pregular">Price</Text>
              <Text className="text-secondary font-pbold text-lg">
                {item.price}
              </Text>
            </View>
            <View>
              <Text className="text-gray-100 font-pregular">Returns</Text>
              <Text className="text-green-500 font-pbold">
                {item.returns}
              </Text>
            </View>
          </View>
        </Animatable.View>
      </LinearGradient>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-4 space-x-2">
        {posts.map((_, idx) => (
          <View
            key={idx}
            className={`h-2 rounded-full ${idx === currentIndex
                ? 'w-4 bg-secondary'
                : 'w-2 bg-gray-500'
              }`}
          />
        ))}
      </View>
    </Animatable.View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <FlatList
      ref={flatListRef}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      decelerationRate="fast"
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
    />
  );
};

export default TrendingNFTs;
