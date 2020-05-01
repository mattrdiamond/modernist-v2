import React from "react";
import { connect } from "react-redux";
import ModalShell from "../modal-shell/modal-shell.component";
import CustomButton from "../custom-button/custom-button.component";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../redux/modal/modal.actions";

const SignInToAddFav = ({ closeModal, history }) => {
  return (
    <ModalShell>
      <h1>Save this product</h1>
      <p>Please login or register to save your Favorites.</p>
      <div className="modal-button-container">
        <CustomButton
          onClick={() => {
            history.push("/signin");
            closeModal();
          }}
        >
          Sign In
        </CustomButton>
        <CustomButton onClick={closeModal}>Cancel</CustomButton>
      </div>
    </ModalShell>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(null, mapDispatchToProps)(SignInToAddFav));
