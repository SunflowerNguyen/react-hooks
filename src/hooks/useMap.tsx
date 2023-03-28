import { useEffect, useMemo, useRef, useState } from "react";

const useMap = (initialValue: any) => {
  const [map, setMap] = useState(new Map<any, any>(initialValue));

  const actions = useMemo(
    () => ({
      set: (key: any, value: any) => {
        setMap(prevMap => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        })
      },
      remove: (key: any) => {
        setMap(prevMap => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key);
          return nextMap;
        })
      },
      clear: () => setMap(new Map())
    }),
    [setMap]
  );

  return [map, actions] as const ;
}

export const UseMap = () => {
  const [map, {set, remove, clear}] = useMap([['apples', 10]]);
  console.log({map});
  return (
    <div>
      <button onClick={() => set(Date.now(), new Date().toJSON())}>Add</button>
      <button onClick={() => clear()}>Reset</button>
      <button onClick={() => remove('apples')} disabled={!map.has('apples')}>Remove apples</button>
    </div> 
  )
}
