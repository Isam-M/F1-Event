import { IDriver } from "../interfaces/IDriver";

export const getRandomOption = (
  correctAnswer: string,
  type: string,
  drivers: IDriver[]
): string => {
  let option: string;
  do {
    if (type === "laps") {
      option = (Math.floor(Math.random() * 50) + 40).toString();
    } else if (type === "time") {
      const randomTime = Math.floor(Math.random() * 7200) + 3400; // Total seconds
      const hours = Math.floor(randomTime / 3600)
        .toString()
        .padStart(1, "0");
      const minutes = Math.floor((randomTime % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (randomTime % 60).toString().padStart(2, "0");
      const milliseconds = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      option = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    } else {
      const randomIndex = Math.floor(Math.random() * drivers.length);
      option = drivers[randomIndex].name;
    }
  } while (option === correctAnswer);
  return option;
};
export const shuffleArray = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const moveDriverUp = (
  drivers: IDriver[],
  driverId: number
): IDriver[] => {
  const index = drivers.findIndex((d) => d.id === driverId);

  if (index === drivers.length - 1) {
    let newDrivers = [...drivers];
    const lastDriver = newDrivers.splice(index, 1)[0];
    const displacedDriver = newDrivers.splice(11, 1, lastDriver)[0];
    newDrivers.push(displacedDriver);
    return newDrivers;
  } else if (index > 0) {
    let newDrivers = [...drivers];
    [newDrivers[index], newDrivers[index - 1]] = [
      newDrivers[index - 1],
      newDrivers[index],
    ];
    return newDrivers;
  }

  return drivers;
};
