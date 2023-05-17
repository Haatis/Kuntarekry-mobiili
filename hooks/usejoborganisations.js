import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL, API_CLIENT } from '@env';

const JobOrganisationContext = createContext();

export function JobOrganisationProvider({ children }) {
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchRegions = async () => {
        try {
          const url = new URL('/portal-api/recruitment/params/organisations', API_URL);
          url.searchParams.append('client', API_CLIENT);
          const json = await (await fetch(url.toString())).json();
          setOrganisations(json.units);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRegions();
    })();
  }, []);

  const value = { organisations };
  return (
    <JobOrganisationContext.Provider value={value}>{children}</JobOrganisationContext.Provider>
  );
}

export function useJobOrganisations() {
  const context = useContext(JobOrganisationContext);
  if (context === undefined) {
    throw new Error('JobOrganisationContext not found');
  }
  return context;
}
