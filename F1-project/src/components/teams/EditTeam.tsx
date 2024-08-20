import { useState, useContext } from "react";
import { ITeam } from "../../interfaces/ITeam";
import { TeamContext } from "../../context/TeamContext";
import { ITeamContext } from "../../interfaces/ITeamcontext";
import { Form, FormControl, Button } from "react-bootstrap";

const EditTeam: React.FC = () => {
  const { getById, editTeam } = useContext(TeamContext) as ITeamContext;
  const [updatedTeam, setUpdatedTeam] = useState<ITeam | null>(null);
  const [status, setStatus] = useState<string>("");
  const [id, setId] = useState<number>(1);

  const getByIdFromContext = async () => {
    const teamFromContext = await getById(id);
    if (teamFromContext !== undefined) {
      setUpdatedTeam(teamFromContext);
      setStatus("Team found successfully!");
    } else {
      setStatus("Team not found, invalid id");
      setUpdatedTeam(null);
    }
  };

  const saveChanges = () => {
    const result = editTeam(updatedTeam as ITeam);
    if (result !== undefined && result !== null) {
      setStatus("Team updated successfully!");
    } else {
      setStatus("Update failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "id":
        setId(Number(e.currentTarget.value));
        break;
      case "manufacturer":
        setUpdatedTeam(
          updatedTeam
            ? { ...updatedTeam, manufacturer: e.currentTarget.value }
            : null
        );
        break;
      case "driver1":
        setUpdatedTeam(
          updatedTeam
            ? { ...updatedTeam, driver1: e.currentTarget.value }
            : null
        );
        break;
      case "driver2":
        setUpdatedTeam(
          updatedTeam
            ? { ...updatedTeam, driver2: e.currentTarget.value }
            : null
        );
        break;
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">Edit a Team</h3>
      <Form>
        {status && <p className="text-center">{status}</p>}
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
          <Button variant="dark" onClick={getByIdFromContext}>
            Find
          </Button>
        </div>
        <div className="mb-3">
          <label className="form-label">Manufacturer</label>
          <FormControl
            type="text"
            className="form-control"
            id="manufacturer"
            name="manufacturer"
            value={updatedTeam?.manufacturer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Driver 1</label>
          <FormControl
            type="text"
            className="form-control"
            id="driver1"
            name="driver1"
            value={updatedTeam?.driver1}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Driver 2</label>
          <FormControl
            type="text"
            className="form-control"
            id="driver2"
            name="driver2"
            value={updatedTeam?.driver2}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Button variant="dark" onClick={saveChanges}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditTeam;
