import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectErrorMessage } from "../../redux/user/user.selectors";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Icon from "../icon/icon.component";
import "./sign-in.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart, error }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    // Dynamically set credential (email or password) based on target value
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in-component">
      <h3>Sign in</h3>
      <span>Sign in with your email and password.</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          handleChange={handleChange}
          type="email"
          value={email}
          label="email"
          required
        />
        <FormInput
          handleChange={handleChange}
          name="password"
          type="password"
          value={password}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            <Icon icon="google" />
            Sign in with Google
          </CustomButton>
        </div>
        {error && (
          <span className="error">
            Incorrect username or password. Please try again.
          </span>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
