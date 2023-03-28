import { useEffect, useRef, useState } from "react"

export const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id)
    }
  }, [delay])
}

export const UseInterval = () => {
  const [seconds, setSeconds] = useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000)

  return (
    <>
      <p>{ seconds }</p>
    </>
  )
}

/**
 * - Create a custom hook that takes a callback and a delay
 * - Use the useRef() hook to create a ref for the callback function
 * - Use a useEffect() hook to remember the latest callback when ever it changes
 * - Use a useEffect() hook dependent on delay to set up the interval and clean up
 */