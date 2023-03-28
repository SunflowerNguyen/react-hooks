import { useEffect, useState } from "react"

const useKeyPress = (targetKey: string | number) => {
  const [keyPress, setKeyPress] = useState<boolean>(false);

  const downHandler = ({ key }: { key: string | number }) => {
    if (key === targetKey) setKeyPress(true);
  }

  const upHandler = ({ key }: { key: string | number }) => {
    if (key === targetKey) setKeyPress(false);
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    }
  });

  return keyPress;
}

export const UseKeyPress = () => {
  const wPressed = useKeyPress('w');
  return <p>The "w" key is {!wPressed ? 'not' : ''} pressed!</p>
}

/**
 * Listens for changes in the pressed of a given key
 * - Use the useState hook to create a state variable that hooks the pressed state of  the given key
 * - Define two handler functions that update the state variable on key down or key up accordingly
 * - Use useEffect hook and EventTarget.addEventListener to handle the keydown and keyup events
 * - Use EventTarget.removeEventListener to perform cleanup after the component is unmounted.
 */