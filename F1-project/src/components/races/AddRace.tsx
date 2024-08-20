import { useState, ChangeEvent, useContext } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { IRaceContext } from "../../interfaces/IRaceContext";
import { RaceContext } from "../../context/RaceContext";

const addRace = () => {
  const { addRace } = useContext(RaceContext) as IRaceContext;
  const [WinnerTime, setWinnerTime] = useState<string>("");
  const [WinnerName, setWinnerName] = useState<string>("");
  const [GrandPrix, setGrandPrix] = useState<string>("");
  const [NumberOfLaps, setNumberOfLaps] = useState<number>(0);

  const [status, setStatus] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "winnerName":
        setWinnerName(e.currentTarget.value);
        break;
      case "winnerTime":
        setWinnerTime(e.currentTarget.value);
        break;
      case "grandPrix":
        setGrandPrix(e.currentTarget.value);
        break;
      case "numberOfLaps":
        setNumberOfLaps(Number(e.currentTarget.value));
        break;
    }
  };

  const saveRace = async () => {
    const newRace = {
      winnerName: WinnerName,
      winnerTime: WinnerTime,
      grandPrix: GrandPrix,
      numberOfLaps: NumberOfLaps,
    };
    try {
      addRace(newRace);
      setStatus("Race saved");
    } catch (error) {
      console.log(error);
      setStatus("Save failed");
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // Forhindrer at siden refresher
    saveRace();
  };

  // React Bootstrap Form
  return (
    <section className="container">
      <h2 className="text-center">Add Race</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Winner Name</label>
          <FormControl
            type="text"
            className="form-control"
            id="winnerName"
            name="winnerName"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Winner Time</label>
          <FormControl
            type="text"
            className="form-control"
            id="winnerTime"
            name="winnerTime"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grand Prix</label>
          <FormControl
            type="text"
            className="form-control"
            id="grandPrix"
            name="grandPrix"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Laps</label>
          <FormControl
            type="number"
            className="form-control"
            id="numberOfLaps"
            name="numberOfLaps"
            onChange={handleChange}
          />
        </div>

        <Button variant="dark" type="submit">
          Add Race
        </Button>
        {status && <p>{status}</p>}
      </Form>
    </section>
  );
};

export default addRace;
