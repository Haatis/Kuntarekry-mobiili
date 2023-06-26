import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const saveIsLoggedIn = async () => {
      try {
        console.log('isLoggedIn', isLoggedIn ? 'true' : 'false');
        await AsyncStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
      } catch (error) {
        console.error('Error saving isLoggedIn:', error);
      }
    };
    if (isLoggedIn === true) saveIsLoggedIn();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchIsLoggedIn = async () => {
      try {
        const storedIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn) {
          setIsLoggedIn(storedIsLoggedIn === 'true');
        }
      } catch (error) {
        console.error('Error fetching isLoggedIn:', error);
      }
    };
    fetchIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, loading, fetchUserData, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
