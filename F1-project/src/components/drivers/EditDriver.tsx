import { useState, useContext } from "react";
import { IDriver } from "../../interfaces/IDriver";
import { DriverContext } from "../../context/DriverContext";
import { IDriverContext } from "../../interfaces/IDriverContext";
import { Form, FormControl, Button } from "react-bootstrap";

const EditDriver: React.FC = () => {
  const { getById, editDriver } = useContext(DriverContext) as IDriverContext;
  const [updatedDriver, setUpdatedDriver] = useState<IDriver | null>(null);
  const [status, setStatus] = useState<string>("");
  const [id, setId] = useState<number>(1);

  const getByIdFromContext = async () => {
    try {
      const driverFromContext = await getById(id);
      if (driverFromContext !== undefined) {
        setUpdatedDriver(driverFromContext);
        setStatus("Driver found successfully!");
      } else {
        setStatus("Driver not found, invalid id");
        setUpdatedDriver(null);
      }
    } catch (error) {
      setStatus("Error occurred while fetching driver");
      throw error;
    }
  };

  const saveChanges = () => {
    const result = editDriver(updatedDriver as IDriver);
    if (result !== undefined && result !== null) {
      setStatus("Driver updated successfully!");
    } else {
      setStatus("Update failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "id":
        setId(Number(e.currentTarget.value));
        break;
      case "name":
        setUpdatedDriver(
          updatedDriver
            ? { ...updatedDriver, name: e.currentTarget.value }
            : null
        );
        break;
      case "age":
        setUpdatedDriver(
          updatedDriver
            ? { ...updatedDriver, age: Number(e.currentTarget.value) }
            : null
        );
        break;
      case "nationality":
        setUpdatedDriver(
          updatedDriver
            ? { ...updatedDriver, nationality: e.currentTarget.value }
            : null
        );
        break;
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Edit Driver</h2>
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
            Get Driver by ID
          </Button>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <FormControl
            type="text"
            id="name"
            name="name"
            value={updatedDriver?.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <FormControl
            type="number"
            id="age"
            name="age"
            value={updatedDriver?.age || 0}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nationality" className="form-label">
            Nationality
          </label>
          <FormControl
            type="text"
            id="nationality"
            name="nationality"
            value={updatedDriver?.nationality || ""}
            onChange={handleChange}
          />
        </div>
        <Button onClick={saveChanges} variant="dark">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditDriver;
