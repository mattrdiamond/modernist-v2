import { connect } from "react-redux";
import PropTypes from "prop-types";

import ModalShell from "../modal-shell/modal-shell.component";
import CustomButton from "../custom-button/custom-button.component";
import { closeModal } from "../../redux/modal/modal.actions";
import useRedirectToSignIn from "../../hooks/use-redirect-to-signin";

const SignInToAddFav = ({ closeModal }) => {
  const redirectToSignIn = useRedirectToSignIn();

  return (
    <ModalShell>
      <h1>Save this product</h1>
      <p>Please login or register to save your&nbsp;Favorites.</p>
      <div className='modal-button-container'>
        <CustomButton
          onClick={() => {
            redirectToSignIn();
            closeModal();
          }}
        >
          Sign In
        </CustomButton>
        <CustomButton onClick={closeModal} buttonStyle='inverted'>
          Cancel
        </CustomButton>
      </div>
    </ModalShell>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(SignInToAddFav);

SignInToAddFav.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
