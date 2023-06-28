import { useState, useContext, useEffect } from 'react';
import AuthContext from '../hooks/useauth';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useJobTasks } from '../hooks/usejobtasks';
import { useJobBookmarks } from './usejobbookmarks';

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

function useJobCardAlgorithm() {
  const { jobs } = useJobAdvertisements();
  const { tasks } = useJobTasks();
  const { userData } = useContext(AuthContext);
  const { favoriteJobs, hiddenJobs } = useJobBookmarks();
  const [updatedJobs, setUpdatedJobs] = useState([]);

  const removedJobsIDs = new Set([...favoriteJobs, ...hiddenJobs]);
  // Remove favorited and hidden jobs from jobs
  const filteredJobs = jobs.filter((job) => {
    return !removedJobsIDs.has(job.jobAdvertisement.id);
  });

  useEffect(() => {
    if (!jobs || !userData || !tasks) {
      return;
    }
    if (jobs.length === 0 || userData.length === 0 || tasks.length === 0) {
      return;
    }

    function getParentTaskArea(taskAreaName, tasks) {
      const taskArea = tasks.find((task) => task.name === taskAreaName);
      if (taskArea && taskArea.parent) {
        const parentTaskArea = tasks.find((task) => task.id === taskArea.parent);
        if (parentTaskArea) {
          return parentTaskArea.name;
        }
      }
      return null;
    }
    //  console.log(removedJobsIDs);
    const jobsWithRanks = initRanks(filteredJobs);

    const rankedJobs = jobsWithRanks.map((job) => {
      const matchedFields = {};
      const rank = calculateRank(job, userData, tasks, matchedFields, getParentTaskArea);
      return { ...job, jobAdvertisement: { ...job.jobAdvertisement, rank } };
    });

    const sortedJobs = rankedJobs.sort((a, b) => b.jobAdvertisement.rank - a.jobAdvertisement.rank);

    const updatedJobs = calculateMatchPercentage(sortedJobs, userData);
    setUpdatedJobs(updatedJobs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, userData, tasks]);

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
  if (userData.title && userData.title.length > 0) {
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
  { name: 'title', rank: 5 },
];

const calculateRank = (job, userData, tasks, matchedFields, getParentTaskArea) => {
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
    } else if (fieldName === 'employment' && userData.employment !== []) {
      fieldValues =
        userData.employment?.map((employment) => employment.toString().toLowerCase()) || [];
    } else if (fieldName === 'employmentType' && userData.employmentType !== []) {
      fieldValues =
        userData.employmentType?.map((employmentType) => employmentType.toString().toLowerCase()) ||
        [];
    } else if (fieldName === 'title' && userData.title !== '') {
      fieldValues = [userData.title?.toString().toLowerCase()];
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
