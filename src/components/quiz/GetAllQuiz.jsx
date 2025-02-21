import { useState, useEffect } from "react";
import { getAllQuestions, deleteQuestion, getSubjects } from "../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./../../assets/styles/GetAllQuiz.css";
import { useTranslation } from "react-i18next";
const GetAllQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [questionsData, subjectsData] = await Promise.all([
        getAllQuestions(),
        getSubjects()
      ]);
      setQuestions(questionsData);
      setSubjects(subjectsData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
      setIsQuestionDeleted(true);
      setDeleteSuccess("Question deleted successfully.");
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setDeleteSuccess("");
    }, 4000);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('getAllQuiz.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="get-all-quiz-container">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8">
            <h2 className="page-title">{t('getAllQuiz.title')}</h2>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <Link to="/create-quiz" className="btn btn-primary">
              <FaPlus /> {t('getAllQuiz.addQuestion')}
            </Link>
          </div>
        </div>
        <hr className="divider" />

        {isQuestionDeleted && (
          <div className="alert alert-success">{deleteSuccess}</div>
        )}

        {/* Subject Filter Buttons */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedSubject("")}
            className={`btn btn-outline-primary ${!selectedSubject ? "active" : ""}`}
          >
            {t('getAllQuiz.allSubjects')}
          </button>
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`btn btn-outline-primary ${
                selectedSubject === subject ? "active" : ""
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Questions List */}
        {questions
          .filter(question => 
            !selectedSubject || 
            question.subject === selectedSubject
          )
          .map((question, index) => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <h4 className="question-text">{`${index + 1}. ${question.question}`}</h4>
                {question.subject && (
                  <span className="badge bg-secondary">{question.subject}</span>
                )}
              </div>
              <ul className="choices-list">
                {question.choices.map((choice, idx) => (
                  <li key={idx} className="choice-item">
                    {choice}
                  </li>
                ))}
              </ul>
              <p className="correct-answer">
                <strong>{t('getAllQuiz.correctAnswers')}:</strong> {question.correctAnswers.join(", ")}
              </p>
              <div className="btn-group">
                <Link
                  to={`/update-quiz/${question.id}`}
                  className="btn btn-warning"
                >
                  <FaEdit /> {t('getAllQuiz.edit')}
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <FaTrash /> {t('getAllQuiz.delete')}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GetAllQuiz;