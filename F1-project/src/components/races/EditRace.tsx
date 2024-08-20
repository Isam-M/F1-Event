import { useState, ChangeEvent, useContext } from "react";
import { RaceContext } from "../../context/RaceContext";
import { IRaceContext } from "../../interfaces/IRaceContext";
import { IRace } from "../../interfaces/IRace";
import { Form, FormControl, Button } from "react-bootstrap";

const EditRace: React.FC = () => {
  const { editRace, getById } = useContext(RaceContext) as IRaceContext;
  const [updatedRace, setUpdatedRace] = useState<IRace | null>(null);
  const [status, setStatus] = useState<string>("");
  const [id, setId] = useState<number>(1);

  const getByIdFromContext = async () => {
    const raceFromContext = await getById(id);
    if (raceFromContext !== undefined) {
      setUpdatedRace(raceFromContext);
      setStatus("Race Found!");
    } else {
      setStatus("Race not found, invalid id");
      setUpdatedRace(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "id":
        setId(Number(e.currentTarget.value));
        break;
      case "winnerName":
        setUpdatedRace(
          updatedRace
            ? { ...updatedRace, winnerName: e.currentTarget.value }
            : null
        );
        break;
      case "winnerTime":
        setUpdatedRace(
          updatedRace
            ? { ...updatedRace, winnerTime: e.currentTarget.value }
            : null
        );
        break;
      case "grandPrix":
        setUpdatedRace(
          updatedRace
            ? { ...updatedRace, grandPrix: e.currentTarget.value }
            : null
        );
        break;
      case "numberOfLaps":
        setUpdatedRace(
          updatedRace
            ? { ...updatedRace, numberOfLaps: Number(e.currentTarget.value) }
            : null
        );
        break;
    }
  };

  const saveChanges = async () => {
    try {
      const result = await editRace(updatedRace as IRace);
      if (result !== undefined && result !== null) {
        setStatus("Race updated successfully!");
      } else {
        setStatus("Update failed.");
      }
    } catch (error) {
      setStatus("An error occurred while saving changes.");
    }
  };

  return (
    <section className="container">
      <h2 className="text-center">Edit Race</h2>
      <Form>
        {status && <p className="text-center">{status}</p>}
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID
          </label>
          <FormControl
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Button onClick={getByIdFromContext} variant="dark" className="me-2">
            Get Race by ID
          </Button>
        </div>
        <div>
          <label className="form-label">Winner Name</label>
          <FormControl
            type="text"
            className="form-control"
            id="winnerName"
            name="winnerName"
            value={updatedRace?.winnerName || ""}
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
            value={updatedRace?.winnerTime || ""}
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
            value={updatedRace?.grandPrix || ""}
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
            value={updatedRace?.numberOfLaps || 0}
            onChange={handleChange}
          />
        </div>

        <Button onClick={saveChanges} variant="dark">
          Edit Race
        </Button>
      </Form>
    </section>
  );
};

export default EditRace;
