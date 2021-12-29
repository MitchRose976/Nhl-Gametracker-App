import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import Container from "../UX/Container";

// teamID is the state passed from the dropdown menu
const RosterTable = ({ teamId }) => {
  let url = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`;
  // State to hold each player bio (height, weight, #, birthplace, birthdate etc.)
  const [playerInfo, setPlayerInfo] = useState(null);
  // State to hold all players stats (games played, goals, assists, hits, blocked shots etc.)
  const [playerStats, setPlayerStats] = useState(null);
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
  let playerRows = [];
  let goalieRows = [];
  if (playerInfo && playerStats) {
    for (let i = 0; i < playerInfo.length; i++) {
      if (
        playerInfo[i].primaryPosition.type === "Forward" ||
        playerInfo[i].primaryPosition.type === "Defenseman"
      ) {
        playerRows.push(
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
            <td>
              {playerStats[i] ? playerStats[i].stat.penaltyMinutes : "N/A"}
            </td>
            {/* Hits */}
            <td>{playerStats[i] ? playerStats[i].stat.hits : "N/A"}</td>
            {/* ToI (Total Time on Ice) */}
            <td>{playerStats[i] ? playerStats[i].stat.timeOnIce : "N/A"}</td>
            {/* ToI/G (Time on Ice per Game) */}
            <td>
              {playerStats[i] ? playerStats[i].stat.timeOnIcePerGame : "N/A"}
            </td>
            {/* ToI/SH (Time on Ice Short Handed per Game) */}
            <td>
              {playerStats[i]
                ? playerStats[i].stat.shortHandedTimeOnIcePerGame
                : "N/A"}
            </td>
            {/* ToI/PP (Time on Ice Powerplay per Game) */}
            <td>
              {playerStats[i]
                ? playerStats[i].stat.powerPlayTimeOnIcePerGame
                : "N/A"}
            </td>
            {/* PPG (Powerplay Goals) */}
            <td>
              {playerStats[i] ? playerStats[i].stat.powerPlayGoals : "N/A"}
            </td>
            {/* SHG (Shorthanded Goals) */}
            <td>
              {playerStats[i] ? playerStats[i].stat.shortHandedGoals : "N/A"}
            </td>
            {/* PPP (Powerplay Points) */}
            <td>
              {playerStats[i] ? playerStats[i].stat.powerPlayPoints : "N/A"}
            </td>
            {/* SHP (Shorthanded Points) */}
            <td>
              {playerStats[i] ? playerStats[i].stat.shortHandedPoints : "N/A"}
            </td>
            {/* FO% (Faceoff Percentage) */}
            <td>{playerStats[i] ? playerStats[i].stat.faceOffPct : "N/A"}</td>
            {/* S% (Shooting Percentage) */}
            <td>{playerStats[i] ? playerStats[i].stat.shotPct : "N/A"}</td>
            {/* SB (Shots Blocked) */}
            <td>{playerStats[i] ? playerStats[i].stat.blocked : "N/A"}</td>
          </tr>
        );
      } else if (playerInfo[i].primaryPosition.type === "Goalie") {
        goalieRows.push(
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
            {/* GS (Games Started) */}
            <td>{playerStats[i] ? playerStats[i].stat.gamesStarted : "N/A"}</td>
            {/* Wins (Wins) */}
            <td>{playerStats[i] ? playerStats[i].stat.wins : "N/A"}</td>
            {/* Losses (Losses) */}
            <td>{playerStats[i] ? playerStats[i].stat.losses : "N/A"}</td>
            {/* T (Ties) */}
            <td>{playerStats[i] ? playerStats[i].stat.ties : "N/A"}</td>
            {/* OT (Overtime Losses) */}
            <td>{playerStats[i] ? playerStats[i].stat.ot : "N/A"}</td>
            {/* GAA (Goals Against Average) */}
            <td>{playerStats[i] ? playerStats[i].stat.goalAgainstAverage : "N/A"}</td>
            {/* SA (Shots Against) */}
            <td>{playerStats[i] ? playerStats[i].stat.shotsAgainst : "N/A"}</td>
            {/* GA (Goals Against) */}
            <td>{playerStats[i] ? playerStats[i].stat.goalsAgainst : "N/A"}</td>
            {/* S (Saves) */}
            <td>{playerStats[i] ? playerStats[i].stat.saves : "N/A"}</td>
            {/* SV% (Saves Percentage) */}
            <td>{playerStats[i] ? playerStats[i].stat.savePercentage : "N/A"}</td>
            {/* SO (Shutouts) */}
            <td>{playerStats[i] ? playerStats[i].stat.shutouts : "N/A"}</td>
            {/* ToI (Time on Ice) */}
            <td>{playerStats[i] ? playerStats[i].stat.timeOnIce : "N/A"}</td>
          </tr>
        )
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
      {/* Container to display rosters */}
      <Container
        height="35rem"
        width="100%"
        backgroundColor="rgb(255,255,255, 0.8)"
        margin="1rem 0 0 0"
        overflowX="auto"
      >
        {/* Table for Players */}
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
              <th>SHG</th>
              <th>PPP</th>
              <th>SHP</th>
              <th>FO%</th>
              <th>S%</th>
              <th>SB</th>
            </tr>
          </thead>
          <tbody>{playerRows ? playerRows : "Error while loading data"};</tbody>
        </Table>
        {/* Table for Goalies */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Goalie</th>
              <th>#</th>
              <th>Pos</th>
              <th>Shot</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Born</th>
              <th>Birthplace</th>
              <th>GP</th>
              <th>GS</th>
              <th>W</th>
              <th>L</th>
              <th>T</th>
              <th>OT</th>
              <th>GAA</th>
              <th>SA</th>
              <th>GA</th>
              <th>S</th>
              <th>SV%</th>
              <th>SO</th>
              <th>ToI</th>
            </tr>
          </thead>
          <tbody>{goalieRows ? goalieRows : "Error while loading data"};</tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default RosterTable;