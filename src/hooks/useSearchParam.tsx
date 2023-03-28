/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react"

export const useSearchParam = (param: string) => {
  const getValue = useCallback(
    () => new URLSearchParams(window.location.search).get(param),
    [param]
  );

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    }

    window.addEventListener('popstate', onChange);
    window.addEventListener('pushstate', onChange);
    window.addEventListener('replacestate', onChange);

    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('pushstate', onChange)
      window.removeEventListener('replacestate', onChange)
    }
  }, []);

  return value;
}

export const UseSearchParam = () => {
  const post = useSearchParam('post');

  return (
    <>
      <p>Post param value: {post || 'null'}</p>
      <button onClick={() => window.history.pushState({}, '', window.location.pathname + '?post=42')}>
        View post 42
      </button>
      <button onClick={() =>window.history.pushState({}, '', window.location.pathname)}>
        Exit
      </button>
    </>
  )
}