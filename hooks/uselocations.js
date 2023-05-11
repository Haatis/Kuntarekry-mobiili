import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL, API_CLIENT } from '@env';
import { flattenItems, addParentToChilds } from '../utils/hookutils';

const JobLocationContext = createContext();

export function JobLocationProvider({ children }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchRegions = async () => {
        try {
          const url = new URL('/portal-api/recruitment/params/hierarchy/locations', API_URL);
          url.searchParams.append('client', API_CLIENT);
          const json = await (await fetch(url.toString())).json();
          const locations = flattenItems(addParentToChilds(json.locations));
          setLocations(locations);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRegions();
    })();
  }, []);

  const value = { locations };
  return <JobLocationContext.Provider value={value}>{children}</JobLocationContext.Provider>;
}

export function useJobLocations() {
  const context = useContext(JobLocationContext);
  if (context === undefined) {
    throw new Error('JobLocationContext not found');
  }
  return context;
}
