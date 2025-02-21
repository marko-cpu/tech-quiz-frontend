import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../utils/QuizService";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './../../assets/styles/UpdateQuestion.css';

const UpdateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswers(e.target.value.split(",").map(answer => answer.trim()));
  };

  const handleQuestionUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers,
      };
      await updateQuestion(id, updatedQuestion);
      console.log(updatedQuestion);
      navigate("/all-quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('getAllQuiz.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <section className="container mt-5">
      <h4 className="text-center mb-4" style={{ color: "GrayText" }}>
        {t('update.title')}
      </h4>
      <div className="card shadow-sm p-4">
        <form onSubmit={handleQuestionUpdate}>
          <div className="form-group mb-4">
            <label htmlFor="question" className="text-info">
              {t('update.questionLabel')}
            </label>
            <textarea
              className="form-control"
              id="question"
              rows={4}
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="choices" className="text-info">
              {t('update.choicesLabel')}
            </label>
            {choices.map((choice, index) => (
              <input
                type="text"
                className="form-control mb-2"
                key={index}
                value={choice}
                onChange={(e) => handleChoiceChange(index, e)}
              />
            ))}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="correctAnswers" className="text-info">
              {t('update.correctAnswerLabel')}
            </label>
            <input
              type="text"
              className="form-control"
              id="correctAnswers"
              value={correctAnswers}
              onChange={handleCorrectAnswerChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-warning">
              {t('update.updateButton')}
            </button>
            <Link to="/all-quizzes" className="btn btn-primary">
              {t('update.backToAll')}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateQuestion;
