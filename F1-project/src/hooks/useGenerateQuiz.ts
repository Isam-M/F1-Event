import { useContext, useEffect, useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import { IRace } from "../interfaces/IRace";
import { RaceContext } from "../context/RaceContext";
import { IRaceContext } from "../interfaces/IRaceContext";
import { getRandomOption, shuffleArray } from "../utilities/helpers";
import { IDriver } from "../interfaces/IDriver";

interface IGenerateQuiz {
  drivers: IDriver[];
}

export const useGenerateQuiz = ({ drivers }: IGenerateQuiz) => {
  const raceContext = useContext(RaceContext) as IRaceContext;
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    if (!raceContext?.races) return;
    const sortedQuestions = generateRaceQuestions(raceContext.races);
    const shuffledQuestions = shuffleArray(sortedQuestions);
    const limitedQuestions = shuffledQuestions.slice(0, 13); // Limiting to 12 questions
    setQuestions(limitedQuestions);
  }, [raceContext?.races]);

  const createQuestion = (type: string, race: IRace): IQuestion | null => {
    let raceValue: string | number | null;
    switch (type) {
      case "laps":
        raceValue = race.numberOfLaps;
        break;
      case "time":
        raceValue = race.winnerTime;
        break;
      case "driver":
        raceValue = race.winnerName;
        break;
      default:
        raceValue = null;
    }

    if (!raceValue) {
      return null;
    }

    const options = new Set<string | number>([raceValue.toString()]);
    while (options.size < 4) {
      options.add(getRandomOption(raceValue.toString(), type, drivers)); // Pass the drivers array from the context
    }

    let questionText = "";
    switch (type) {
      case "laps":
        questionText = `How many laps did ${race.winnerName} complete to win the ${race.grandPrix} Grand Prix?`;
        break;
      case "time":
        questionText = `What was ${race.winnerName}'s winning time at the ${race.grandPrix} Grand Prix?`;
        break;
      case "driver":
        questionText = `Who won the ${race.grandPrix} Grand Prix?`;
        break;
    }

    return {
      question: questionText,
      correctAnswer: raceValue.toString(),
      options: shuffleArray(Array.from(options)),
    };
  };

  const generateRaceQuestions = (races: IRace[]) => {
    let generatedQuestions: IQuestion[] = [];
    races.forEach((race) => {
      const lapsQuestion = createQuestion("laps", race);
      const timeQuestion = createQuestion("time", race);
      const driverQuestion = createQuestion("driver", race);

      if (lapsQuestion) generatedQuestions.push(lapsQuestion);
      if (timeQuestion) generatedQuestions.push(timeQuestion);
      if (driverQuestion) generatedQuestions.push(driverQuestion);
    });
    return generatedQuestions;
  };

  return questions;
};
