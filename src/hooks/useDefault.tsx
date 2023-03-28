import { useState } from "react"

const useDefault = (defaultState: any, initialState: any) => {
  const [value, setValue] = useState(initialState);
  const isValueEmpty = value === undefined || value === null;
  return [isValueEmpty ? defaultState : value, setValue];
}

export const UseDefault = () => {
  const [user, setUser] = useDefault({ name: 'Adman' }, { name: 'Koi' });

  return (
    <>
      <div>User: {user.name}</div>
      <input type="text" onChange={e => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)}>Clear</button>
    </>
  )
}