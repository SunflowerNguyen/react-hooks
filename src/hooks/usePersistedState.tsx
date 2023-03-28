/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

export const usePersistedState = (name: string, defaultValue: any) => {
  const [value, setValue] = useState(defaultValue)
  const nameRef = useRef(name);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name);
      if (storedValue !== null) setValue(storedValue);
      else localStorage.setItem(name, defaultValue);
    } catch {
      setValue(defaultValue);
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
}

export const PersistedStateComponent = ({ name }: { name: string }) => {
  const [val, setVal] = usePersistedState(name, 10);
  return (
    <input type="text" value={val} onChange={e => { setVal(e.target.value); }} />
  )
}

export const UsePersistedState = () => {
  const [name, setName] = useState('my-value');

  return (
    <>
      <PersistedStateComponent name={name} />
      <input type="text" value={name} onChange={e => {
        setName(e.target.value);
      }} />
    </>
  )
}

/**
 * Returns a stateful value, persisted in localStagare, and a function to update it
 * 
 * - Use the useState() hook to initialize the value to defaultValue
 * - Use the useRef() hook to create a ref that will hold the name of the value in window.localStogare
 * - Use 3 instances of useEffect() hook for initialization value change and name change respectively
 * - When the component is first mounted, use Storage.getItem() to update value if there's a stored value or Storage.setItem to persist the current value
 * - When value is updated, use Storage.setItem() to store a new value
 * - When name is updated, use Storage.setItem() to create a new key, update the nameRef and use Storage.removeItem() to remove the precious key from window.localStorage
 */