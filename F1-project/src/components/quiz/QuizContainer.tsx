import React, { useState, useEffect } from "react";
import { IQuiz } from "../../interfaces/IQuiz";
import { useGenerateQuiz } from "../../hooks/useGenerateQuiz";
import "../../styles/Quiz.css";

const QuizContainer: React.FC<IQuiz> = ({
  selectedDriverId,
  onCorrectAnswer,
  drivers,
  setQuizActive,
}) => {
  const questions = useGenerateQuiz({ drivers });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizStatus, setQuizStatus] = useState<"pending" | "started" | "ended">(
    "pending"
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [startingPosition, setStartingPosition] = useState(0);
  const [endingPosition, setEndingPosition] = useState(0);

  useEffect(() => {
    setQuizActive(quizStarted);
  }, [quizStarted, setQuizActive]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
    customClass: "",
    duration: 0,
  });

  useEffect(() => {
    if (alert.show) {
      const duration = alert.type === "info" ? 120000 : 3000;
      const timer = setTimeout(
        () => setAlert({ ...alert, show: false }),
        duration
      );
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const currentQuestion = questions[currentQuestionIndex];

  const checkAnswer = (selectedOption: string) => {
    if (currentQuestion && selectedOption === currentQuestion.correctAnswer) {
      setAlert({
        show: true,
        message: "Correct Answer! Moving to the next question.",
        type: "success",
        customClass: "",
        duration: 3000,
      });
      setCorrectAnswers((prev) => prev + 1);
      setEndingPosition((prev) => {
        const newPosition = prev - 1;
        if (newPosition === 1) {
          setQuizStarted(false);

          setQuizStatus("ended");

          setAlert({
            show: true,
            message: "You have reached first place! Quiz has ended.",
            type: "info",
            customClass: "quiz-end-alert",
            duration: 120000,
          });
        }
        return newPosition;
      });

      onCorrectAnswer();
    } else {
      setAlert({
        show: true,
        message: "Wrong Answer! Next question.",
        type: "danger",
        customClass: "",
        duration: 3000,
      });
      setIncorrectAnswers((prev) => prev + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex >= questions.length || nextQuestionIndex >= 12) {
      setQuizStarted(false);
      setQuizActive(false);
      setQuizStatus("ended");

      setAlert({
        show: true,
        message: "Quiz has ended. Thank you for participating!",
        type: "info",
        customClass: "quiz-end-alert",
        duration: 40000,
      });
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const startQuiz = () => {
    // Check if the driver is already in first place
    const startPosition =
      drivers.findIndex((d) => d.id === selectedDriverId) + 1;
    if (startPosition === 1) {
      // Set the alert to show the message
      setAlert({
        show: true,
        message: "You are already in first place. Afraid of the challenge?",
        type: "info", // Using 'info' type for the Bootstrap alert
        customClass: "quiz-end-alert",
        duration: 3000, // Duration for how long the alert should show
      });
      return; // Prevents the quiz from starting
    }

    // Existing logic to start the quiz
    setAlert({ ...alert, show: false });
    setQuizStarted(true);
    setQuizActive(true);
    setStartingPosition(startPosition);
    setEndingPosition(startPosition);
  };

  const endQuiz = () => {
    setQuizStarted(false);
    setQuizStatus("pending");
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setStartingPosition(0);
    setEndingPosition(0);
    setAlert({
      show: false,
      message: "",
      type: "",
      customClass: "",
      duration: 0,
    });
    setQuizActive(false);
  };

  useEffect(() => {
    if (selectedDriverId) {
      setQuizStarted(false);
      setEndingPosition(
        drivers.findIndex((d) => d.id === selectedDriverId) + 1
      );
    }
  }, [selectedDriverId]);

  return (
    <>
      <div className="quiz-container">
        {quizStatus !== "ended" && !quizStarted && selectedDriverId && (
          <>
            <section className="quiz-start">
              <div className="quiz-text text-center">
                Take the quiz to move up a spot in the race!
              </div>
              <button
                className="quiz-button btn btn-success rounded"
                onClick={startQuiz}
              >
                Start Quiz
              </button>
            </section>
          </>
        )}
        {quizStarted && currentQuestion && (
          <div className="question-box">
            <h2>{currentQuestion.question}</h2>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="question-option"
                  onClick={() => checkAnswer(option.toString())}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}{" "}
        {alert.show && (
          <div
            className={`alert-container alert alert-${alert.type} ${
              alert.customClass || ""
            }`}
            role="alert"
          >
            {alert.message}
          </div>
        )}
        {quizStatus === "ended" && (
          <div className="quiz-summary text-center">
            <h2>Quiz Summary</h2>
            <p>
              Questions Answered:{" "}
              <span className="stat">{correctAnswers + incorrectAnswers}</span>
            </p>
            <p>
              Correct Answers: <span className="stat">{correctAnswers}</span>
            </p>
            <p>
              Incorrect Answers:{" "}
              <span className="stat">{incorrectAnswers}</span>
            </p>
            <p>
              Starting Position:{" "}
              <span className="stat">{startingPosition}</span>
            </p>
            <p>
              Ending Position: <span className="stat">{endingPosition}</span>
            </p>
            <button className="btn btn-danger rounded" onClick={endQuiz}>
              End Quiz
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizContainer;
