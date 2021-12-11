import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  // useRef container for state to survive past render cycles, and this way each modal will be sel contained
  const elRef = useRef(null);
  if (!elRef.current) {
    // we do not want to create a new div on every rerender, goal is to surviver past renders
    // renders until you dispose of the modal altogether and then you will destroy it.
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    //What we're saying here is, hey, whenever you get created, insert it into DOM, whenever you are done, remove me from the dom
    // !!! And this prevents memory leaks, otherwise you would be leaking divs every single time you have created a modal and then unrendered a modal that does not make any sense
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  //Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. ReactDOM. createPortal(child, container)
  //The first argument ( child ) is any renderable React child, such as an element, string, or fragment. The second argument (container) is a DOM element.
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
//https://reactjs.org/docs/portals.html
//Normally, when you return an element from a component’s render method, it’s mounted into the DOM as a child of the nearest parent node:
//However, sometimes it’s useful to insert a child into a different location in the DOM:
