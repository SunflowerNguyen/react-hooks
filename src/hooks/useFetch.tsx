import { useEffect, useState } from "react"

const useFetch = (url: string, options: object = {}) => {
  const [response, setReponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [abort, setAbort] = useState<any>(() => {});

  useEffect(() => {
    const abortController = new AbortController();
    const abort_ = () => abortController.abort;
    const fetchData = async () => {
      try {
        const signal = abortController.signal;
        setAbort(abort_);
        const res = await window.fetch(url, {...options, signal}).catch(() => {
          if (abortController.signal.aborted) {
            console.log('The user aborted the request');
          } else {
            console.error('the request failed');
          }
        });
        const json = await res?.json();
        setReponse(json);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();

    return () => {
      abort_();
    }
  }, []);

  return { response, error, abort };
}

export const UseFetch = () => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random');
  if (!res.response) {
    return <div>Loading...</div>
  }
  const imageUrl = res.response?.message;
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height={400} />
    </div>
  )
}

/**
 * Implement `fetch` in a declarative manner
 * - Create a custom hook that takes a `url` and `options`
 * - Use the `useState` hook to initialize the reponse, error, abort state variables
 * - Use the `useEffect` hook to asynchronously call `fetch` and update the state variables accordingly
 * - Create and use an AbortController to allow aborting the request. Use it to cancel the request when the component unmounts.
 * - Return an object containing the reponse, error, and abort state variables.
 */