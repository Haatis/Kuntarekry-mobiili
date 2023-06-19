export default function useJobCardAlgorithm(jobs, userData) {
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

  const userDataArray = [
    ...Object.values(userData).map((value) => {
      if (typeof value === 'object' && value !== null && 'name' in value) {
        return value.name.toString().toLowerCase();
      }
      return value.toString().toLowerCase();
    }),
    ...locationNamesArray,
    ...taskNamesArray,
  ];

  const uniqueUserDataArray = [...new Set(userDataArray)];

  const jobsWithRanks = initRanks(jobs);

  jobsWithRanks.map((job) => {
    uniqueUserDataArray.forEach((userDataPart) => calculateRank(job, userDataPart));
    return job;
  });

  const filteredJobs = jobsWithRanks.filter((j) => j.jobAdvertisement.rank !== 0);
  filteredJobs.sort((a, b) => b.jobAdvertisement.rank - a.jobAdvertisement.rank);

  //console.log('Rankings:');
  filteredJobs.forEach((job) => {
    //console.log(`Job: ${job.jobAdvertisement.title}, Rank: ${job.jobAdvertisement.rank}`);
  });

  return filteredJobs;
}
const filterFields = [
  { name: 'location', rank: 10 },
  { name: 'region', rank: 10 },
  { name: 'taskArea', rank: 20 },
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
