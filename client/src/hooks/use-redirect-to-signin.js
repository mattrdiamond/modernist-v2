import { useNavigate, useLocation } from "react-router-dom";

/**
 * Hook that returns a function to redirect to the sign-in page,
 * while saving the current URL (pathname + search) so the user can be
 * redirected back to that page after signing in.
 */
const useRedirectToSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    navigate("/signin", {
      state: { from: location.pathname + location.search },
    });
  };
};

export default useRedirectToSignIn;
