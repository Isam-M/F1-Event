import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";
import DeleteTeam from "./DeleteTeam";
import TeamListCompact from "./TeamListCompact";

const TeamManagement: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleToggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="container">
      <Button
        variant="dark"
        onClick={handleToggleCollapse}
        aria-controls="team-section"
      >
        {isCollapsed ? "Show Teams Tool" : "Hide Teams Tool"}
      </Button>
      <Collapse in={!isCollapsed}>
        <section id="driver-section" className="container">
          <div className="row">
            <div className="col-md-6">
              <AddTeam />
              <EditTeam />
              <DeleteTeam />
            </div>
            <div className="col-md-6">
              <TeamListCompact />
            </div>
          </div>
        </section>
      </Collapse>
    </div>
  );
};

export default TeamManagement;
