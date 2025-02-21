import React from "react";
import '../assets/styles/Unauthorized.css';
import { useTranslation } from "react-i18next";
const Unauthorized = () => {
  const { t } = useTranslation();
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h2 className="unauthorized-title">{t('unauthorized.title')}</h2>
        <p className="unauthorized-message">
        {t('unauthorized.message')}
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
