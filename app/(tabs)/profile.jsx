import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

import { images, icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox } from "../../components";

// Hardcoded investment data
const investmentData = [
  {
    id: '1',
    title: "Miami Beach Villa",
    investment: "2.5 ETH",
    returns: "12% APY",
    thumbnail: images.cards,
    status: "Active",
    date: "Mar 15, 2024"
  },
  {
    id: '2',
    title: "Manhattan Penthouse",
    investment: "1.8 ETH",
    returns: "10.5% APY",
    thumbnail: images.cards,
    status: "Pending",
    date: "Mar 10, 2024"
  },
  {
    id: '3',
    title: "Beverly Hills Estate",
    investment: "3.2 ETH",
    returns: "11.2% APY",
    thumbnail: images.cards,
    status: "Active",
    date: "Feb 28, 2024"
  }
];

const InvestmentCard = ({ item }) => (
  <Animatable.View
    animation="fadeInUp"
    className="mx-4 mb-6"
  >
    <LinearGradient
      colors={['rgba(175, 103, 219, 0.1)', 'rgba(25, 77, 181, 0.1)']}
      className="rounded-2xl p-4"
    >
      <View className="flex-row">
        <Image
          source={item.thumbnail}
          className="w-20 h-20 rounded-xl"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4">
          <Text className="text-white font-psemibold text-lg">{item.title}</Text>
          <Text className="text-gray-100 font-pregular mt-1">Invested: {item.investment}</Text>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-secondary font-pmedium">{item.returns}</Text>
            <View className={`px-3 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
              <Text className={`font-pbold ${item.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
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

  const userProfile = {
    username: "BlockVest Investor",
    avatar: images.profile,
    totalInvestments: "7.5 ETH",
    totalReturns: "0.9 ETH",
    portfolioValue: "8.4 ETH"
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={investmentData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InvestmentCard item={item} />
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
                <Text className="text-secondary font-pbold text-xl">{userProfile.totalInvestments}</Text>
                <Text className="text-gray-100 font-pregular mt-1">Invested</Text>
              </View>
              <View className="flex-1 items-center bg-black-100/50 rounded-xl p-4 mx-2">
                <Text className="text-secondary font-pbold text-xl">{userProfile.totalReturns}</Text>
                <Text className="text-gray-100 font-pregular mt-1">Returns</Text>
              </View>
              <View className="flex-1 items-center bg-black-100/50 rounded-xl p-4 mx-2">
                <Text className="text-secondary font-pbold text-xl">{userProfile.portfolioValue}</Text>
                <Text className="text-gray-100 font-pregular mt-1">Portfolio</Text>
              </View>
            </Animatable.View>

            {/* Actions Section */}
            <ProfileActions />

            {/* Investments Header */}
            <Animatable.View
              animation="fadeInUp"
              delay={700}
              className="mb-4"
            >
              <Text className="text-white font-psemibold text-xl">My Investments</Text>
              <Text className="text-gray-100 font-pregular mt-1">Your active property investments</Text>
            </Animatable.View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
