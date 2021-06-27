import React, {Fragment, useRef, useContext, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import './Modal.scss'

const Context = React.createContext();

export function ModalProvider({children}) {
  const modalRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <Fragment>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef}/>
    </Fragment>
  );
}

export function Modal({onClose, children, ...props}) {
  const modalNode = useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
      <div className="modal active" onClick={onClose}>
        <div className="modal__content active" {...props}
             onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      modalNode
    )
    : null;
}
