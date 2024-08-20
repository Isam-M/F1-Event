import { useState, useContext, ChangeEvent } from "react";
import { RaceContext } from "../../context/RaceContext";
import { IRaceContext } from "../../interfaces/IRaceContext";
import { Form, FormControl, Button } from "react-bootstrap";

const DeleteRace = () => {
  const [id, setId] = useState("4");
  const { deleteRace } = useContext(RaceContext) as IRaceContext;
  const [deleteStatus, setDeleteStatus] = useState("...");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  const deleteRaceFromContext = async () => {
    try {
      const result = await deleteRace(Number(id));
      if (result !== undefined && result !== null) {
        setDeleteStatus("Race was deleted");
      } else {
        setDeleteStatus("Something went wrong");
      }
    } catch (error) {
      setDeleteStatus("Error occurred while deleting the race");
      throw error;
    }
  };

  return (
    <section className="container">
      <h3 className="text-center">Delete a race</h3>
      <Form>
        {deleteStatus && <p className="text-center">{deleteStatus}</p>}
        <div className="mb-3">
          <label className="form-label">ID</label>
          <FormControl
            type="text"
            className="form-control"
            id="id"
            name="id"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Button
            className="btn btn-danger"
            type="button"
            onClick={deleteRaceFromContext}
          >
            Delete
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default DeleteRace;
