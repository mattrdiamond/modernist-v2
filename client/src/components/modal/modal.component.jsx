import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../redux/modal/modal.actions";
import "./modal.styles.scss";

const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div className={"modal-wrapper"}>
      <div className={"modal-backdrop"} onClick={closeModal} />
      <div className={"modal-box"}>{props.children}</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(Modal);
