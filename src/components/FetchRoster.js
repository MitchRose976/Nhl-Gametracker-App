import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Button, Table } from "react-bootstrap";
import styled from "styled-components";
import Container from "../UX/Container";

const FetchRoster = () => {
  let url = "https://statsapi.web.nhl.com/api/v1/teams";
  // sets Roster to null when no team is selected (default state)
  const [team, setTeam] = useState(null);
  // Stores the content to be displayed, null by default
  let teamsList = null;
  // 1st argument - function to run when monitored variable changes
  // 2nd argument - variable to monitor
  // Fetch API from NHL
  useEffect(() => {
    axios.get(url).then((response) => {
      setTeam(response.data);
    });
  }, [url]);

  // If API fetch is successful, push all team names to an array
  if (team) {
    teamsList = [];
    // Push all team names to an array
    for (let i = 0; i < team.teams.length; i++) {
      teamsList.push(team.teams[i].name);
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
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose a Team
          </Dropdown.Toggle>
          <Dropdown.Menu className="team-dropdown">
            {teamsList
              ? teamsList.map((team) => (
                  <Dropdown.Item key={team}>{team}</Dropdown.Item>
                ))
              : "Error"}
          </Dropdown.Menu>
        </Dropdown>
        {/* Submit Button */}
        <Button variant="info" className="get-roster-button">
          Get Roster
        </Button>{" "}
      </Container>

      {/* Container to display rosters */}
      <Container
        height="35rem"
        width="80%"
        backgroundColor="rgb(255,255,255, 0.8)"
        margin="1rem 0 0 0"
        overflowX="auto"
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Player</th>
              <th>#</th>
              <th>Pos</th>
              <th>Shot</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Born</th>
              <th>Birthplace</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default FetchRoster;
