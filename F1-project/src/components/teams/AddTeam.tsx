import { useState, ChangeEvent, useContext } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { TeamContext } from "../../context/TeamContext";
import { ITeamContext } from "../../interfaces/ITeamcontext";

const AddTeam = () => {
  const { addTeam } = useContext(TeamContext) as ITeamContext;
  const [Manufacturer, setManufacturer] = useState<string>("");
  const [Image, setImage] = useState<File | null>(null);
  const [driver1, setDriver1] = useState<string>("");
  const [driver2, setDriver2] = useState<string>("");
  const [status, setStatus] = useState<string>("...");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "manufacturer":
        setManufacturer(e.currentTarget.value);
        break;
      case "image":
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
          setImage(e.currentTarget.files[0]);
        } else {
          setImage(null);
        }
        break;
      case "driver1":
        setDriver1(e.currentTarget.value);
        break;
      case "driver2":
        setDriver2(e.currentTarget.value);
        break;
    }
  };

  const saveTeam = async () => {
    const newTeam = {
      manufacturer: Manufacturer,
      image: Image?.name,
      driver1: driver1,
      driver2: driver2,
    };

    try {
      await addTeam(newTeam, Image);
      setStatus("Team saved");
    } catch (error) {
      console.log(error);
      setStatus("Save failed");
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // Forhindrer at siden refresher
    saveTeam();
  };

  // Vi har brukt React Bootstrap Form
  return (
    <section className="container">
      <h3 className="text-center">Add Team</h3>
      {status && <p className="text-center">{status}</p>}
      <Form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Manufacturer</label>
          <FormControl
            type="text"
            className="form-control"
            id="manufacturer"
            name="manufacturer"
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
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <FormControl
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="success">
          Add Team
        </Button>
      </Form>
    </section>
  );
};

export default AddTeam;
