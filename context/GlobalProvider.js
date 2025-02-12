import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { account } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  // Initialize session check on app start
  useEffect(() => {
    checkInitialSession();
  }, []);

  const checkInitialSession = async () => {
    try {
      const session = await account.get();
      if (session) {
        setUser(session);
        setIsLogged(true);
      }
    } catch (error) {
      // Expected error when no session exists
      console.log("No active session");
    } finally {
      // Always set loading to false after checking
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await account.deleteSession('current');
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    } finally {
      // Always reset state after logout attempt
      setUser(null);
      setIsLogged(false);
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    isLogged,
    setIsLogged,
    logout,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
