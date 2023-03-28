import { useMemo, useState } from "react";

export const UseMemoEx = () => {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTrue] = useState(0);

  const incrementOne = () => {
    setCounterOne(counterOne + 1)
  }

  const incrementTwo = () => {
    setCounterTrue(counterTwo + 1)
  }

  const isEven = useMemo(() => {
    console.log(1111)
    let i = 0;
    while(i < 2000) i++;
    return counterOne % 2 === 0;
  }, [counterOne])

  return (
    <div>
      <p>useMemo Hook</p>
      <button onClick={incrementOne}>Count one - {counterOne}</button>
      <br />
      <button onClick={incrementTwo}>Count two - {counterTwo}</button>
      <br />
      <span>{ isEven ? 'Even' : 'odd' }</span>
    </div>
  )
}

export default UseMemoEx;