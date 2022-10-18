import { Link } from "react-router-dom";
import { constants } from "../shared/constants";

export const Header = () => {

  return (
    <div className="header">
      <a href="https://www.agrilution.com/"className="logo" target="_blank" rel="noreferrer"></a>
      <div className="nav">
        <Link to="/agrilution_app">Home</Link>
        <Link to="/agrilution_app/plants">Plants</Link>
      </div>
    </div>
  )
};
