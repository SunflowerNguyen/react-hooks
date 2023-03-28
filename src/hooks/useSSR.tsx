import { useEffect, useMemo, useState } from "react";

const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window?.document?.createElement
);

const useSSR = () => {
  const [inBrowser, setInbrower] = useState(isDOMavailable);

  useEffect(() => {
    setInbrower(isDOMavailable);

    return () => {
      setInbrower(false);
    }
  }, []);

  const useSSRSObject = useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListener: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen
    }), [inBrowser]
  );

  return useMemo(
    () => ({...useSSRSObject}),
    [inBrowser]
  );
}

export const UseSSR = () => {
  const { isBrowser } = useSSR();

  return <p>{ isBrowser ? 'Running on browser' : 'Running on server' }</p>
}

/**
 * Checks if the code is running on the broswer or the server.
 * 
 * - Create a custom hook that returns an appropriate object.
 * - Use typeof, Window, Window.document and createElement to check if the code is running on ther browser.
 * - Use the useState hook to define the inBrowser state variable
 * - Use the useEffect hook to update inBrowser state variable and clean up at the end
 * - Use the `useMemo` hook to memorize the return values of the customer hook.
 */