import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../../assets/styles/Login.css";
import AuthService from "../../services/auth.service";
import { useTranslation } from "react-i18next";
const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setErrors({ ...errors, username: "" });
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = t("login.errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = t("login.errors.emailInvalid");
    }
    if (!password) {
      newErrors.password = t("login.errors.passwordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("login.errors.passwordMinLength");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      (error) => {
        setLoading(false);
      
        if (error.response) {
          if (error.response.status === 401) {
            setMessage(t("register.errors.invalidCredentials")); 
          } else if (error.response.status === 500) {
            setMessage(t("register.errors.serverError"));
          } else {
            setMessage(error.response.data?.message || t("register.errors.unknownError"));
          }
        } else {
          setMessage(t("register.errors.networkError"));
        }
      }
  
    );
  };

  return (
    <div className="login-container d-flex justify-content-center  px-3  min-vh-100 ">
      <div
        className="card login-card p-3 pb-5 shadow-lg"
        
      >
        <div className="card-body">
          <div className="text-center mb-5">
            <h2 className="mb-2 fw-bold">{t("login.title")}</h2>
            <p className="text-muted">{t("login.subtitle")}</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-medium">
                {t("login.emailLabel")}
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-transparent">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  placeholder={t("login.emailPlaceholder")}
                />
              </div>
              {errors.username && (
                <div className="invalid-feedback mt-2">{errors.username}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-medium">
                {t("login.passwordLabel")}
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-transparent">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  type="password"
                  className={`form-control form-control-lg ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <div className="invalid-feedback mt-2">{errors.password}</div>
              )}
            </div>

            <div className="d-grid mb-3">
              <button
                className="btn btn-lg btn-primary fw-bold py-2 justify-content-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {t("login.loadingText")}
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    {t("login.buttonText")}
                  </>
                )}
              </button>
            </div>

            {message && (
              <div className="alert alert-danger mt-3 text-center">
                {message}
              </div>
            )}

            <div className="text-center mt-4">
              <p className="mt-3 text-muted small">
                {t("login.noAccount")}{" "}
                <Link
                  to="/register"
                  className="text-decoration-none fw-bold hover-primary"
                >
                  {t("login.createAccount")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
