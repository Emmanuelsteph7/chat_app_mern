import { useEffect, useState } from 'react';

/**
 *
 * This is used to get the debounced value.
 * It can be used in search functionalities etc.
 * @param value
 * @param delay
 * @returns
 *  the debounced value
 */
const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
