import { Link } from "react-router-dom";
import { constants } from "../shared/constants";

export const Header = () => {

  return (
    <div className="header">
      <a href="https://github.com/mlatysheva/"className="logo" target="_blank" rel="noreferrer"></a>
      <div className="nav">
        <Link to="/home_farming_app">Home</Link>
        <Link to="/home_farming_app/plants">Plants</Link>
      </div>
    </div>
  )
};
