import { useCallback, useEffect, useState } from "react";

const useError = (err?: Error) => {
  const [error, setError] = useState(err);
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const dispatchError = useCallback((err: Error) => {
    setError(err);
  }, []);

  return dispatchError;
}

export const UseError = () => {
  const dispatchError = useError();

  const clickHandler = () => {
    dispatchError(new Error('Error!'));
  }

  return <button onClick={clickHandler}>Throw error</button>
}