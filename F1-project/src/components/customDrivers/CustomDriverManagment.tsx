import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import EditCustomDriver from "./EditCustomDriver";
import DeleteCustomDriver from "./DeleteCustomDriver";
import CustomDriverListCompact from "./CustomDriverListCompact";

const CustomDriverManagement: React.FC = () => {
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
        {isCollapsed ? "Show Custom Drivers Tool" : "Hide Custom Drivers"}
      </Button>
      <Collapse in={!isCollapsed}>
        <section id="driver-section" className="container">
          <div className="row">
            <div className="col-md-6">
              <EditCustomDriver />
              <DeleteCustomDriver />
            </div>
            <div className="col-md-6">
              <CustomDriverListCompact />
            </div>
          </div>
        </section>
      </Collapse>
    </div>
  );
};

export default CustomDriverManagement;
