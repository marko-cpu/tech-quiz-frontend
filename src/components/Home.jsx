import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/Home.css";
import { useTranslation } from "react-i18next";
import AuthService from "../services/auth.service";
const Home = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const { t } = useTranslation();

  useEffect(() => { 
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-content">
        <h1 className="home-heading">
          {t("home.welcome")}{" "}
          <span className="tech-text">{t("home.techQuiz")}!</span>
        </h1>
        <p className="home-description">{t("home.intro")}</p>

        {currentUser && (
        <NavLink className="home-btn" to="/quiz-stepper">
          {t("home.start")}
        </NavLink>
        )}
      </div>
    </main>
  );
};

export default Home;
