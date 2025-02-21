import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../../assets/styles/QuizResult.css";
import { useTranslation } from "react-i18next";
const QuizResult = () => {
  const location = useLocation();
  const { quizQuestions, totalScores, selectedNumQuestions, selectedSubject } =
    location.state;
  const numOfQuestions = quizQuestions.length;
  const percentage = Math.round((totalScores / numOfQuestions) * 100);
  const navigate = useNavigate();

   const { t } = useTranslation();

  const handleRetakeQuiz = () => {
    navigate("/take-quiz", {
      state: { selectedNumQuestions, selectedSubject },
    });
  };

  const handleGoQuiz = () => {
    navigate("/quiz-stepper");
  };

  return (
    <div className="quiz-result-container">
      <div className="card shadow-lg p-4 text-center">
        <h2 className="text-primary mb-4">  {t('result.totalScore')}</h2>
        <hr className="mb-4" />
        <h4 className="text-info mb-3">
          {t('result.youAnswered')} <strong>{totalScores}</strong> {t('result.outOf')}{" "}
          <strong>{numOfQuestions}</strong> {t('result.questionCorrectly')}
        </h4>
        <div
          className="progress mb-4 mx-auto"
          style={{ width: "80%", height: "30px" }}
        >
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percentage}%
          </div>
        </div>
        <p className="lead mb-4">
          {t('result.totalScore')} <strong>{percentage}%</strong>
        </p>

        <div className="button-container">
          <button className="btn btn-primary btn-lg" onClick={handleRetakeQuiz}>
            {t('result.retake')}
          </button>
          <button className="btn btn-primary btn-lg" onClick={handleGoQuiz}>
           {t('result.backQuiz')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
