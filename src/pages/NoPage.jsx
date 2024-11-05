import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <h3>Page not found</h3>
      <button onClick={() => navigate("/")}>Go home</button>
    </div>
  );
};

export default NoPage;
