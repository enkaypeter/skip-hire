import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * A custom React hook that persists state to localStorage.
 *
 * @param key The key to use for storing the value in localStorage.
 * @param initialValue The initial value to use if no value is found in localStorage or if parsing fails.
 * @returns A stateful value, and a function to update it, similar to useState.
 */
function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue) as T;
      }
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      if (state === undefined || state === null) {
        localStorage.removeItem(key);
      } else {
        const stringifiedValue = JSON.stringify(state);
        localStorage.setItem(key, stringifiedValue);
      }
    } catch (error) {
      console.error(`Error stringifying or setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
