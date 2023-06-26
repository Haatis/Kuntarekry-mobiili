import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext, useContext } from 'react';
import { useJobAdvertisements } from './usejobadvertisements';

const FAVORITE_JOBS_KEY = 'favoriteJobs';
const FAVORITE_EMPLOYERS_KEY = 'favoriteEmployers';
const HIDDEN_JOBS_KEY = 'hiddenJobs';

const BookmarkContext = createContext({
  favoriteJobs: new Array(),
  favoriteEmployers: new Array(),
  hiddenJobs: new Array(),
  favoriteJob: () => {},
  favoriteEmployer: () => {},
  hideJob: () => {},
  clearBookmarks: () => {},
});

export function BookmarkProvider({ children }) {
  const { jobs } = useJobAdvertisements();

  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [favoriteEmployers, setFavoriteEmployers] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);

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
      const favoriteJobs = jobs.filter((j) => currentJobIDs.has(j.jobAdvertisement.id));
      setFavoriteJobs(favoriteJobs);
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
        const newHiddenJobs = hiddenJobs.filter((j) => j.id !== id);
        setHiddenJobs(newHiddenJobs);
      } else {
        currentHiddenIDs.add(id);
        const newHiddenJob = jobs.find((j) => j.jobAdvertisement.id === id);
        setHiddenJobs((prevJobs) => [...prevJobs, newHiddenJob]);
        // If favorite list has id remove from favorites
        const favoriteItem = await AsyncStorage.getItem(FAVORITE_JOBS_KEY);
        const currentFavoriteIDs = new Set(JSON.parse(favoriteItem));
        if (currentFavoriteIDs.has(id)) {
          currentFavoriteIDs.delete(id);
          await AsyncStorage.setItem(FAVORITE_JOBS_KEY, JSON.stringify([...currentFavoriteIDs]));
          const favoriteJobs = jobs.filter((j) => currentFavoriteIDs.has(j.jobAdvertisement.id));
          setFavoriteJobs(favoriteJobs);
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

  useEffect(() => {
    (async () => {
      try {
        const storedFavoriteJobIDs = await AsyncStorage.getItem(FAVORITE_JOBS_KEY);
        if (storedFavoriteJobIDs != null) {
          const jobIDs = new Set(JSON.parse(storedFavoriteJobIDs));
          const favoriteJobs = jobs.filter((j) => jobIDs.has(j.jobAdvertisement.id));
          setFavoriteJobs(favoriteJobs);
        }
        const storedFavoriteEmployers = await AsyncStorage.getItem(FAVORITE_EMPLOYERS_KEY);
        if (storedFavoriteEmployers != null) {
          const parsedJobs = new Set(JSON.parse(storedFavoriteEmployers));
          setFavoriteEmployers(parsedJobs);
        }
        const storedHiddenJobs = await AsyncStorage.getItem(HIDDEN_JOBS_KEY);
        if (storedHiddenJobs != null) {
          const jobIDs = new Set(JSON.parse(storedHiddenJobs));
          const hiddenJobs = jobs.filter((j) => jobIDs.has(j.jobAdvertisement.id));
          setHiddenJobs(hiddenJobs);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [jobs]);

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
