import { useState, useContext } from 'react';
import AuthContext from '../hooks/useauth';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';

export function UpdateCardStack() {
  const jobs = useJobCardAlgorithm();
  const STACK_SIZE = 6;
  const CARDS_ADDED = 3;
  const [startOffset, setStartOffset] = useState(0);
  const endOffset = startOffset + STACK_SIZE;
  const currentItems = jobs.slice(startOffset, endOffset);

  const updateStack = (getNewCards) => {
    if (getNewCards) {
      setStartOffset((current) => current + CARDS_ADDED);
    } else {
      setStartOffset((current) => current - CARDS_ADDED);
    }
  };

  return { currentItems, updateStack };
}

export default function useJobCardAlgorithm() {
  const { jobs } = useJobAdvertisements();
  const { userData } = useContext(AuthContext);

  const locationNamesArray = userData.locationNames
    .map((location) => {
      const name = location.name ? location.name.toString().toLowerCase() : null;
      const parent = location.parent ? location.parent.toString().toLowerCase() : null;
      return [name, parent].filter(Boolean);
    })
    .flat();

  const taskNamesArray = userData.taskNames
    .map((task) => {
      const name = task.name ? task.name.toString().toLowerCase() : null;
      const parent = task.parent ? task.parent.toString().toLowerCase() : null;
      return [name, parent].filter(Boolean);
    })
    .flat();

  const employmentArray = userData.employment
    ? userData.employment.map((employment) => employment.toString().toLowerCase())
    : [];

  const userDataArray = [...locationNamesArray, ...taskNamesArray, ...employmentArray];
  //console.log('userDataArray', userDataArray);

  const uniqueUserDataArray = [...new Set(userDataArray)];

  const jobsWithRanks = initRanks(jobs);

  const rankedJobs = jobsWithRanks.map((job) => {
    const rank = uniqueUserDataArray.reduce((acc, userDataPart) => {
      return acc + calculateRank(job, userDataPart);
    }, 0);
    return { ...job, jobAdvertisement: { ...job.jobAdvertisement, rank } };
  });

  const sortedJobs = rankedJobs.sort((a, b) => b.jobAdvertisement.rank - a.jobAdvertisement.rank);

  //console.log('Rankings:');
  // sortedJobs.forEach((job) => {
  //  console.log(
  //   `${job.jobAdvertisement.profitCenter},  ${job.jobAdvertisement.title}, Rank: ${job.jobAdvertisement.rank}`
  // );
  //});

  return sortedJobs;
}

const filterFields = [
  { name: 'location', rank: 10 },
  { name: 'region', rank: 10 },
  { name: 'taskArea', rank: 20 },
  { name: 'employment', rank: 5 },
];

const calculateRank = (job, userData) => {
  return filterFields.reduce((acc, field) => {
    const match = job.jobAdvertisement[field.name]?.toLowerCase().includes(userData);
    if (match) return acc + field.rank;
    return acc;
  }, 0);
};

const initRanks = (jobs) =>
  jobs.map((job) => ({
    ...job,
    jobAdvertisement: { ...job.jobAdvertisement, rank: 0 },
  }));
