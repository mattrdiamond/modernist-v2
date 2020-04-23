import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./modal.styles.scss";

const modalRoot = document.getElementById("modal-root");

// forwardRef lets components take a ref they receive and pass it further down (forward it) to a child
// useImperativeHandle - lets you attach methods to ref
const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = React.useState({ showModal: false });
  const { showModal } = display;

  // returned object will be put directly into modalRef, giving it acces to open/close methods
  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close(),
    };
  });

  const open = () => {
    setDisplay({ showModal: true });
  };

  const close = () => {
    setDisplay({ showModal: false });
  };

  if (showModal) {
    return ReactDOM.createPortal(
      <div className={"modal-wrapper"}>
        <div className={"modal-backdrop"} onClick={close} />
        <div className={"modal-box"}>{props.children}</div>
      </div>,
      modalRoot
    );
  }
  return null;
});

export default Modal;
