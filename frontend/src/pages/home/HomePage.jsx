import { useContext, useEffect } from "react";
import Title from "../../components/shared/Title";
import NavBar from "../../components/shared/navBar/NavBar";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <div className="home">
      <Title title="Home"></Title>
      <NavBar />
    </div>
  );
};

export default HomePage;
