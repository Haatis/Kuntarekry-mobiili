import { createContext, useContext, useEffect, useState } from 'react';
import { API_CLIENT, API_URL } from '@env';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const JOBS_URI = FileSystem.cacheDirectory + 'jobs';
const JOBS_LAST_UPDATED_KEY = 'jobs_last_updated';

const JobAdvertisementContext = createContext({ jobs: [] });

export function JobAdvertisementProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchInitialJobs = async () => {
        const jobAds = await fetchJobAdvertisements();
        setJobs(jobAds);
        await writeJobsToStorage(jobAds);
        await updateJobLastUpdatedTimestamp();
      };

      const fetchUpdatedJobs = async (storedJobs) => {
        const lastUpdated = await AsyncStorage.getItem(JOBS_LAST_UPDATED_KEY);
        const timestamp = dayjs(lastUpdated).format('YYYY-MM-DDTHH:mm:ss');
        const updatedJobs = await fetchJobAdvertisements(timestamp);
        if (!updatedJobs) return;

        const mergedJobs = mergeJobs(storedJobs, updatedJobs);
        setJobs(mergedJobs);
        await writeJobsToStorage(mergedJobs);
        await updateJobLastUpdatedTimestamp();
      };

      try {
        const storedJobs = await readJobsFromStorage();
        if (storedJobs === null) {
          await fetchInitialJobs();
        } else {
          setJobs(storedJobs);
          await fetchUpdatedJobs(storedJobs);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const value = { jobs };
  return (
    <JobAdvertisementContext.Provider value={value}>{children}</JobAdvertisementContext.Provider>
  );
}

export function useJobAdvertisements() {
  const context = useContext(JobAdvertisementContext);
  if (context === undefined) {
    throw new Error('JobAdvertisementContext not found');
  }
  return context;
}

function mergeJobs(oldJobs, newJobs) {
  const newIds = newJobs.map((j) => j.jobAdvertisement.id);
  const filteredOldJobs = oldJobs.filter((job) => !newIds.includes(job.jobAdvertisement.id));
  const mergedJobs = filteredOldJobs
    .concat(newJobs)
    .filter((j) => dayjs(j.jobAdvertisement.publicationEnds).isAfter(dayjs()));
  // Last updated first
  mergedJobs.sort(
    (a, b) =>
      dayjs(b.jobAdvertisement.changetime).unix() - dayjs(a.jobAdvertisement.changetime).unix()
  );
  return mergedJobs;
}

async function updateJobLastUpdatedTimestamp() {
  const currentTimestamp = dayjs().format('YYYY-MM-DDTHH:mm:ss');
  await AsyncStorage.setItem(JOBS_LAST_UPDATED_KEY, currentTimestamp);
}

/**
 * @param timestamp {string|undefined} - YYYY-MM-DDTHH:mm:ss formatted date
 */
async function fetchJobAdvertisements(timestamp) {
  const url = new URL('/portal-api/recruitment/open-jobs', API_URL);
  url.searchParams.append('client', API_CLIENT);
  if (timestamp) {
    url.searchParams.append('timestamp', timestamp);
  }
  const res = await fetch(url.toString());
  const jobsJson = await res.json();
  return jobsJson.jobAdvertisements;
}

async function writeJobsToStorage(jobs) {
  await FileSystem.writeAsStringAsync(JOBS_URI, JSON.stringify(jobs));
}

async function readJobsFromStorage() {
  try {
    const jobsString = await FileSystem.readAsStringAsync(JOBS_URI);
    return JSON.parse(jobsString);
  } catch (error) {
    return null;
  }
}
