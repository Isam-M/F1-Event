import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand text-danger px-3" to="/">
        <img
          src="/public/icon/F1-icon.png"
          className="img-fluid"
          alt="F1 icon"
        />
      </Link>
      <div className="navbar-collapse collapse d-flex justify-content-end px-3">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="quiz">
              Quiz
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="drivers">
              Drivers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="teams">
              Teams
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="races">
              Races
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="admin">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
