import { useEffect, useRef , FunctionComponent, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal'); // type inference is made here to the type https://www.typescriptlang.org/docs/handbook/type-inference.html


const Modal:FunctionComponent = ({ children }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null); // Using a Generic https://www.typescriptlang.org/docs/handbook/generics.html
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(()=>{
    if (!modalRoot || !elRef.current) return;

    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    }

  },[])

  return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;
