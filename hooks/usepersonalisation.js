import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useOnboarding } from './useonboarding';

export const LANGUAGE_KEY = 'language';
export const LOCATION_KEY = 'location';
export const TASK_KEY = 'task';

const PersonalisationContext = createContext();

export function PersonalisationProvider({ children }) {
  const { onboardingDone } = useOnboarding();
  const [items, setItems] = useState({});

  useEffect(() => {
    (async () => {
      if (!onboardingDone) return;

      try {
        const values = await AsyncStorage.multiGet([LANGUAGE_KEY, LOCATION_KEY, TASK_KEY]);
        const personalisationItems = Object.fromEntries(parseValues([...values])); // Convert values to an array
        setItems(personalisationItems);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [onboardingDone]);

  return (
    <PersonalisationContext.Provider value={items}>{children}</PersonalisationContext.Provider>
  );
}

export function usePersonalisation() {
  const context = useContext(PersonalisationContext);
  if (context === undefined) {
    throw new Error('PersonalisationContext not found');
  }
  return context;
}

function parseValues(values) {
  return values.map(([key, value]) => {
    if (key === LANGUAGE_KEY) {
      return [key, value];
    } else {
      return [key, parseTaskNumbers(value)];
    }
  });
}

function parseTaskNumbers(value) {
  if (value) {
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      } else if (typeof parsedValue === 'string') {
        return [parsedValue]; // Convert the single task ID to an array
      }
      console.error('Invalid task number format:', parsedValue);
    } catch (error) {
      console.error('Error parsing task numbers:', error);
    }
  }
  return [];
}
