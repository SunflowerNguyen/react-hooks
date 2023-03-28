import { useEffect, useState } from "react"

const useWindowSize = () => {
  const [ windowSize, setWindowSize ] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener('resize', handleSize);

    handleSize();

    return () => {
      window.removeEventListener('resize', handleSize);
    }
  }, []);

  return windowSize;
}

export const UseWindowSize = () => {
  const { width, height } = useWindowSize();

  return (
    <p>Window size: ({width} x {height})</p>
  )
}

/**
 * Tracks the dimensions of the browser window
 * - Use the useState to initialze a state variable what will hold the window's dimensions. Initialize with both values set to 0 to avoid mismatch between sever and client renders
 * - Create a function that uses window.innerWith and window.innerheight to update the state variable
 * - Use the useEffect hook to set an appropriate listener for the 'resize' event on mount and clean it up when unmouting
 */