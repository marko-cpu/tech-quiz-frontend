import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../utils/QuizService";
import "../../assets/styles/QuizStepper.css"; 
import { useTranslation } from "react-i18next";
const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();


  const { t } = useTranslation();

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const allSubjects = await getSubjects();
      setSubjects(allSubjects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (selectedSubject && selectedNumQuestions) {
        navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } });
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => setCurrentStep((prevStep) => prevStep - 1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h5 className="step-heading">{t("stepper.choose")}:</h5>
            <select
              className="form-select form-select-lg mb-4 new"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">{t('stepper.select')}</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </>
        );
      case 2:
        return (
          <>
            <h5 className="step-heading">{t('stepper.number')}:</h5>
            <input
              type="number"
              className="form-control form-control-lg mb-4"
              value={selectedNumQuestions}
              onChange={(e) => setSelectedNumQuestions(e.target.value)}
              placeholder={t('stepper.enterNumQuestions')}
              min="1"
            />
          </>
        );
      case 3:
        return (
          <>
            <h5 className="step-heading">{t('stepper.confirm')}</h5>
            <p className="confirmation-text">
              <strong>{t('stepper.subject')}:</strong> {selectedSubject}
            </p>
            <p className="confirmation-text">
              <strong>{t('stepper.number')}:</strong> {selectedNumQuestions}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="quiz-stepper-container">
      <div className="glassmorphism-card">
        <h2 className="welcome-heading">{t('stepper.welcome')}</h2>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(currentStep - 1) * 50}%` }}
          ></div>
        </div>
        <div className="step-content">
          {renderStepContent()}
          <div className="button-group">
            {currentStep > 1 && (
              <button className="btn btn-outline-primary" onClick={handlePrevious}>
                {t('stepper.previous')}
              </button>
            )}
            {currentStep < 3 ? (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={
                  (!selectedSubject && currentStep === 1) || (!selectedNumQuestions && currentStep === 2)
                }
              >
                {t('stepper.next')}
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleNext}>
               {t('home.start')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStepper;