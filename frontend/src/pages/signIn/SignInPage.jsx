import "./SignInPage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/shared/Title";
import { useContext, useEffect, useState } from "react";
import { loginCall } from "../../auth/authApiCalls";
import { AuthContext } from "../../auth/AuthContext";
import Loading from "../../components/shared/Loading";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCaptchaInfo, setShowCaptchaInfo] = useState(false);
  const { dispatch, isLoading, user, error } = useContext(AuthContext);

  const navigate = useNavigate();
  const search = useLocation();
  const redirect = new URLSearchParams(search).get("redirect");

  useEffect(() => {
    if (user) {
      navigate(redirect || "/");
    }
  }, [user, error]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      await loginCall({ email, password }, dispatch);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signin">
      <Title title={"Sign In"}></Title>

      <div className="top">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt="netflix logo"
          className="logo"
        />
      </div>

      <div className="login-container">
        <div className="login-inner-container">
          <h1>Sign In</h1>

          {error && <p className="invalid-cred">{error}</p>}

          <form onSubmit={loginHandler}>
            <p>
              <input
                type="text"
                name="username"
                placeholder="Email or phone number"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </p>

            <p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </p>

            <button type="submit">
              {!isLoading ? "Sign In" : <Loading />}
            </button>
          </form>

          <h5>Meir Chechik demo project</h5>

          <p className="no-margin">email: admin@example.com</p>

          <p className="no-margin">password: 12345</p>

          <p className="signup">
            new to Netflix? <Link to="/signup">Sign up now</Link>
          </p>

          <p className="captcha">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a
              onClick={() => setShowCaptchaInfo(!showCaptchaInfo)}
              className="learnMore"
            >
              Learn more
            </a>
            .
          </p>

          {showCaptchaInfo && (
            <p className="captcha">
              The information collected by Google reCAPTCHA is subject to the
              Google Privacy Policy and Terms of Service, and is used for
              providing, maintaining, and improving the reCAPTCHA service and
              for general security purposes (it is not used for personalized
              advertising by Google).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
