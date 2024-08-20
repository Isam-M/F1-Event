import { useState, ChangeEvent, useContext } from "react";
import { DriverContext } from "../../context/DriverContext";
import { IDriverContext } from "../../interfaces/IDriverContext";

const AddDriver = () => {
  const { addDriver } = useContext(DriverContext) as IDriverContext;

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [nationality, setNationality] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "age":
        setAge(Number(e.currentTarget.value));
        break;
      case "image":
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
          setImage(e.currentTarget.files[0]);
        } else {
          setImage(null);
        }
        break;
      case "nationality":
        setNationality(e.currentTarget.value);
        break;
    }
  };

  const saveDriver = async () => {
    const newDriver = {
      name: name,
      age: age,
      nationality: nationality,
      image: image?.name,
    };

    try {
      await addDriver(newDriver, image);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <section className="container">
      <h3 className="text-center">Add Driver</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>

          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nationality</label>

          <input
            type="text"
            className="form-control"
            id="nationality"
            name="nationality"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={saveDriver}>
          Add
        </button>
      </form>
    </section>
  );
};

export default AddDriver;
