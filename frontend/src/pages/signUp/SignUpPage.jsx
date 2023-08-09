import "./SignUpPage.scss";
import Title from "../../components/shared/Title";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { signUpCall } from "../../auth/authApiCalls";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();

    try {
      await signUpCall({ email, password, username }, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="register">
      <Title title={"Sign Up"} />

      <div className="top">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt="netflix logo"
          className="logo"
        />

        <Link to="/signin">Sign In</Link>
      </div>

      <div className="container">
        <h1>Unlimited movies, TV shows, and more</h1>

        <p>Watch anywhere. Cancel anytime.</p>

        <div className="signUpForm">
          <form onSubmit={signUpHandler}>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="innerInputs">
              <input
                placeholder="Email address"
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>

              <input
                placeholder="Password"
                type="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <input
                placeholder="Name"
                type="text"
                name="username"
                required
                onChange={(e) => setUserName(e.target.value)}
              ></input>

              <button type="submit">
                Get Started <ArrowForwardIosIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
