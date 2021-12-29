import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Button, Table } from "react-bootstrap";
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
  }

  return (
    <Container
      backgroundColor="rgb(255,255,255, 0.6)"
      width="70%"
      height="40rem"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      padding="1rem"
    >
      <Container display="flex" justify="center">
        {/* Bootstrap Dropdown */}
        <Dropdown onSelect={handleSelectTeam}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedTeam.name ? selectedTeam.name : selectedTeam}
          </Dropdown.Toggle>
          <Dropdown.Menu className="team-dropdown" >
            {teams
              ? teams.map((team) => (
                  <Dropdown.Item key={team.id} eventKey={team.name}>{team.name}</Dropdown.Item>
                ))
              : "Error"}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      <RosterTable teamId={selectedTeam ? selectedTeam.id : ""}/>
    </Container>
  );
};

export default FetchRoster;
