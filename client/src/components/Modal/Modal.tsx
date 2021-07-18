import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import './Modal.scss'

interface ModalProps {
  onClose?: () => {};
  children?: React.ReactNode;
}

const Context = React.createContext<HTMLDivElement | undefined>(undefined);

export const ModalProvider: React.FC<ModalProps> = ({children}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<HTMLDivElement>();

  useEffect(() => {
    if (modalRef.current) {
      setContext(modalRef.current);
    }
  }, []);

  return (
    <Fragment>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef}/>
    </Fragment>
  );
}

export const Modal: React.FC<ModalProps> = ({onClose, children, ...props}) => {
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
