# Tech Quiz App

Tech Quiz App is an application that allows users to test and improve their knowledge in various technological areas through interactive quizzes. The app provides login and registration functionality, with different user roles: admin and regular users. The admin has the ability to manage questions, while users can participate in quizzes.

## Features

- **Quizzes by Topics**: Users can answer questions from different technological fields to test and improve their knowledge.
- **Login and Registration**: Users can register and log in to their accounts.
- **User Roles**: The app supports two main roles: **Admin** and **User**.
  - **Admin** has access to question management features (add, edit, delete questions).
  - **User** can only answer questions and view their results.
- **JWT Authentication**: The app uses JWT (JSON Web Token) for secure authentication and data protection.
- **Internationalization (i18n)**: The app supports multiple languages through internationalization (i18n), allowing users to choose their preferred language.

  ## Technologies

The application uses the following technologies:
- **Frontend**:
  - React.js
  - Bootstrap for styled components
  - **Localization (i18n)**: i18next for language support


## How to Run the Application

1. Go to the frontend folder:
    ```bash
    cd ../quiz-client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React application:
    ```bash
    npm run dev
    ```

4. The app will be available at `http://localhost:5173`.
