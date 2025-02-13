import { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { images, icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox } from "../../components";
import { BASE_URL } from "../../lib/api";

const PropertyCard = ({ item }) => (
  <Animatable.View
    animation="fadeInUp"
    className="mx-4 mb-6"
  >
    <TouchableOpacity
      onPress={() => router.push(`/property/details?id=${item._id}`)}
    >
      <LinearGradient
        colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
        className="rounded-2xl p-4"
      >
        <View className="flex-row">
          <Image
            source={{ uri: item.images[0] || 'https://via.placeholder.com/400x300?text=No+Image' }}
            className="w-20 h-20 rounded-xl"
            resizeMode="cover"
          />
          <View className="flex-1 ml-4">
            <Text className="text-white font-psemibold text-lg">{item.title}</Text>
            <Text className="text-gray-100 font-pregular mt-1">Price: {item.price} ETH</Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-secondary font-pmedium">{item.propertyType}</Text>
              <View className={`px-3 py-1 rounded-full ${item.isTokenized ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                <Text className={`font-pbold ${item.isTokenized ? 'text-green-500' : 'text-yellow-500'}`}>
                  {item.isTokenized ? 'Tokenized' : item.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </Animatable.View>
);

const ProfileActions = () => {
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);
  const [isBlockchainExpanded, setIsBlockchainExpanded] = useState(false);
  const [isVerificationExpanded, setIsVerificationExpanded] = useState(false);
  const [isInvestmentExpanded, setIsInvestmentExpanded] = useState(false);
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isDocsExpanded, setIsDocsExpanded] = useState(false);
  const [isSupportExpanded, setIsSupportExpanded] = useState(false);

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={600}
      className="mb-8"
    >
      <Text className="text-white font-psemibold text-xl mb-4">Actions</Text>

      {/* Settings Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsSettingsExpanded(!isSettingsExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="cog"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Settings</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    Account & Security
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isSettingsExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isSettingsExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            <TouchableOpacity
              onPress={() => router.push("/settings/profile")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="account-edit"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Edit Profile</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/settings/security")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="shield-lock"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Security Settings</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/settings/2fa")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="two-factor-authentication"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Two-Factor Auth</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/settings/notifications")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Notifications</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      {/* Documentation Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsDocsExpanded(!isDocsExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Documentation</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    Guides & Tutorials
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isDocsExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isDocsExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            <TouchableOpacity
              onPress={() => router.push("/support/docs/investment-guide")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="chart-box"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Investment Guide</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/support/docs/property")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="home-search"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Property Guide</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/support/docs/market")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="trending-up"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Market Analysis</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      {/* Property Analysis Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="chart-bell-curve"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Property Analysis</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    ML-powered insights and predictions
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isAnalysisExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Analysis Options - Only show when expanded */}
        {isAnalysisExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            {/* Price Analysis Option */}
            <TouchableOpacity
              onPress={() => router.push("/prediction/analysis")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="chart-line"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Price Analysis</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            {/* Risk Assessment Option */}
            <TouchableOpacity
              onPress={() => router.push("/prediction/risk")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="shield-check"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Risk Assessment</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            {/* Market Trends Option */}
            <TouchableOpacity
              onPress={() => router.push("/prediction/market")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="trending-up"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Market Trends</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            {/* Area Development Option */}
            <TouchableOpacity
              onPress={() => router.push("/prediction/area")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Area Development</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      {/* Blockchain Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsBlockchainExpanded(!isBlockchainExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="cube-outline"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Blockchain</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    Manage blockchain assets
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isBlockchainExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isBlockchainExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            <TouchableOpacity
              onPress={() => router.push("/blockchain/wallet")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="wallet"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Wallet</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/blockchain/nfts")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="certificate"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Property NFTs</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/blockchain/transactions")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Transactions</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      {/* Investment Management Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsInvestmentExpanded(!isInvestmentExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="chart-box"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Investment Management</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    Track and manage investments
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isInvestmentExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isInvestmentExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            <TouchableOpacity
              onPress={() => router.push("/investment/portfolio")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="view-dashboard"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Portfolio Dashboard</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/investment/performance")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="chart-line"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Performance Tracking</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/investment/dividends")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Dividend History</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/investment/compare")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="compare"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Compare Investments</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      {/* Payment Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsPaymentExpanded(!isPaymentExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="credit-card"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Payments</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    Manage payments & transactions
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isPaymentExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isPaymentExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            <TouchableOpacity
              onPress={() => router.push("/payment/methods")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="credit-card-plus"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Payment Methods</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/payment/history")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="history"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Transaction History</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/payment/status")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="progress-check"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Transaction Status</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      {/* Help & Support Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsSupportExpanded(!isSupportExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="help-circle"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Help & Support</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    Get assistance
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isSupportExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isSupportExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            <TouchableOpacity
              onPress={() => router.push("/support/chat")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="message-text"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Chat Support</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/support/tickets")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="ticket"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Support Tickets</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/support/faq")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="frequently-asked-questions"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">FAQ</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      {/* Verification Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setIsVerificationExpanded(!isVerificationExpanded)}
        >
          <LinearGradient
            colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
            className="p-4 rounded-xl"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="shield-check"
                  size={24}
                  color="#af67db"
                />
                <View className="ml-3">
                  <Text className="text-white font-psemibold">Verification Center</Text>
                  <Text className="text-gray-100 font-pregular text-sm">
                    Verify investments & documents
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={isVerificationExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#af67db"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isVerificationExpanded && (
          <Animatable.View
            animation="fadeIn"
            duration={300}
            className="mt-2 ml-9 space-y-3"
          >
            <TouchableOpacity
              onPress={() => router.push("/verification/property")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="home-search"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Property Verification</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/verification/documents")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="file-document"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Document Verification</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/verification/investment")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="cash-check"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Investment Verification</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/verification/status")}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="progress-check"
                  size={20}
                  color="#af67db"
                />
                <Text className="text-gray-100 ml-3">Verification Status</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#af67db"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </Animatable.View>
  );
};

const Profile = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProperties = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${BASE_URL}/properties/my-properties`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  const userProfile = {
    username: "BlockVest Investor",
    avatar: images.profile,
    totalProperties: properties.length,
    totalValue: properties.reduce((sum, prop) => sum + (prop.price || 0), 0),
    tokenizedProperties: properties.filter(prop => prop.isTokenized).length
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#af67db" />
        <Text className="text-white mt-4">Loading your properties...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center px-4">
        <Text className="text-white text-center mb-4">{error}</Text>
        <TouchableOpacity
          onPress={fetchUserProperties}
          className="bg-secondary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-pbold">Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={properties}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PropertyCard item={item} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Properties Found"
            message="You haven't listed any properties yet."
          />
        )}
        ListHeaderComponent={() => (
          <View className="px-4">
            {/* Header with Logo */}
            <Animatable.View
              animation="fadeIn"
              className="flex-row justify-between items-center mt-4 mb-8"
            >
              <Text className="text-2xl font-psemibold text-white">Profile</Text>
              <Image
                source={images.logo}
                className="w-24 h-24"
                resizeMode="contain"
              />
            </Animatable.View>

            {/* Profile Section */}
            <Animatable.View
              animation="fadeInUp"
              delay={300}
              className="items-center mb-8"
            >
              <View className="w-24 h-24 border-2 border-secondary rounded-2xl flex justify-center items-center p-1">
                <Image
                  source={userProfile.avatar}
                  className="w-full h-full rounded-xl"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-white font-psemibold text-xl mt-4">
                {userProfile.username}
              </Text>

              <TouchableOpacity
                onPress={logout}
                className="flex-row items-center mt-2"
              >
                <Text className="text-secondary font-pmedium mr-2">Logout</Text>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
              </TouchableOpacity>
            </Animatable.View>

            {/* Stats Section */}
            <Animatable.View
              animation="fadeInUp"
              delay={500}
              className="flex-row justify-between mb-8"
            >
              <View className="flex-1 items-center bg-black-100/50 rounded-xl p-4 mx-2">
                <Text className="text-secondary font-pbold text-xl">{userProfile.totalProperties}</Text>
                <Text className="text-gray-100 font-pregular mt-1">Properties</Text>
              </View>
              <View className="flex-1 items-center bg-black-100/50 rounded-xl p-4 mx-2">
                <Text className="text-secondary font-pbold text-xl">{userProfile.totalValue} ETH</Text>
                <Text className="text-gray-100 font-pregular mt-1">Total Value</Text>
              </View>
              <View className="flex-1 items-center bg-black-100/50 rounded-xl p-4 mx-2">
                <Text className="text-secondary font-pbold text-xl">{userProfile.tokenizedProperties}</Text>
                <Text className="text-gray-100 font-pregular mt-1">Tokenized</Text>
              </View>
            </Animatable.View>

            {/* Actions Section */}
            <ProfileActions />

            {/* Properties Header */}
            <Animatable.View
              animation="fadeInUp"
              delay={700}
              className="mb-4"
            >
              <Text className="text-white font-psemibold text-xl">My Properties</Text>
              <Text className="text-gray-100 font-pregular mt-1">Your listed properties</Text>
            </Animatable.View>
          </View>
        )}
        refreshing={loading}
        onRefresh={fetchUserProperties}
      />
    </SafeAreaView>
  );
};

export default Profile;
