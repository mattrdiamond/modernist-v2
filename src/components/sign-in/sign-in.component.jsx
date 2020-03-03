import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
  };

  handleChange = e => {
    const { value, name } = e.target;
    console.log("name (input type)", name);
    console.log("value (input value)", value);
    /* brackets within setState will dynamically set that
    key to the input name (email or password) */
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            handleChange={this.handleChange}
            type="email"
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            handleChange={this.handleChange}
            name="password"
            type="password"
            value={this.state.password}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            {/*isGoogleSignIn will pass value of true if we don't pass a value to it*/}
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
