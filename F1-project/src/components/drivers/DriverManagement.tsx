import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddDriver from "./AddDriver";
import EditDriver from "./EditDriver";
import DriverListCompact from "./DriverListCompact";
import DeleteDriver from "./DeleteDriver";

const DriverManagement: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="container">
      <Button
        variant="dark"
        onClick={handleToggleCollapse}
        aria-controls="driver-section"
      >
        {isCollapsed ? "Show Drivers Tool" : "Hide Drivers"}
      </Button>
      <Collapse in={!isCollapsed}>
        <section id="driver-section" className="container">
          <div className="row">
            <div className="col-md-6">
              <AddDriver />
              <EditDriver />
              <DeleteDriver />
            </div>
            <div className="col-md-6">
              <DriverListCompact />
            </div>
          </div>
        </section>
      </Collapse>
    </div>
  );
};

export default DriverManagement;
