import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();
  const [transition, setTransition] = useState(false);
  function handleStart() {
    setTransition(true);

    setTimeout(() => {
      navigate("/pokemon");
    }, 300);
  }
  return (
    <>
      {transition && <div className="transition-overlay"></div>}
      <main className="landing">
        <div className="landing__content">
          <button className="landing__button" onClick={handleStart}>
            Get started
          </button>{" "}
        </div>
      </main>
    </>
  );
}

export default Home;
