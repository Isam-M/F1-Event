import DriverManagement from "../components/drivers/DriverManagement";
import RaceManagement from "../components/races/RaceManagement";
import TeamManagement from "../components/teams/TeamManagement";
import CustomDriverManagement from "../components/customDrivers/CustomDriverManagment";

const AdminPage = () => {
  return (
    <div className="container">
      <section className="row">
        <div className="mb-3">
          <DriverManagement />
        </div>
        <div className="mb-3">
          <RaceManagement />
        </div>
        <div className="mb-3">
          <TeamManagement />
        </div>
        <div className="mb-3">
          <CustomDriverManagement />
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
