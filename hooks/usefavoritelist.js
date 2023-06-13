import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext, useContext } from 'react';
const KEY = 'favoritelist';
const FavoriteListContext = createContext({
  favorites: { jobs: [], employers: [] },
  updateFavorites: () => {},
});

console.log(FavoriteListContext);
export function FavoriteListProvider({ children }) {
  const [favorites, setFavorites] = useState({ jobs: [], employers: [] });

  const updateFavorites = async () => {
    const list = await getStoredList();
    setFavorites(list);
  };

  useEffect(() => {
    (async () => {
      const list = await getStoredList();
      setFavorites(list);
      console.log(list.id);
    })();
  }, []);
  const value = { favorites: favorites, updateFavorites };
  return <FavoriteListContext.Provider value={value}>{children}</FavoriteListContext.Provider>;
}

export function useFavoriteList() {
  const context = useContext(FavoriteListContext);

  if (context === undefined) {
    throw new Error('useFavoriteList must be used within a FavoriteListProvider');
  }
  return context;
}

export async function getStoredList() {
  try {
    const item = await AsyncStorage.getItem(KEY);
    const list = item ? JSON.parse(item) : { jobs: [], employers: [] };
    return list;
  } catch (e) {
    return { jobs: [], employers: [] };
  }
}
export async function updateStoredList(type, item, publication, link) {
  const storedList = await getStoredList();
  const mergedList = await mergeLists(type, item, publication, link, storedList);
  await AsyncStorage.setItem(KEY, JSON.stringify(mergedList));
}

export async function clearStoredList(type) {
  const storedList = await getStoredList();
  if (type === 'job') {
    const clearedList = { jobs: [], employers: storedList.employers };
    await AsyncStorage.setItem(KEY, JSON.stringify(clearedList));
  } else if (type === 'employer') {
    const clearedList = { jobs: storedList.jobs, employers: [] };
    await AsyncStorage.setItem(KEY, JSON.stringify(clearedList));
  }
}

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
