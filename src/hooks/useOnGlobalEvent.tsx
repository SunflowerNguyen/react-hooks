import { useEffect, useRef } from "react"

interface IPreviousProps {
  type: string
  options: any
}

const useOnGlobalEvent = (type: string, callback: EventListenerOrEventListenerObject, options: any) => {
  const listener = useRef<EventListener | null>(null);
  const previousProps = useRef<IPreviousProps>({ type, options });

  useEffect(() => {
    const { type: previousType, options: previousOptions } = previousProps.current;

    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions
      );
    };

    listener.current = window.addEventListener(type, callback, options)!;
    previousOptions.current = { type, options }

    return () => {
      window.removeEventListener(type, listener.current!, options);
    }
  }, [callback, type, options]);
}

export const UseOnGlobalEvent = () => {
  useOnGlobalEvent(
    'mousemove',
    ((e: MouseEvent) => {
    console.log(`${e.x}, ${e.y}`);
  }) as EventListener, {});

  return <p>Move your mouse around</p>
}

/**
 * Executes a callback whenever an event occurs on the global object
 * - Use the `useRef` hook to create a variable, `listener`, which will hold the listener reference.
 * - Use the `useRef` hook to create a variable that will hold the previous values of the type and options arguments
 * - Use the `useEffect` hook and `EventTarget.addEventListener` to listen to the given event `type` on the Window global object
 * - Use the removeEventListener to remove any existing listeners and clean up when the component unmounts.
 */