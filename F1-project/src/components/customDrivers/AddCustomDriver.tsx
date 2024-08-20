import { useState, ChangeEvent, useContext } from "react";
import { CustomDriverContext } from "../../context/CustomDriverContext";
import { ICustomDriverContext } from "../../interfaces/ICustomDriverContext";
import DisplayCustomDriver from "../upcomingEvent/DisplayAmateurDriver";

const AddCustomDriver = () => {
  const { addCustomDriver } = useContext(
    CustomDriverContext
  ) as ICustomDriverContext;

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [nationality, setNationality] = useState<string>("");
  const [driverImage, setDriverImage] = useState<File | null>(null);
  const [carBrand, setCarBrand] = useState<string>("");
  const [status, setStatus] = useState<string>("...");

  //Bruker Local storage for å hindre at brukeren kan legge til flere custom drivere
  const hasUserAddedCustomDriver = () => {
    const existingDriver = localStorage.getItem("customDriver");
    return !!existingDriver;
  };

  const [showForm, setShowForm] = useState<boolean>(
    !hasUserAddedCustomDriver()
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "age":
        setAge(Number(e.currentTarget.value));
        break;
      case "nationality":
        setNationality(e.currentTarget.value);
        break;
      case "driverImage":
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
          setDriverImage(e.currentTarget.files[0]);
        } else {
          setDriverImage(null);
        }
        break;
      case "carBrand":
        setCarBrand(e.currentTarget.value);
        break;
    }
  };

  const saveCustomDriverFromContext = async () => {
    const newCustomDriver = {
      name: name,
      age: age,
      nationality: nationality,
      driverImage: driverImage?.name,
      carBrand: carBrand,
    };

    try {
      await addCustomDriver(newCustomDriver, driverImage);

      //Local storage er brukt for å hindre at brukeren kan legge til flere custom drivere
      localStorage.setItem("customDriver", "added");
      setShowForm(false);
      setStatus("You are added to the upcoming race! Check the drivers page.");
    } catch (error) {
      setStatus("Something went wrong, please try again later.");
      console.log(error);
    }
  };

  return (
    <section className="container text-center">
      {showForm ? (
        <form className="form">
          <div id="custom-driver-section"></div>
          {status && <p>{status}</p>}
          <div className="mb-3">
            <label className="form-label">Your Name</label>

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
            <label className="form-label">Image of yourself</label>
            <input
              type="file"
              className="form-control"
              id="driverImage"
              name="driverImage"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Your car</label>
            <input
              type="text"
              className="form-control"
              id="carBrand"
              name="carBrand"
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={saveCustomDriverFromContext}
          >
            Add
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="mb-5">{status}</p>
          <p>Your Driver Card</p>
          <DisplayCustomDriver />
        </div>
      )}
    </section>
  );
};

export default AddCustomDriver;
