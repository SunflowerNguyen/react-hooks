import { useLayoutEffect, useState } from "react"

const useBodyScrollLock = () => {
  useLayoutEffect((): any => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
}

const Modal = ({ onClose }: { onClose: any }) => {
  useBodyScrollLock()

  return (
    <div
      style={{ zIndex: 100, background: 'rgba(0,0,0,0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <p
        style={{ padding: 8, borderRadius: 8, background: '#fff', color: 'black' }}
        onClick={onClose}
      >
        Scroll locked <br /> Click me to unlock
      </p>
    </div>
  )
}

export const UseBodyScrollLock = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      style={{ height: '400vh',width: '100%', textAlign: 'center', paddingTop: 100, background: 'linear-gradient(to bottom, #1fa2ff, #12d8fa, #a6ffcb)' }}
    >
      <button onClick={() => setModalOpen(true)}>
        Open modal
      </button>
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

/**
 * Enables body scroll locking
 * 
 * - Use the `useLayoutEffect` with an empty array as the second argument to execute the provided callback when the component is mounted.
 * - Use the `window.getComputedStyle` to get the overflow value of the `body` element and store it in a value
 * - Replace the overflow value of the body element with hidden and restore it to its original value when unmounting.
 */