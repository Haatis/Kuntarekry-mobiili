import { createContext, useContext } from 'react';

const FilteredJobsContext = createContext();

export function FilteredJobsProvider({ children, filteredJobs }) {
  return (
    <FilteredJobsContext.Provider value={{ filteredJobs }}>{children}</FilteredJobsContext.Provider>
  );
}

export function useFilteredJobs() {
  const context = useContext(FilteredJobsContext);
  if (context === undefined) {
    throw new Error('FilterContext not found');
  }
  return context;
}
