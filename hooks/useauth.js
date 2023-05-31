import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable

  const fetchUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true); // Set isLoggedIn to true if userData exists
      } else {
        setIsLoggedIn(false); // Set isLoggedIn to false if userData doesn't exist
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, loading, fetchUserData, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
