import { MutableRefObject } from "react";
import { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {

  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    if(!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    return () => {  
      if(elRef.current){ 
      modalRoot.removeChild(elRef.current);
      }
    }
  }, []);

  //Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. ReactDOM. createPortal(child, container)
  //The first argument ( child ) is any renderable React child, such as an element, string, or fragment. The second argument (container) is a DOM element.
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
//https://reactjs.org/docs/portals.html
//Normally, when you return an element from a component’s render method, it’s mounted into the DOM as a child of the nearest parent node:
//However, sometimes it’s useful to insert a child into a different location in the DOM:
