import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "../modal/modal.component";
import CustomButton from "../custom-button/custom-button.component";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../redux/modal/modal.actions";

const SignInToAddFav = ({ closeModal, history }) => {
  return (
    <Modal>
      <h1>Save this product</h1>
      <p>Login or register to save your Favorites.</p>
      <CustomButton
        onClick={() => {
          history.push("/signin");
          closeModal();
        }}
      >
        Sign In
      </CustomButton>
      <CustomButton onClick={closeModal}>Cancel</CustomButton>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(null, mapDispatchToProps)(SignInToAddFav));
