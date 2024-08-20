import { useState, useContext, ChangeEvent } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { TeamContext } from "../../context/TeamContext";
import { ITeamContext } from "../../interfaces/ITeamcontext";

const DeleteTeam = () => {
  const [id, setId] = useState("1");
  const { deleteTeam } = useContext(TeamContext) as ITeamContext;
  const [deleteStatus, setDeleteStatus] = useState("...");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  const deleteTeamFromContext = async () => {
    const result = await deleteTeam(Number(id));
    if (result !== undefined && result !== null) {
      setDeleteStatus("Team was deleted");
    } else {
      setDeleteStatus("Something went wrong");
    }
  };

  return (
    <section className="container">
      <h3 className="text-center">Delete a Team</h3>
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
            onClick={deleteTeamFromContext}
          >
            Delete
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default DeleteTeam;
