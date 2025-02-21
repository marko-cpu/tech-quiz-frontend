import React, { useEffect, useState } from "react";
import { createQuestion, getSubjects } from "../../utils/QuizService";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaSave, FaArrowLeft } from "react-icons/fa";
import "./../../assets/styles/AddQuestion.css";
import { useTranslation } from "react-i18next";
const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([""]);
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectData = await getSubjects();
      setSubjectOptions(subjectData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChoice = () => {
    const lastChoice = choices[choices.length - 1];
    const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A";
    const newChoiceLetter = String.fromCharCode(
      lastChoiceLetter.charCodeAt(0) + 1
    );
    const newChoice = `${newChoiceLetter}.`;
    setChoices([...choices, newChoice]);
   
   
  };

  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((choice, i) => i !== index));
  };

  const handleChoiceChange = (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
  };

  const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(
      correctAnswers.map((answer, i) => (i === index ? value : answer))
    );
  };

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""]);
  };

  const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      correctAnswers.length === 0 ||
      correctAnswers.some((answer) => answer.trim() === "")
    ) {
      alert(t('addQuestion.errorMessage'));
      return;
    }
    try {
      const result = {
        question,
        questionType,
        choices,
        correctAnswers: correctAnswers.map((answer) => {
          const choiceLetter = answer.charAt(0).toUpperCase();
          const choiceIndex = choiceLetter.charCodeAt(0) - 65;
          return choiceIndex >= 0 && choiceIndex < choices.length
            ? choiceLetter
            : null;
        }),
        subject,
      };
      await createQuestion(result);
      setQuestion("");
      setQuestionType("single");
      setChoices([""]);
      setCorrectAnswers([""]);
      setSubject("");
      navigate("/admin");
      setIsQuestionAdded(true);
      setAddedSuccess("Question added successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubject(newSubject.trim());
      setSubjectOptions([...subjectOptions, newSubject.trim()]);
      setNewSubject("");
    }
  };

  return (
    <div className="add-question-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0 text-center p-2">  {t('addQuestion.title')}</h5>
            </div>

          

            <div className="card-body">
              <form onSubmit={handleSubmit} className="p-3">
                {/* Subject Selection */}
                <div className="mb-4">
                  <label htmlFor="subject" className="form-label">
                  {t('addQuestion.selectSubject')}
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-select"
                  >
                    <option value="">  {t('addQuestion.selectSubject')}</option>
                    <option value="New">  {t('addQuestion.addNewSubject')}</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add New Subject */}
                {subject === "New" && (
                  <div className="mb-4">
                    <label htmlFor="new-subject" className="form-label">
                    {t('addQuestion.addNewSubject')}
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="new-subject"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleAddSubject}
                      >
                        <FaPlus /> {t('addQuestion.selectSubject')}
                      </button>
                    </div>
                  </div>
                )}

                {/* Question Input */}
                <div className="mb-4">
                  <label htmlFor="question" className="form-label">
                  {t('addQuestion.questionLabel')}
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                </div>

                {/* Question Type */}
                <div className="mb-4">
                  <label htmlFor="question-type" className="form-label">
                  {t('addQuestion.questionType')}
                  </label>
                  <select
                    id="question-type"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="form-select"
                  >
                    <option value="single">{t('addQuestion.singleAnswer')}</option>
                    <option value="multiple">{t('addQuestion.multipleAnswer')}</option>
                  </select>
                </div>

                {/* Choices */}
                <div className="mb-4">
                  <label className="form-label">{t('addQuestion.choices')}</label>
                  {choices.map((choice, index) => (
                    <div key={index} className="input-group mb-3">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) =>
                          handleChoiceChange(index, e.target.value)
                        }
                        className="form-control"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChoice(index)}
                        className="btn btn-outline-danger"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddChoice}
                    className="btn btn-outline-primary"
                  >
                    <FaPlus /> {t('addQuestion.addChoice')}
                  </button>
                </div>

                {/* Correct Answer */}
                {questionType === "single" && (
                  <div className="mb-4">
                    <label htmlFor="answer" className="form-label">
                    {t('addQuestion.correctAnswer')}
                    </label>
                    <input
                      type="text"
                      value={correctAnswers[0]}
                      onChange={(e) =>
                        handleCorrectAnswerChange(0, e.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                )}

                {/* Multiple Correct Answers */}
                {questionType === "multiple" && (
                  <div className="mb-4">
                    <label className="form-label">{t('addQuestion.correctAnswers')}</label>
                    {correctAnswers.map((answer, index) => (
                      <div key={index} className="input-group mb-3">
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) =>
                            handleCorrectAnswerChange(index, e.target.value)
                          }
                          className="form-control"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleRemoveCorrectAnswer(index)}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddCorrectAnswer}
                      className="btn btn-outline-primary"
                    >
                      <FaPlus /> {t('addQuestion.addCorrectAnswer')}
                    </button>
                  </div>
                )}

                {/* Submit and Back Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-success">
                    <FaSave /> {t('addQuestion.saveQuestion')}
                  </button>
                  <Link to="/all-quizzes" className="btn btn-primary">
                    <FaArrowLeft /> {t('addQuestion.backToQuestions')}
                  </Link>
                    {/* Success Message */}
            {isQuestionAdded && (
              <div className="alert alert-success">{addedSuccess}</div>
            )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
