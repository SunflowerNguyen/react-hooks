import { useCallback, useRef, useState } from "react"

export const useHover = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);

  const nodeRef = useRef<HTMLDivElement>();
  const callbackRef = useCallback(
    (node: HTMLDivElement) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener('mouseover', handleMouseOver);
        nodeRef.current.removeEventListener('mouseout', handleMouseOut);
      }
      nodeRef.current = node;

      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', handleMouseOver);
        nodeRef.current.addEventListener('mouseout', handleMouseOut);
      }
    }, [handleMouseOver, handleMouseOut]
  );
  
  return [callbackRef, isHovering] as const;
}

export const UseHover = () => {
  const [callbackRef, isHovering] = useHover();

  return (
    <div ref={callbackRef}>
      { isHovering ? 'Hovering' : 'Not hovering' }
    </div>
  )
}