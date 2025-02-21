import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../assets/styles/Admin.css'
import { FaPlus, FaList } from 'react-icons/fa'; 
import { useTranslation } from "react-i18next";
const Admin = () => {
	  const { t } = useTranslation();
	return (
		<div className="admin-container">
			{/* Header Section */}
			<div className="admin-header text-center py-5">
				<h1 className="display-4 fw-bold">{t("admin.title")}</h1>
				<p className="lead">{t("admin.subtitle")}</p>
			</div>

			{/* Quick Actions Section */}
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<div className="card shadow-lg border-0">
							<div className="card-body p-4">
								<h3 className="card-title text-center mb-4 fw-bold">{t("admin.quickActions")}</h3>
								<nav className="nav flex-column gap-3">
									<Link to="/create-quiz" className="nav-link action-btn btn btn-lg btn-primary d-flex align-items-center justify-content-center">
										<FaPlus className="me-2" />
										{t("admin.createQuiz")}
									</Link>
									<Link to="/all-quizzes" className="nav-link action-btn btn btn-lg btn-success d-flex align-items-center justify-content-center">
										<FaList className="me-2" />
										{t("admin.manageQuizzes")}
									</Link>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;