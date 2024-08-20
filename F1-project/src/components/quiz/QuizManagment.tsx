import React, { useState, useContext, useEffect } from "react";
import DriversGrid from "./DriversGrid";
import QuizContainer from "./QuizContainer";
import DriverInfo from "./DriverInfo";
import { moveDriverUp } from "../../utilities/helpers";
import { DriverContext } from "../../context/DriverContext";
import "../../styles/Quiz.css";

const QuizManagment: React.FC = () => {
  const driverContext = useContext(DriverContext);
  const [drivers, setDrivers] = useState(driverContext?.drivers || []);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    if (driverContext?.drivers) {
      setDrivers(driverContext.drivers);
    }
  }, [driverContext?.drivers]);

  const handleCorrectAnswer = (): void => {
    if (selectedDriverId !== null) {
      const updatedDrivers = moveDriverUp(drivers, selectedDriverId);
      setDrivers(updatedDrivers);
    }
  };

  return (
    <div className="quiz-management-container">
      <div className="quiz-rules-section">
        <h2 className="rules-heading text-center">
          Race to the Top: Quiz Rules & Tips
        </h2>
        <p className="text-center">
          Welcome to the race! Your challenge is to propel your chosen driver to
          the top of the grid. Here’s how you can accelerate to success:
        </p>
        <ul>
          <li>
            You have 12 questions at your disposal. Answer them correctly to
            advance your driver's position.
          </li>
          <li>
            The ultimate victory? Reaching first place! Achieve this before
            exhausting all 12 questions, and you’ll be crowned the quiz
            champion.
          </li>
          <li>
            Seeking a steeper challenge? Select drivers from the lower ranks of
            the grid and navigate them to the pinnacle.
          </li>
        </ul>
        <p className="text-center">Ready, Set, Quiz!</p>
      </div>
      {selectedDriverId && (
        <>
          <DriverInfo selectedDriverId={selectedDriverId} />
          <QuizContainer
            selectedDriverId={selectedDriverId}
            onCorrectAnswer={handleCorrectAnswer}
            drivers={drivers}
            setDrivers={setDrivers}
            setQuizActive={setIsQuizActive}
          />
        </>
      )}
      <h1 className="title text-center">Choose your driver</h1>
      <DriversGrid
        drivers={drivers}
        onSelectDriver={setSelectedDriverId}
        isQuizActive={isQuizActive}
      />
    </div>
  );
};

export default QuizManagment;
