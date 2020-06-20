import React, { useState } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUpPage = () => {
  const [activeTab, setActiveTab] = useState("signIn");

  const toggleTab = () => {
    if (activeTab === "signUp") setActiveTab("signIn");
    else setActiveTab("signUp");
  };

  return (
    <section className="sign-in-and-sign-up">
      <div className="background-screen">
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

export default SignInAndSignUpPage;
