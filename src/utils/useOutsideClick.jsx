import { useEffect } from 'react';

const useOutsideClick = (ref1, ref2, setState) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref1.current &&
        ref2.current &&
        !ref1.current.contains(event.target) &&
        !ref2.current.contains(event.target)
      ) {
        setState(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref1, ref2, setState]);
};

export default useOutsideClick;
