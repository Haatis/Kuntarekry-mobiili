export default function useSearchJobs(jobs, searchQuery) {
  const searchQueryArray = searchQuery
    .trim()
    .split(' ')
    .map((query) => query.toLowerCase());
  const jobsWithRanks = initRanks(jobs);

  jobsWithRanks.map((job) => {
    searchQueryArray.forEach((queryPart) => calculateRank(job, queryPart));
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
  { name: 'employment', rank: 15 },
  { name: 'employmentType', rank: 15 },
];

const calculateRank = (job, query) => {
  filterFields.forEach((field) => {
    const match = job.jobAdvertisement[field.name]?.toLowerCase().includes(query);
    if (match) job.jobAdvertisement.rank += field.rank;
  });
};

const initRanks = (jobs) =>
  jobs.map((job) => ({
    ...job,
    jobAdvertisement: { ...job.jobAdvertisement, rank: 0 },
  }));
