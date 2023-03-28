import { useCallback, useEffect, useRef, useState } from "react"

const useEventListener = (type: string, handler: Function, el = window) => {
  const savedHandler = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: any) => savedHandler.current(e);
    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    }
  }, [type, el]);
}

export const UseEventListener = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const updateCoords = useCallback(
    ({ clientX, clientY }: { clientX: any, clientY: any }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  useEventListener('mousemove', updateCoords);

  return <p>Mouse coordinates: {coords.x}, {coords.y}</p>
}