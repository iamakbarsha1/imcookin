import { useEffect, useRef } from "react";

/**
 * Custom hook for debouncing a function call.
 *
 * @param {Function} callback - The function to be debounced.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
const useDebounce = (callback, delay) => {
  // useRef to store the timeout ID
  const timeoutRef = useRef(null);

  /**
   * Debounced function that clears the previous timeout and sets a new one.
   *
   * @param {...*} args - The arguments to pass to the callback function.
   */
  const debounce = (...args) => {
    // Clear the previous timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to call the callback function after the specified delay
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // useEffect to clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Return the debounced function
  return debounce;
};

export default useDebounce;
