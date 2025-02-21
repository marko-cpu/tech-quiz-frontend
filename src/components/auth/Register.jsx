import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../../assets/styles/Register.css";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const { t } = useTranslation();

  const navigate = useNavigate();


  useEffect(() => {
    if (successful) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [successful, navigate]);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = t('register.errors.usernameRequired');
    else if (username.length < 3 || username.length > 20)
      newErrors.username = t('register.errors.usernameLength');

    if (!email) newErrors.email = t('register.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = t('register.errors.emailInvalid');

    if (!password) newErrors.password = t('register.errors.passwordRequired');
    else if (password.length < 6 || password.length > 40)
      newErrors.password = t('register.errors.passwordLength');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);

      return;
    }
    AuthService.register(username, email, password)
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setCountdown(2);
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        },
        (error) => {
          const resMessage =
            error.response?.data?.message || error.message || error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center min-vh-100  p-2">
    <div className="card register-card p-3 p-md-5 shadow" style={{ width: "100%", maxWidth: "450px" }}>
      {successful ? (
        <div className="text-center p-4">
          <div className="mb-4">
            <i className="fas fa-check-circle text-success fa-4x mb-3"></i>
            <h2 className="mb-3 fw-bold">{message}!</h2>
            <ClipLoader size={35} color="#198754" className="mt-3" />
          </div>
        </div>
      ) : (
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="mb-2 fw-bold text-primary">{t('register.title')}</h2>
            <p className="text-muted">{t('register.subtitle')}</p>
          </div>

            {message && (
              <div
                className={`alert ${
                  successful ? "alert-success" : "alert-danger"
                } mt-3 text-center`}
                role="alert"
              >
                {message}
                {!successful && (
                  <ClipLoader size={20} color="#dc2626" className="ms-2" />
                )}
              </div>
            )}

<form onSubmit={handleRegister}>
              {!successful && (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-medium">
                      {t('register.usernameLabel')}
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-transparent">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control form-control-lg ${
                          errors.username ? "is-invalid" : ""
                        }`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={t('register.usernamePlaceholder')}
                      />
                    </div>
                    {errors.username && (
                      <div className="invalid-feedback mt-2">
                        {errors.username}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium">{t('register.emailLabel')}</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-transparent">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className={`form-control form-control-lg ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('register.emailPlaceholder')}
                      />
                    </div>
                    {errors.email && (
                      <div className="invalid-feedback mt-2">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium">  {t('register.passwordLabel')}</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-transparent">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control form-control-lg ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback mt-2">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="d-grid mb-3">
                    <button className="btn btn-lg btn-primary rounded-pill justify-content-center py-3 fw-bold">
                    {t('register.buttonText')}
                    </button>
                  </div>
                </>
              )}

              <div className="text-center mt-4">
                <p className="text-muted small">
                {t('register.existingAccount')}{" "}
                  <Link
                    to="/login"
                    className="text-decoration-none fw-bold hover-primary"
                  >
                     {t('register.loginLink')}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
