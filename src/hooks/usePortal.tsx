/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, ReactNode, useCallback, useEffect, useState } from "react"
import ReactDOM from "react-dom";

interface IPortal {
  render: Function
  remove: Function
}

const usePortal = (el: Element) => {
  const [portal, setPortal] = useState<IPortal>({
    render: () => null,
    remove: () => null
  });

  const createPortal = useCallback((el: Element) => {
    const Portal = ({ children }: { children: ReactNode }) => ReactDOM.createPortal(children, el);
    const remove = () => ReactDOM.unmountComponentAtNode(el);
    return { render: Portal, remove };
  }, []);

  useEffect((() => {
      if (el)
        portal.remove();
      const newPortal = createPortal(el);
      setPortal(newPortal);
      return () => newPortal.remove();
    }) as unknown as EffectCallback,
  [el]);

  return portal.render;
}

export const UsePortal = () => {
  const Portal = usePortal(document.getElementsByClassName('App-header')[0]!);

  return (
    <p>
      Hello world!
      <Portal>anything can inject into body from portal</Portal>
    </p>
  )
}

/**
 * Creates a portal, allowing rendering of children outside the parent component.
 * 
 * - Use the useState() hook to create a state avariable that holds the render() and remove() functions for the portal
 * - Use ReactDOM.createPortal and ReactDOM.unmountComponentAtNode() to create a portal and a function to remove it.
 * - Use the useCallback hook to wrap and memoize these functions as createPortal()
 * - Use the useEffect() to call createPortal() and update the state variable any time el's value changes
 * - Finally, return the render function of the state variable.
 */