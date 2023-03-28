import { useReducer } from "react";

interface IAction {
  type: string
  value?: any
  error?: any
}

interface IState {
  loading: boolean
  value: any
  error: any
}

const useAsync = (fn: Function) => {
  const initialize: IState = { loading: false, error: null, value: null }

  const stateReducer = (_: any, action: IAction): IState | undefined => {
    switch(action.type) {
      case 'start':
        return { loading: true, error: null, value: null };
      case 'finish':
        return { loading: false, error: null, value: action.value };
      case 'error':
        return { loading: false, error: action.error, value: null };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialize);

  const run = async (args: any = null) => {
    try {
      dispatch({ type: 'start' });
      const value = await fn(args);
      dispatch({ type: 'finish', value });
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  return { ...state, run };
}

export const UseAsync = () => {
  const imgFetch = useAsync((url: string) => fetch(url).then(response => response.json()));

  const handleClick = () => imgFetch.run('https://dog.ceo/api/breeds/image/random');

  return (
    <div>
      <button onClick={handleClick} disabled={imgFetch.loading}>
        Load Image
      </button>
      <br />
      {imgFetch.loading && <div>Loading...</div>}
      {imgFetch.error && <div>Error {imgFetch.error}</div>}
      {imgFetch.value && (
        <img src={imgFetch.value.message} alt="avatar" width={400} height="auto" />
      )}
    </div>
  )
}

/**
 * Handler asynchronous calls
 * - Create a custom hook that takes a handler function, `fn`
 * - Define a reducer function and an initial state for the custom hook's state
 * - Use the `useReducer` hook to initialize the `state` variable and the `dispatch` function
 * - Define an asynchronous `run` function that will run the provided callback, `fn`, while using `dispatch` to update `state` as necessary
 * - Return an object containning the properties of state (value, error, and loading) and the run function
 */