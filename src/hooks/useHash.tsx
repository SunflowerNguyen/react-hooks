/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';

export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash)
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [])

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) window.location.hash = newHash
    },
    [hash]
  )
  
  return [hash, updateHash] as const;
}


export const UseHashComponent = () => {
  
  const [hash, setHash] = useHash();

  useEffect(() => {
    setHash('#list');
  }, [])

  return (
    <>
      <p>window.local.href: { window.location.href }</p>
      <p>Edit hash: </p>
      <input value={hash} onChange={e => setHash(e.target.value)} />
    </>
  )
}


/**
 * Tracks the browser's location hash value, and allows changing it.
 * 
 * Use the useState() hook to lazily get the hash property of the Location object
 * Use the useCallback() hook to create a handler that updates the state
 * Use the useEffect() hook to add  a listener for the 'hashchange' event when mounting and clean it up when unmouting
 * Use the useCallback() hook to create a function that updates the hash property of the Location object with the given value
 */

/**
 * 1. What is useCallback in React?
 * - useCallback is a hook that will return a memoized version of the callback function that only changes if one of the dependencies has changed.
 * 
 * 2. what is difference between useCallback and use useMemo?
 * - useCallback() can be used like useMemo(), but it memorizes functions instead of values, to prevent re-creation upon every render, which helps your applications run faster.
 * 
 * - useMemo is used when you do not want to recompute the value that the function returns. It's just that you cached the values returned from function
 * 
 * 3. Should we use useCallback everywhere?
 * - No, instead you must consider whether using useCallback() is worth the performance increase compared to increased complexity.
 * 
 * 4. Why useCallback() is used?
 * - It's useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.
 * - Simple, the useCallback hook is used when you have a component in which a child is rendering repeatedly  without the need for it. Pass a child callback and dependency array.
*/