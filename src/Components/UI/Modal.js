import classes from "./Modal.module.css";
import React from "react";
import reactDOM from "react-dom";
import Card from "./Card/Card";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
};

const ModalCard = (props) => {
  return (
    <Card className={`${props.className} ${classes.modal}`}>
      {props.children}
    </Card>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {reactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {reactDOM.createPortal(
        <ModalCard className={props.className} onClick={props.onClick}>
          {props.children}
        </ModalCard>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
