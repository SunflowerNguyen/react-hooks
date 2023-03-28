import { useEffect, useRef, useState } from "react"

const useEffectOnce = (callback: Function, when: boolean) => {
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [callback, when]);
}

export const UseEffectOnce = () => {
  const [clicked, setClicked] = useState(false);
  useEffectOnce(() => {
    console.log('mounted!');
  },clicked);

  return <button onClick={() => setClicked(true)}>Click Me</button>
}