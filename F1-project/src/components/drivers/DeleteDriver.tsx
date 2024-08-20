import { useState, useContext, ChangeEvent } from "react";
import { DriverContext } from "../../context/DriverContext";
import { IDriverContext } from "../../interfaces/IDriverContext";
import { Form, FormControl, Button } from "react-bootstrap";

const DeleteDriver = () => {
  const [id, setId] = useState("4");
  const { deleteDriver } = useContext(DriverContext) as IDriverContext;
  const [deleteStatus, setDeleteStatus] = useState("...");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  const deleteDriverFromContext = async () => {
    try {
      const driverId = Number(id);
      const driver = await deleteDriver(driverId);

      if (driver) {
        const deletedDriverName = driver.name;
        setDeleteStatus(`${deletedDriverName} was deleted`);
      } else {
        setDeleteStatus("Something went wrong");
      }
    } catch (error) {
      setDeleteStatus("An error occurred while deleting the driver");
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
            onClick={deleteDriverFromContext}
          >
            Delete
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default DeleteDriver;
