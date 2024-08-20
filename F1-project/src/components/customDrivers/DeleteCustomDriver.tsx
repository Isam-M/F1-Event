import { useState, useContext, ChangeEvent } from "react";
import { CustomDriverContext } from "../../context/CustomDriverContext";
import { ICustomDriverContext } from "../../interfaces/ICustomDriverContext";
import { Form, FormControl, Button } from "react-bootstrap";

const DeleteCustomDriver = () => {
  const [id, setId] = useState("4");
  const { deleteCustomDriver } = useContext(
    CustomDriverContext
  ) as ICustomDriverContext;
  const [deleteStatus, setDeleteStatus] = useState("...");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  const deleteCustomDriverFromContext = async () => {
    const customDriverId = Number(id);
    try {
      await deleteCustomDriver(customDriverId);
      setDeleteStatus("driver was deleted");
    } catch (error) {
      setDeleteStatus("Something went wrong");
      throw error;
    }
  };

  return (
    <section className="container">
      <h3 className="text-center">Delete a Driver</h3>
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
            onClick={deleteCustomDriverFromContext}
          >
            Delete
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default DeleteCustomDriver;
