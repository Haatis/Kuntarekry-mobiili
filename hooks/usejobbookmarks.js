import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext, useContext } from 'react';
import { useJobAdvertisements } from './usejobadvertisements';

const FAVORITE_JOBS_KEY = 'favoriteJobs';
const FAVORITE_EMPLOYERS_KEY = 'favoriteEmployers';
const HIDDEN_JOBS_KEY = 'hiddenJobs';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const { jobs } = useJobAdvertisements();

  const [favoriteJobs, setFavoriteJobs] = useState(new Set());
  const [favoriteEmployers, setFavoriteEmployers] = useState(new Set());
  const [hiddenJobs, setHiddenJobs] = useState(new Set());

  useEffect(() => {
    (async () => {
      try {
        const storedFavoriteJobIDs = await AsyncStorage.getItem(FAVORITE_JOBS_KEY);
        if (storedFavoriteJobIDs != null) {
          const favoriteJobs = new Set(JSON.parse(storedFavoriteJobIDs));
          setFavoriteJobs(favoriteJobs);
        }
        const storedFavoriteEmployers = await AsyncStorage.getItem(FAVORITE_EMPLOYERS_KEY);
        if (storedFavoriteEmployers != null) {
          const favoriteEmployers = new Set(JSON.parse(storedFavoriteEmployers));
          setFavoriteEmployers(favoriteEmployers);
        }
        const storedHiddenJobs = await AsyncStorage.getItem(HIDDEN_JOBS_KEY);
        if (storedHiddenJobs != null) {
          const hiddenJobs = new Set(JSON.parse(storedHiddenJobs));
          setHiddenJobs(hiddenJobs);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [jobs]);

  const favoriteJob = async (id) => {
    try {
      const item = await AsyncStorage.getItem(FAVORITE_JOBS_KEY);
      const currentJobIDs = item !== null ? new Set(JSON.parse(item)) : new Set();
      if (currentJobIDs.has(id)) {
        // Remove from favorites if already exists
        currentJobIDs.delete(id);
      } else {
        currentJobIDs.add(id);
      }
      await AsyncStorage.setItem(FAVORITE_JOBS_KEY, JSON.stringify([...currentJobIDs]));
      setFavoriteJobs(currentJobIDs);
    } catch (error) {
      console.error(error);
    }
  };

  const favoriteEmployer = async (id) => {
    try {
      const item = await AsyncStorage.getItem(FAVORITE_EMPLOYERS_KEY);
      const currentEmployerIDs = item !== null ? new Set(JSON.parse(item)) : new Set();
      if (currentEmployerIDs.has(id)) {
        // Remove from favorites if already exists
        currentEmployerIDs.delete(id);
      } else {
        currentEmployerIDs.add(id);
      }
      await AsyncStorage.setItem(FAVORITE_EMPLOYERS_KEY, JSON.stringify([...currentEmployerIDs]));
      setFavoriteEmployers(currentEmployerIDs);
    } catch (error) {
      console.error(error);
    }
  };

  const hideJob = async (id) => {
    try {
      const item = await AsyncStorage.getItem(HIDDEN_JOBS_KEY);
      const currentHiddenIDs = item !== null ? new Set(JSON.parse(item)) : new Set();

      if (currentHiddenIDs.has(id)) {
        // Remove from hidden list if already exists
        currentHiddenIDs.delete(id);
        setHiddenJobs(currentHiddenIDs);
      } else {
        currentHiddenIDs.add(id);
        setHiddenJobs(currentHiddenIDs);
        // If favorite list has id remove from favorites
        const favoriteItem = await AsyncStorage.getItem(FAVORITE_JOBS_KEY);
        const currentFavoriteIDs = new Set(JSON.parse(favoriteItem));
        if (currentFavoriteIDs.has(id)) {
          currentFavoriteIDs.delete(id);
          await AsyncStorage.setItem(FAVORITE_JOBS_KEY, JSON.stringify([...currentFavoriteIDs]));
          setFavoriteJobs(currentFavoriteIDs);
        }
      }
      await AsyncStorage.setItem(HIDDEN_JOBS_KEY, JSON.stringify([...currentHiddenIDs]));
    } catch (error) {
      console.error(error);
    }
  };

  const clearBookmarks = async (type) => {
    try {
      switch (type) {
        case 'favoriteJob':
          await AsyncStorage.removeItem(FAVORITE_JOBS_KEY);
          setFavoriteJobs(new Set());
          break;

        case 'favoriteEmployer':
          await AsyncStorage.removeItem(FAVORITE_EMPLOYERS_KEY);
          setFavoriteEmployers(new Set());
          break;

        case 'hiddenJob':
          await AsyncStorage.removeItem(HIDDEN_JOBS_KEY);
          setHiddenJobs(new Set());
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    favoriteJobs,
    favoriteEmployers,
    hiddenJobs,
    favoriteJob,
    favoriteEmployer,
    hideJob,
    clearBookmarks,
  };
  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useJobBookmarks() {
  const context = useContext(BookmarkContext);

  if (context === undefined) {
    throw new Error('useJobBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
