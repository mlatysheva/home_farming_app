import { Link } from "react-router-dom";

export const Header = () => {

  return (
    <div className="header">
      <a href="https://www.agrilution.com/"className="logo" target="_blank" rel="noreferrer"></a>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
      </div>
    </div>
  )
};
