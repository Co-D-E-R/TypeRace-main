import { TypeState } from "../../../context/TypeProvider.jsx";
import { useNavigate } from "react-router-dom";

const InformationBarMulti = () => {
  const navigate = useNavigate();

  const { setReset, reset } = TypeState();

  const handleClick = () => {
    navigate("/");
    setReset(!reset);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div>
        <button onClick={() => handleClick()}>Retry</button>
      </div>
    </div>
  );
};

export default InformationBarMulti;
