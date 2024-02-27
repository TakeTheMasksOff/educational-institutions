import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children, isOpen, onClose }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    const newModalRoot = document.createElement("div");
    newModalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(newModalRoot);
    setModalRoot(newModalRoot);

    return () => document.body.removeChild(newModalRoot);
  }, []);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content ">
        <div className="text-right">
          <button onClick={onClose} className="modal-close px-3 py-1">
            X
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
