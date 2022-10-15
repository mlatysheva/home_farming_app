import { Link } from "react-router-dom";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <div className="main home-page">
      <h1>Wish to grow your home garden with Agrilution?</h1>
      <Link to="/plants">
        <button className="home-button">
          Count me in!
        </button>
      </Link>
    </div>
  )
};