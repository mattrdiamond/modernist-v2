import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectErrorMessage,
  selectCurrentUser,
} from "../../redux/user/user.selectors";
import { clearError } from "../../redux/user/user.actions";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUpPage = ({ error, clearError }) => {
  const [activeTab, setActiveTab] = useState("signIn");

  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page the user came from before navigating to /signin
  const from = location.state?.from || "/";

  useEffect(() => {
    // Navigate back to the page the user came from if they are already signed in
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, from, navigate]);

  const toggleTab = () => {
    if (error) clearError();
    setActiveTab(activeTab === "signUp" ? "signIn" : "signUp");
  };

  return (
    <section className='sign-in-and-sign-up'>
      <div className='page-width'>
        <div className='sign-in-window'>
          <div className='tabs-container'>
            <div
              className={
                "tabs-inner" +
                (activeTab === "signIn" ? " sign-in" : " sign-up")
              }
            >
              <button
                className={"tab"}
                role='tab'
                disabled={activeTab === "signIn"}
                onClick={toggleTab}
              >
                Sign in
              </button>
              <button
                className='tab'
                role='tab'
                disabled={activeTab === "signUp"}
                onClick={toggleTab}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className='sign-in-content'>
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
