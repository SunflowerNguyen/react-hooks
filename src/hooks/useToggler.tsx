import { useCallback, useState } from "react"

const useToggler = (initailState: any) => {
  const [value, setValue] = useState<boolean>(initailState);

  const toggleValue = useCallback(() => setValue(prev => !prev), []);
  return  [value, toggleValue] as const;
}

export const UseToggler = () => {
  const [val, toggleVal] = useToggler(false);
  return <button onClick={toggleVal}>{ val ? 'ON' : 'OFF' }</button>
}