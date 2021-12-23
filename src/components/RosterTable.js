import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import Container from "../UX/Container";

const RosterTable = () => {
    
  // This variable is controlled by state and will change to the id of whatever team the user submits
  let teamIndex = 9;
  let url = `https://statsapi.web.nhl.com/api/v1/teams/${teamIndex}?expand=team.roster`;
  // sets Roster to null when no team is selected (default state)
  const [roster, setRoster] = useState(null);
  // Stores the content to be displayed, null by default
  let teamRoster = null;
  // 1st argument - function to run when monitored variable changes
  // 2nd argument - variable to monitor
  // Fetch API from NHL
  useEffect(() => {
    axios.get(url).then((response) => {
      setRoster(response.data);
    });
  }, [url]);

  // If API fetch is successful, push all team names to an array
  if (roster) {
    teamRoster = roster.teams[0].roster.roster;
    
    console.log(teamRoster);
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
            {/* <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr> */}
            {teamRoster ? teamRoster.map((player) => (
                <tr>
                    {/* Name */}
                    <td>{player.person.fullName}</td>
                    {/* # */}
                    <td>{player.jerseyNumber}</td>
                    {/* Position */}
                    <td>{player.position.code}</td>
                    {/* Shot (Left or Right) */}
                    <td>{}</td>
                    {/* Height */}
                    <td></td>
                    {/* Weight */}
                    <td></td>
                    {/* Birthdate */}
                    <td></td>
                    {/* Birthplace */}
                    <td></td>
                </tr>
            )) : null};
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default RosterTable;
