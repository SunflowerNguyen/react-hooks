/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

const useTitle = (title: any) => {
  const documentDefined = typeof document !== 'undefined';
  const originalTitle = useRef<string>(documentDefined ? document.title : '');

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle.current;
    }
  }, []);
}

const Alert = () => {
  useTitle('Alert');
  return <p>Alert! Title has change</p>
}

export const UseTitle = () => {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <button onClick={() => setAlertOpen(!alertOpen)}>Toggle alert</button>
      {alertOpen && <Alert />}
    </>
  )
}