import { Link } from "react-router-dom";
import { constants } from "../shared/constants";

export const HomePage = () => {
  return (
    <div className="main home-page">
      <h1>Wish to have your own garden at home?</h1>
      <Link to="/home_farming_app/plants">
        <button className="home-button">
          Count me in!
        </button>
      </Link>
      <div className="home-page__hero-image"></div>
    </div>
  )
};