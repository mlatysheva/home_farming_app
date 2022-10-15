import { Link } from "react-router-dom";
import { constants } from "../utils/constants";

export const Header = () => {

  return (
    <div className="header">
      <a href="https://www.agrilution.com/"className="logo" target="_blank" rel="noreferrer"></a>
      <div className="nav">
        <Link to={`/${constants.baseUrl}`}>Home</Link>
        <Link to={`/${constants.baseUrl}/plants`}>Plants</Link>
      </div>
    </div>
  )
};
