import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import Container from "../UX/Container";

const RosterTable = () => {
  // This variable is controlled by state and will change to the id of whatever team the user submits
  let teamIndex = 10;
  let url = `https://statsapi.web.nhl.com/api/v1/teams/${teamIndex}?expand=team.roster`;
  // State to hold each player bio (height, weight, #, birthplace, birthdate etc.)
  const [playerInfo, setPlayerInfo] = useState(null);
  // State to hold all players stats (games played, goals, assists, hits, blocked shots etc.)
  const [playerStats, setPlayerStats] = useState(null);
  //const [playerData, setplayerData] = useState(null);
  // current season
  let currentYear = new Date().getFullYear();
  let currentSeason = currentYear.toString().concat(currentYear + 1);
  // 1st argument - function to run when monitored variable changes
  // 2nd argument - variable to monitor
  // Fetch API from NHL
  let playerData;

  useEffect(() => {
    let result;
    let playerInfoPromises = [];
    let playerStatsPromises = [];
    axios.get(url).then((response) => {
      // Destructure promise to get the team roster
      result = response.data.teams[0].roster.roster;
      // Push a promise to array for each player on the roster to fetch their info
      result.forEach((data) =>
        playerInfoPromises.push(
          axios.get(
            `https://statsapi.web.nhl.com/api/v1/people/${data.person.id}`
          )
        )
      );
      // Push a promise to array for each player on the roster to fetch their stats
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
    });
  }, [url]);

  // Create array and loop through team roster and push a <tr> for each player
  // to hold their info and stats
  let rows = [];
  if (playerInfo && playerStats) {
    for (let i = 0; i < playerInfo.length; i++) {
      rows.push(
        <tr key={parseInt(playerInfo[i].id)}>
          {/* Name */}
          <td>{playerInfo[i].fullName}</td>
          {/* # */}
          <td>{playerInfo[i].primaryNumber}</td>
          {/* Position */}
          <td>{playerInfo[i].primaryPosition.code}</td>
          {/* Shot (Left or Right) */}
          <td>{playerInfo[i].shootsCatches}</td>
          {/* Height */}
          <td>{playerInfo[i].height}</td>
          {/* Weight */}
          <td>{playerInfo[i].weight}</td>
          {/* Birthdate */}
          <td>{playerInfo[i].birthDate}</td>
          {/* Birthplace */}
          {playerInfo[i].birthStateProvince ? (
            <td>{`${playerInfo[i].birthCity}, ${playerInfo[i].birthStateProvince}, ${playerInfo[i].birthCountry}`}</td>
          ) : (
            <td>{`${playerInfo[i].birthCity}, ${playerInfo[i].birthCountry}`}</td>
          )}
          {/* GP (Games Played) */}
          <td>{playerStats[i] ? playerStats[i].stat.games : "N/A"}</td>
          {/* G (Goals) */}
          <td>{playerStats[i] ? playerStats[i].stat.goals : "N/A"}</td>
          {/* A (Assists) */}
          <td>{playerStats[i] ? playerStats[i].stat.assists : "N/A"}</td>
          {/* P (Points) */}
          <td>{playerStats[i] ? playerStats[i].stat.points : "N/A"}</td>
          {/* +/- (plus/minus) */}
          <td>{playerStats[i] ? playerStats[i].stat.plusMinus : "N/A"}</td>
          {/* PiM (Penalty in Minutes) */}
          <td>{playerStats[i] ? playerStats[i].stat.penaltyMinutes : "N/A"}</td>
          {/* Hits */}
          <td>{playerStats[i] ? playerStats[i].stat.hits : "N/A"}</td>
          {/* ToI (Total Time on Ice) */}
          <td>{playerStats[i] ? playerStats[i].stat.timeOnIce : "N/A"}</td>
          {/* ToI/G (Time on Ice per Game) */}
          <td>{playerStats[i] ? playerStats[i].stat.timeOnIcePerGame : "N/A"}</td>
          {/* ToI/SH (Time on Ice Short Handed per Game) */}
          <td>{playerStats[i] ? playerStats[i].stat.shortHandedTimeOnIcePerGame : "N/A"}</td>
          {/* ToI/PP (Time on Ice Powerplay per Game) */}
          <td>{playerStats[i] ? playerStats[i].stat.powerPlayTimeOnIcePerGame : "N/A"}</td>
          {/* PPG (Powerplay Goals) */}
          <td>{playerStats[i] ? playerStats[i].stat.powerPlayGoals : "N/A"}</td>
          {/* PPP (Powerplay Points) */}
          <td>{playerStats[i] ? playerStats[i].stat.powerPlayPoints : "N/A"}</td>
          {/* FO% (Faceoff Percentage) */}
          <td>{playerStats[i] ? playerStats[i].stat.faceOffPct : "N/A"}</td>
          {/* S% (Shooting Percentage) */}
          <td>{playerStats[i] ? playerStats[i].stat.shotPct : "N/A"}</td>
          {/* SB (Shots Blocked) */}
          <td>{playerStats[i] ? playerStats[i].stat.blocked : "N/A"}</td>
        </tr>
      );
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
      {/* Container to display rosters */}
      <Container
        height="35rem"
        width="90%"
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
            {rows ? rows : "Error while loading data"}
            ;
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default RosterTable;
