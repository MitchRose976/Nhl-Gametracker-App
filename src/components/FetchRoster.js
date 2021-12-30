import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Collapse } from "react-bootstrap";
import styled from "styled-components";
import Container from "../UX/Container";
import RosterTable from "./RosterTable";

const FetchRoster = () => {
  let url = "https://statsapi.web.nhl.com/api/v1/teams";
  // sets Roster to null when no team is selected (default state)
  const [teamList, setTeamList] = useState(null);
  // Stores the content to be displayed, null by default
  let teams = null;
  // 1st argument - function to run when monitored variable changes
  // 2nd argument - variable to monitor
  // Fetch API from NHL
  useEffect(() => {
    axios.get(url).then((response) => {
      setTeamList(response.data);
    });
  }, [url]);

  // If API fetch is successful, push all team names to an array
  if (teamList) {
    teams = [];
    // Push all team names to an array
    for (let i = 0; i < teamList.teams.length; i++) {
      teams.push(teamList.teams[i]);
    }
  }

  const [selectedTeam, setSelectedTeam] = useState("Select a Team");
  const handleSelectTeam = (e) => {
    for (let i = 0; i < teams.length; i++) {
      if (e === teams[i].name) {
        setSelectedTeam(teams[i]);
      }
    }
  };

  // State to control bootstrap collapse transition
  const [open, setOpen] = useState(false);

  return (
    <Container
      backgroundColor="rgb(255,255,255, 0.6)"
      width="70%"
      height="45rem"
      display="flex"
      margin="2rem 0 0 0"
      justifyContent="center"
      flexDirection="column"
      padding="1rem"
    >
      <Container display="flex" justify="center" margin="0 0 2rem 0">
        {/* Bootstrap Dropdown */}
        <Dropdown
          onSelect={handleSelectTeam}
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedTeam.name ? selectedTeam.name : selectedTeam}
          </Dropdown.Toggle>
          <Collapse in={open}>
            <Dropdown.Menu className="team-dropdown" id="example-collapse-text">
              {teams
                ? teams.map((team) => (
                    <Dropdown.Item key={team.id} eventKey={team.name}>
                      {team.name}
                    </Dropdown.Item>
                  ))
                : "Error"}
            </Dropdown.Menu>
          </Collapse>
        </Dropdown>
      </Container>
      <RosterTable teamId={selectedTeam ? selectedTeam.id : ""} />
    </Container>
  );
};

export default FetchRoster;
