import { useEffect, useRef } from "react"

const useOnWindowScroll = (callback: EventListener) => {
  const listener = useRef<any>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('scroll', listener.current);
    }

    listener.current = window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', listener.current)
    }
  }, [callback])
}

export const UseOnWindowScroll = () => {
  useOnWindowScroll(() => {
    console.log(`scroll Y: ${window.scrollY}`);
  });

  return <p style={{ height: '300vh' }}>Scroll and check the console</p>
}

/**
 * Excutes a callback whenever the window is scrolled
 * 
 * - Use the `useref` hook to create a variable, listener, which will hold the listener reference
 * - Use the useEffect hook and addEventListener to listen to the scroll event of the global obect 
 * - Use the removeEventListener to remove  any existing listeners and clean up when the component unmounts.
 */