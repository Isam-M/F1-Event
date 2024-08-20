import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddRace from "./AddRace";
import EditRace from "./EditRace";
import DeleteRace from "./DeleteRace";
import RaceListCompact from "./RaceListCompact";

const RaceManagement: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="container">
      <Button
        variant="dark"
        onClick={handleToggleCollapse}
        aria-controls="race-section"
      >
        {isCollapsed ? "Show Race Tool" : "Hide Race Tool"}
      </Button>
      <Collapse in={!isCollapsed}>
        <section id="race-section" className="container">
          <div className="row">
            <div className="col-md-6">
              <AddRace />
              <EditRace />
              <DeleteRace />
            </div>
            <div className="col-md-6">
              <RaceListCompact />
            </div>
          </div>
        </section>
      </Collapse>
    </div>
  );
};

export default RaceManagement;
