import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart, setError } from "../../redux/user/user.actions";
import { selectErrorMessage } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import "./sign-up.styles.scss";

const SignUp = ({ signUpStart, error, setError }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  console.log("render signup", error);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    // create new user acct associated w/ email, password and displayName and sign in user (pass along credentials obj containing email, password and displayName to saga)
    signUpStart({ email, password, displayName });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h3 className="title">Sign up</h3>
      <span>Sign up with your email and password.</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">Sign Up</CustomButton>
        {error ? <span className="error">{error}</span> : null}
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
  setError: (error) => dispatch(setError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
