import DriverList from "../components/drivers/DriverList";
import CustomDriverList from "../components/customDrivers/CustomDriverList";

const DriverPage = () => {
  return (
    <section>
      <DriverList />
      <CustomDriverList />
    </section>
  );
};

export default DriverPage;
