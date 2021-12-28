import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import Container from "../UX/Container";

const RosterTable = () => {
  // This variable is controlled by state and will change to the id of whatever team the user submits
  let teamIndex = 9;
  let url = `https://statsapi.web.nhl.com/api/v1/teams/${teamIndex}?expand=team.roster`;
  // State to hold each player bio (height, weight, #, birthplace, birthdate etc.)
  const [playerInfo, setPlayerInfo] = useState(null);
  // State to hold all players stats (games played, goals, assists, hits, blocked shots etc.)
  const [playerStats, setPlayerStats] = useState(null);
  const [playerData, setplayerData] = useState(null);
  // current season
  let currentYear = new Date().getFullYear();
  let currentSeason = currentYear.toString().concat(currentYear + 1);
  // 1st argument - function to run when monitored variable changes
  // 2nd argument - variable to monitor
  // Fetch API from NHL
  useEffect(() => {
    let result;
    let playerInfoPromises = [];
    let playerStatsPromises = [];
    axios.get(url)
    .then((response) => {
      // Destructure promise to get the team roster
      result = response.data.teams[0].roster.roster;
      // Push a promise for each player on the roster to fetch their info to array
      result.forEach((data) =>
        playerInfoPromises.push(
          axios.get(
            `https://statsapi.web.nhl.com/api/v1/people/${data.person.id}`
          )
        )
      );
      // Push a promise for each player on the roster to fetch their stats to array
      result.forEach((data) =>
        playerStatsPromises.push(
          axios.get(
            `https://statsapi.web.nhl.com/api/v1/people/${data.person.id}/stats?stats=statsSingleSeason&season=${currentSeason}`
          )
        )
      );
      // Fetch player bio using playerInfoPromises array
      let getPlayerInfo = async () => {
        let data = await Promise.all(playerInfoPromises);
        data = data.map((player) => player.data.people[0]);
        setPlayerInfo(data);
      };
      getPlayerInfo();
      // Fetch all playerStats using playerStatsPromises array
      let getPlayerStats = async () => {
        let data = await Promise.all(playerStatsPromises);
        data = data.map((player) => player.data.stats[0].splits[0]);
        setPlayerStats(data);
      };
      getPlayerStats();
    })
  }, [url]);

  if (playerInfo && playerStats) {
      let playerData = [playerInfo, playerStats];
      //console.log(playerData);
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
              <th>GP</th>
              <th>G</th>
              <th>A</th>
              <th>P</th>
              <th>+/-</th>
              <th>PiM</th>
              <th>Hits</th>
              <th>ToI</th>
              <th>ToI/G</th>
              <th>ToI/SH</th>
              <th>ToI/PP</th>
              <th>PPG</th>
              <th>PPP</th>
              <th>FO%</th>
              <th>S%</th>
              <th>SB</th>
            </tr>
          </thead>
          <tbody>
            {playerInfo && playerStats 
              ? playerInfo.map((player) => (
                  <tr key={parseInt(player.id)}>
                    {/* Name */}
                    <td>{player.fullName}</td>
                    {/* # */}
                    <td>{player.primaryNumber}</td>
                    {/* Position */}
                    <td>{player.primaryPosition.code}</td>
                    {/* Shot (Left or Right) */}
                    <td>{player.shootsCatches}</td>
                    {/* Height */}
                    <td>{player.height}</td>
                    {/* Weight */}
                    <td>{player.weight}</td>
                    {/* Birthdate */}
                    <td>{player.birthDate}</td>
                    {/* Birthplace */}
                    {player.birthStateProvince ? (
                      <td>{`${player.birthCity}, ${player.birthStateProvince}, ${player.birthCountry}`}</td>
                    ) : (
                      <td>{`${player.birthCity}, ${player.birthCountry}`}</td>
                    )}

                    {/* GP (Games Played) */}
                    <td></td>
                    {/* G (Goals) */}
                    <td></td>
                    {/* A (Assists) */}
                    <td></td>
                    {/* P (Points) */}
                    <td></td>
                    {/* +/- (plus/minus) */}
                    <td></td>
                    {/* PiM (Penalty in Minutes) */}
                    <td></td>
                    {/* Hits */}
                    <td></td>
                    {/* ToI (Total Time on Ice) */}
                    <td></td>
                    {/* ToI/G (Time on Ice per Game) */}
                    <td></td>
                    {/* ToI/SH (Time on Ice Short Handed per Game) */}
                    <td></td>
                    {/* ToI/PP (Time on Ice Powerplay per Game) */}
                    <td></td>
                    {/* PPG (Powerplay Goals) */}
                    <td></td>
                    {/* PPP (Powerplay Points) */}
                    <td></td>
                    {/* FO% (Faceoff Percentage) */}
                    <td></td>
                    {/* S% (Shooting Percentage) */}
                    <td></td>
                    {/* SB (Shots Blocked) */}
                    <td></td>
                  </tr>
                ))
              : null}
            ;
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default RosterTable;
