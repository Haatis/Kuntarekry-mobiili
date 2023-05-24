import { createContext, useContext } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children, selectedFilters }) {
  return <FilterContext.Provider value={{ selectedFilters }}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('FilterContext not found');
  }
  return context;
}
