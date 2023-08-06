import { Link } from "react-router-dom";
import Title from "../../components/shared/Title";
import "./SignInPage.scss";
import { useState } from "react";
import axios from "axios";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCaptchaInfo, setShowCaptchaInfo] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();

    // try {
    //   const { data } = axios.post("/users/signin", {
    //     email: email,
    //     password: password,
    //   });
    // } catch (error) {}
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

            <button type="submit">Sign In</button>
          </form>

          <p className="signup">
            new to Netflix? <Link>Sign up now</Link>
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
