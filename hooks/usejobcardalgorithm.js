export default function useJobCardAlgorithm(jobs, userData) {
  const userDataArray = Object.values(userData).map((value) => value.toString().toLowerCase());
  const jobsWithRanks = initRanks(jobs);
  jobsWithRanks.map((job) => {
    userDataArray.forEach((userDataPart) => calculateRank(job, userDataPart));
    return job;
  });

  const filteredJobs = jobsWithRanks.filter((j) => j.jobAdvertisement.rank !== 0);
  filteredJobs.sort((a, b) => b.jobAdvertisement.rank - a.jobAdvertisement.rank);
  return filteredJobs;
}

const filterFields = [
  { name: 'title', rank: 20 },
  { name: 'location', rank: 20 },
  { name: 'organization', rank: 20 },
  { name: 'region', rank: 15 },
  { name: 'taskArea', rank: 15 },
  { name: 'employment', rank: 15 },
  { name: 'employmentType', rank: 15 },
];

const calculateRank = (job, userData) => {
  filterFields.forEach((field) => {
    const match = job.jobAdvertisement[field.name]?.toLowerCase().includes(userData);
    if (match) job.jobAdvertisement.rank += field.rank;
  });
};

const initRanks = (jobs) =>
  jobs.map((job) => ({
    ...job,
    jobAdvertisement: { ...job.jobAdvertisement, rank: 0 },
  }));
