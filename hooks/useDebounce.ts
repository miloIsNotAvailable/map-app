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
 return debounce   
}