import { useEffect, useRef, useState } from "react"

const useRequestAnimationFrame = (callback: Function) => {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const animate = (time: number) => {
    if (previousTimeRef.current) callback(time - previousTimeRef.current);
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
}

export const UseRequestAnimationFrame = () => {
  const [count, setCount] = useState(0);

  useRequestAnimationFrame((deltaTime: number) => {
    console.log(deltaTime);
    setCount(preCount => (preCount + deltaTime * 0.01) % 100)
  });

  return <p>{ Math.round(count) }</p>;
}

/**
 * Runs an animating function, calling it before every repaint
 * 
 * - Use the useRef() hook to create two variables, requestRef will hold the last request id and previousTimeRef will hold the last timestamp
 * - Define a function, animate, which handles updating these variables, runs the callback and calls window.requestAnimationFrame() perpetually.
 * - Use the useEffect() hook with an empty array to initialize the value of requestRef using Window.requestAnimationFrame. Use the return value and Window.cancelAnimationFrame() to clean up when the component unmounts.
 */