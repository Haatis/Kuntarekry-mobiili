import { useState, useContext } from 'react';
import AuthContext from '../hooks/useauth';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useJobTasks } from '../hooks/usejobtasks';

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
  const { tasks } = useJobTasks();
  const { userData } = useContext(AuthContext);

  if (!jobs || !userData || !tasks) {
    return []; // Return an empty array if jobs, userData, or tasks is undefined or null
  }
  if (jobs.length === 0 || userData.length === 0 || tasks.length === 0) {
    return []; // Return an empty array if jobs, userData, or tasks is empty
  }
  const jobsWithRanks = initRanks(jobs);

  // Function to retrieve the parent task area based on taskArea name
  function getParentTaskArea(taskAreaName, tasks) {
    const taskArea = tasks.find((task) => task.name === taskAreaName);
    if (taskArea && taskArea.parent) {
      const parentTaskArea = tasks.find((task) => task.id === taskArea.parent);
      if (parentTaskArea) {
        return parentTaskArea.name;
      }
    }
    return null; // No parent task area found
  }

  const rankedJobs = jobsWithRanks.map((job) => {
    const matchedFields = {}; // Reset the matchedFields object for each job
    const rank = calculateRank(job, userData, tasks, matchedFields, getParentTaskArea); // Pass the tasks array and getParentTaskArea function to calculateRank
    return { ...job, jobAdvertisement: { ...job.jobAdvertisement, rank } };
  });

  const sortedJobs = rankedJobs.sort((a, b) => b.jobAdvertisement.rank - a.jobAdvertisement.rank);

  //console.log('Rankings:');
  //sortedJobs.forEach((job) => {
  //  console.log(
  //    `${job.jobAdvertisement.profitCenter},  ${job.jobAdvertisement.title}, Rank: ${job.jobAdvertisement.rank}`
  //   );
  // });

  const updatedJobs = calculateMatchPercentage(sortedJobs, userData);

  return updatedJobs;
}

const calculateMatchPercentage = (jobs, userData) => {
  let maxPoints = 0;
  if (userData.locationNames && userData.locationNames.length > 0) {
    maxPoints += 20;
  }
  if (userData.taskNames && userData.taskNames.length > 0) {
    maxPoints += 20;
  }
  if (userData.employment && userData.employment.length > 0) {
    maxPoints += 5;
  }
  if (userData.employmentType && userData.employmentType.length > 0) {
    maxPoints += 5;
  }

  const updatedJobs = jobs.map((job) => {
    const matchPercentage = Math.round((job.jobAdvertisement.rank / maxPoints) * 100);
    return { ...job, jobAdvertisement: { ...job.jobAdvertisement, percentage: matchPercentage } };
  });

  //updatedJobs.forEach((job) => {
  // console.log(
  //   `${job.jobAdvertisement.profitCenter}, ${job.jobAdvertisement.title}, Rank: ${job.jobAdvertisement.rank}, Percentage: ${job.jobAdvertisement.percentage}%`
  // );
  //});

  return updatedJobs;
};

const filterFields = [
  { name: 'location', rank: 10 },
  { name: 'region', rank: 10 },
  { name: 'taskArea', rank: 15 },
  { name: 'taskAreaParent', rank: 5 }, // Added 'taskAreaParent' with a rank of 30
  { name: 'employment', rank: 5 },
  { name: 'employmentType', rank: 5 },
];

const calculateRank = (job, userData, tasks, matchedFields, getParentTaskArea) => {
  // Pass the tasks array as a parameter
  return filterFields.reduce((acc, field) => {
    const fieldName = field.name;
    let fieldValues = [];

    if (fieldName === 'location') {
      fieldValues =
        userData.locationNames?.map((location) => location.name?.toString().toLowerCase()) || [];
    } else if (fieldName === 'region') {
      fieldValues =
        userData.locationNames?.map((location) => location.parent?.toString().toLowerCase()) || [];
    } else if (fieldName === 'taskArea') {
      fieldValues = userData.taskNames?.map((task) => task.name?.toString().toLowerCase()) || [];
    } else if (fieldName === 'taskAreaParent') {
      const userParentTaskAreas =
        userData.taskNames
          ?.filter((task) => task.parent) // Filter out tasks without a parent
          .map((task) => task.parent?.toString().toLowerCase()) || [];

      const jobParentTaskArea = getParentTaskArea(job.jobAdvertisement.taskArea, tasks);
      const matchParent = userParentTaskAreas.includes(jobParentTaskArea?.toLowerCase());

      if (matchParent && !matchedFields[fieldName]) {
        matchedFields[fieldName] = true;
        return acc + field.rank;
      }

      return acc;
    } else if (fieldName === 'employment') {
      fieldValues =
        userData.employment?.map((employment) => employment.toString().toLowerCase()) || [];
    } else if (fieldName === 'employmentType') {
      fieldValues =
        userData.employmentType?.map((employmentType) => employmentType.toString().toLowerCase()) ||
        [];
    }

    const match = fieldValues.some((fieldValue) =>
      job.jobAdvertisement[fieldName]?.toLowerCase().includes(fieldValue)
    );

    if (match && !matchedFields[fieldName]) {
      matchedFields[fieldName] = true;
      return acc + field.rank;
    }

    return acc;
  }, 0);
};
const initRanks = (jobs) =>
  jobs.map((job) => ({
    ...job,
    jobAdvertisement: { ...job.jobAdvertisement, rank: 0 },
  }));
