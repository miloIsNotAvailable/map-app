import { useCallback } from "react";

export const debounce = ( 
    fn: ( ...args: any ) => void, 
    delay: number
) => {
    let timerId: ReturnType<typeof setTimeout>
    return (...args: any) => {
      clearTimeout( timerId );
      timerId = setTimeout(() => fn(...args), delay);
    }
  };

export const useDebounce = () => {
 
  return ( fn: (...args: any ) => void, time=1000 ) => useCallback( debounce( fn, time ), [] )
}