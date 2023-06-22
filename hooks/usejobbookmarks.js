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
      let newJobIDs;
      if (item !== null) {
        const currentJobIDs = new Set(JSON.parse(item));
        if (currentJobIDs.has(id)) {
          // Remove from favorites
          newJobIDs = new Set([...currentJobIDs]);
          newJobIDs.delete(id);
        } else {
          newJobIDs = new Set([...currentJobIDs, id]);
        }
        await AsyncStorage.setItem(FAVORITE_JOBS_KEY, JSON.stringify([...newJobIDs]));
      } else {
        newJobIDs = new Set([id]);
        await AsyncStorage.setItem(FAVORITE_JOBS_KEY, JSON.stringify([id]));
      }
      const favoriteJobs = jobs.filter((j) => newJobIDs.has(j.jobAdvertisement.id));
      setFavoriteJobs(favoriteJobs);
    } catch (error) {
      console.error(error);
    }
  };

  const favoriteEmployer = async (id) => {
    try {
      const item = await AsyncStorage.getItem(HIDDEN_JOBS_KEY);
      if (item !== null) {
        const currentJobs = JSON.parse(item);
        const newJobs = new Set([...currentJobs, id]);
        await AsyncStorage.setItem(HIDDEN_JOBS_KEY, JSON.stringify([...newJobs]));
        setHiddenJobs(newJobs);
      } else {
        await AsyncStorage.setItem(HIDDEN_JOBS_KEY, JSON.stringify([id]));
        setHiddenJobs(new Set([id]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideJob = async (id) => {
    try {
      const item = await AsyncStorage.getItem(HIDDEN_JOBS_KEY);
      if (item !== null) {
        const currentJobs = JSON.parse(item);
        const newJobs = new Set([...currentJobs, id]);
        await AsyncStorage.setItem(HIDDEN_JOBS_KEY, JSON.stringify([...newJobs]));
        setHiddenJobs(newJobs);
      } else {
        await AsyncStorage.setItem(HIDDEN_JOBS_KEY, JSON.stringify([id]));
        setHiddenJobs(new Set([id]));
      }
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

  async function mergeLists(type, item, publication, link, storedList) {
    const mergedList = { ...storedList };
    if (type === 'job') {
      const jobIndex = storedList.jobs.findIndex((job) => job.id === item.id);
      if (jobIndex !== -1) {
        mergedList.jobs.splice(jobIndex, 1);
      } else {
        mergedList.jobs.push({ ...item, publication, link }); // add publication and link to the job object
      }
    } else if (type === 'employer') {
      const employerIndex = storedList.employers.findIndex((employer) => employer === item);
      if (employerIndex !== -1) {
        mergedList.employers.splice(employerIndex, 1);
      } else {
        mergedList.employers.push(item);
      }
    }
    return mergedList;
  }

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
          const parsedJobs = new Set(JSON.parse(storedHiddenJobs));
          setHiddenJobs(parsedJobs);
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
