import { useEffect, useRef, useState } from "react"

const usePrevious = (value: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export const UsePrevious = () => {
  const [value, setValue] = useState(0);
  const lastValue = usePrevious(value);

  return (
    <div>
      <p>Current: {value} - Previous: {lastValue}</p> 

      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  )
}