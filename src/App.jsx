import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddQuestion from "./components/question/AddQuestion";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizStepper from "./components/quiz/QuizStepper";
import UpdateQuestion from "./components/question/UpdateQuestion";
import QuizResult from "./components/quiz/QuizResult";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import Admin from "./components/Admin";
import Navbar from "./components/layout/NavBar";
import Quiz from "./components/quiz/Quiz";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminRoute from "./services/AdminRoute";
import Unauthorized from "./components/Unauthorized";
import AuthService from "./services/auth.service";
import { AuthProvider } from "./common/AuthProvider";


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {currentUser && (
            <>
              <Route path="/quiz-stepper" element={<QuizStepper />} />
              <Route path="/quiz-result" element={<QuizResult />} />
              <Route path="/all-quizzes" element={<GetAllQuiz />} />
              <Route path="/take-quiz" element={<Quiz />} />
            </>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin rute su unutar AdminRoute */}
          <Route element={<AdminRoute />}>
            <Route path="/create-quiz" element={<AddQuestion />} />
            <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* Stranica ako korisnik pokuša da pristupi admin rutama */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
