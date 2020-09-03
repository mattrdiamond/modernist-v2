import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectErrorMessage } from "../../redux/user/user.selectors";
import { clearError } from "../../redux/user/user.actions";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUpPage = ({ error, clearError }) => {
  const [activeTab, setActiveTab] = useState("signIn");

  const toggleTab = () => {
    if (error) clearError();
    if (activeTab === "signUp") setActiveTab("signIn");
    else setActiveTab("signUp");
  };

  return (
    <section className="sign-in-and-sign-up">
      <div className="page-width">
        <div className="sign-in-window">
          <div className="tabs-container">
            <div
              className={
                "tabs-inner" +
                (activeTab === "signIn" ? " sign-in" : " sign-up")
              }
            >
              <button
                className={"tab"}
                role="tab"
                disabled={activeTab === "signIn"}
                onClick={toggleTab}
              >
                Sign in
              </button>
              <button
                className="tab"
                role="tab"
                disabled={activeTab === "signUp"}
                onClick={toggleTab}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="sign-in-content">
            {activeTab === "signIn" ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInAndSignUpPage);
