import { useEffect, useRef } from "react"

const useOnWindowResize = (callback: EventListener) => {
  const listener = useRef<any>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('resize', listener.current);
    }

    listener.current = window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', listener.current)
    }
  }, [callback]);
}

export const UseOnWindowResize = () => {
  useOnWindowResize(() => {
    console.log(`window size: (${window.innerWidth}, ${window.innerHeight})`);
  });

  return <p>Resize the window and check the console</p>;
}

/**
 * Executes a callback whenever the window is resized.
 * 
 * - Use the useRef() hook to create a variable, listener, which will hold the listener reference
 * - Use the useEffect() hook and addEventListener to listen to the resize event of the window global object
 * - Use removeEventListener to remove any existing listeners and clean up when the componen unmounts.
 */