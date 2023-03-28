import { useState } from "react"

const useMergeState = (initialState: {[key: string]: any} = {}) => {
  const [value, setValue] = useState(initialState);

  const mergeState = (newState: any) => {
    if (typeof newState === 'function') newState = newState(value);
    setValue({...value, ...newState});
  }

  return [value, mergeState] as const;
}

export const UseMergeState = () => {
  const [data, setData] = useMergeState({ name: 'John', age: 20 });
  return (
    <>
      <input type="text" value={data.name} onChange={e => setData({ name: e.target.value })} />
      <button onClick={() => setData(({ age }: { age: any }) => ({ age: age - 1 }))}>-</button>
      { data.age }
      <button onClick={() => setData(({ age }: { age: any }) => ({ age: age + 1 }))}>+</button>
    </>
  )
}