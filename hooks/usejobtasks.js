import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL, API_CLIENT } from '@env';
import { addParentToChilds, flattenItems } from '../utils/hookutils';

const JobTaskContext = createContext();

export function JobTaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchRegions = async () => {
        try {
          const url = new URL('/portal-api/recruitment/params/hierarchy/tasks', API_URL);
          url.searchParams.append('client', API_CLIENT);
          const json = await (await fetch(url.toString())).json();
          const flattenedTasks = flattenItems(addParentToChilds(json.tasks));
          setTasks(flattenedTasks);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRegions();
    })();
  }, []);

  const value = { tasks };
  return <JobTaskContext.Provider value={value}>{children}</JobTaskContext.Provider>;
}

export function useJobTasks() {
  const context = useContext(JobTaskContext);
  if (context === undefined) {
    throw new Error('JobLocationContext not found');
  }
  return context;
}
