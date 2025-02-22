import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./../../assets/styles/Navbar.css";
import AuthService from "../../services/auth.service";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);
  useEffect(() => { 
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
  }, [selectedLanguage, i18n]);

  const logOut = () => {
    AuthService.logout();
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    closeNav();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand tech-brand" to="/" onClick={closeNav}>
          {t('home.techQuiz')}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">
            {/* Language Selector */}
            <li className="nav-item dropdown me-2">
              <select
                className="form-select bg-dark text-white border-secondary"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="en">🇬🇧 English</option>
                <option value="srb">🇷🇸 Srpski</option>
              </select>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to="/quiz-stepper" className="nav-link" onClick={closeNav}>
                  {t('common.startQuiz')}
                </Link>
              </li>
            )}
            
            {showAdminBoard && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin" onClick={closeNav}>
                  Admin
                </NavLink>
              </li>
            )}

            {currentUser ? (
              <div className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={closeNav}>
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    closeNav();
                    logOut();
                  }}>
                    {t('common.logout')}
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={closeNav}>
                    {t('common.login')}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" onClick={closeNav}>
                    {t('common.signUp')}
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;