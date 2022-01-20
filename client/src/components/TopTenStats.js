import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Container from "../UX/Container";
import { Accordion, Table } from "react-bootstrap";
import players, { getPlayerId, getPlayerMugshot } from '@nhl-api/players';

function TopTenStats() {
  // Fetch all teams in league
  const getallTeamsURL = "https://statsapi.web.nhl.com/api/v1/teams";
  // current season
  let currentYear = new Date().getFullYear();
  let currentSeason = (currentYear - 1).toString().concat(currentYear);
  // Increment the season year by 1 to get latest season stats
  // 2021/2022 => 2022/2023
  let newSeasonStart = new Date().toLocaleDateString();
  if (newSeasonStart === `7/15/${currentYear}`) {
    currentSeason = currentYear.toString().concat(currentYear + 1);
  }
  // State to hold all state for players in league
  const [allPlayers, setAllPlayers] = useState(null);
  useEffect(() => {
    let allTeams = [];
    let rosterPromises = [];
    let allPlayerInfo = [];
    let playerStatsPromises = [];
    let players = [];
    axios.get(getallTeamsURL).then((response) => {
      allTeams = response.data.teams;
      //console.log("allTeams: ", allTeams);
      allTeams.forEach((team) => {
        rosterPromises.push(
          axios.get(
            `https://statsapi.web.nhl.com/api/v1/teams/${team.id}/roster`
          )
        );
      });
      //console.log("rosterPromises: ", rosterPromises);
      // Fetch each roster in league
      let getRoster = async () => {
        let allRosters = await Promise.all(rosterPromises).then((response) => {
          return response;
        });
        allRosters = allRosters.map((roster) => roster.data.roster);
        //console.log("allRosters: ", allRosters);
        // Push all players in league to 1 array
        for (let i = 0; i < allRosters.length; i++) {
          for (let j = 0; j < allRosters[i].length; j++) {
            allPlayerInfo.push(allRosters[i][j]);
          }
        }
        //console.log("allPlayers: ", allPlayerInfo);
        // Fetch stats for every player in the league
        allPlayerInfo.forEach((player) =>
          playerStatsPromises.push(
            axios.get(
              `https://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats?stats=statsSingleSeason&season=${currentSeason}`
            )
          )
        );
        let allPlayerStats = await Promise.all(playerStatsPromises).then(
          (response) => {
            return response;
          }
        );
        allPlayerStats = allPlayerStats.map(
          (player) => player.data.stats[0].splits[0]
        );
        // console.log("allPlayerStats: ", allPlayerStats);
        // Loop through array of stats for each player
        for (let i = 0; i < allPlayerInfo.length; i++) {
          //console.log(allPlayerInfo[i]);
          let player = {
            playerInfo: allPlayerInfo[i],
            playerStats: allPlayerStats[i],
          };
          players.push(player);
        }
        //console.log("players: ", players);
        setAllPlayers(players);
      };
      getRoster();
    }); // end
  }, []);


  const [pointLeaders, setPointLeaders] = useState(null);


  /*
  if (allPlayers) {
    
    // PLAYERS
    // Top 10 Points
    let top10Points = [];
    const getTop10Points = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.points !== undefined
        );
      })
      .sort((a, b) => b.playerStats.stat.points - a.playerStats.stat.points);
    for (let i = 0; i < 10; i++) {
      top10Points.push(
        <tr key={getTop10Points[i].playerInfo.person.id}>
          <td>{getTop10Points[i].playerInfo.fullName}</td>
          <td>{getTop10Points[i].playerStats.stat.points}</td>
        </tr>
      );
    }
    setPointLeaders(top10Points);
    //console.log("getTop10Points: ", getTop10Points);
    // Top 10 Goals
    let top10Goals = [];
    const getTop10Goals = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.goals !== undefined
        );
      })
      .sort((a, b) => b.playerStats.stat.goals - a.playerStats.stat.goals);
    for (let i = 0; i < 10; i++) {
      top10Goals.push(
        <tr key={getTop10Goals[i].playerInfo.person.id}>
          <td>{getTop10Goals[i].playerInfo.fullName}</td>
          <td>{getTop10Goals[i].playerStats.stat.goals}</td>
        </tr>
      );
    }
    //console.log("getTop10Goals: ", getTop10Goals);
    // Top 10 Assists
    const getTop10Assists = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.assists !== undefined
        );
      })
      .sort((a, b) => b.playerStats.stat.assists - a.playerStats.stat.assists);
    //console.log("getTop10Assists: ", getTop10Assists);
    // Top 10 +/-
    const getTop10PlusMinus = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.plusMinus !== undefined
        );
      })
      .sort(
        (a, b) => b.playerStats.stat.plusMinus - a.playerStats.stat.plusMinus
      );
    //console.log("getTop10PlusMinus: ", getTop10PlusMinus);
    // Top 10 Penalty Minutes
    const getTop10PenaltyMinutes = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.penaltyMinutes !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.penaltyMinutes - a.playerStats.stat.penaltyMinutes
      );
    //console.log("getTop10PenaltyMinutes: ", getTop10PenaltyMinutes);
    // Top 10 Hits
    const getTop10Hits = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.hits !== undefined
        );
      })
      .sort((a, b) => b.playerStats.stat.hits - a.playerStats.stat.hits);
    //console.log("getTop10Hits: ", getTop10Hits);
    // Top 10 Time on Ice
    const getTop10TimeOnIce = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.timeOnIce !== undefined
        );
      })
      .sort(
        (a, b) => b.playerStats.stat.timeOnIce - a.playerStats.stat.timeOnIce
      );
    //console.log("getTop10TimeOnIce: ", getTop10TimeOnIce);
    // Top 10 Time on Ice - Per Game
    const getTop10TimeOnIcePerGame = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.timeOnIcePerGame !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.timeOnIcePerGame -
          a.playerStats.stat.timeOnIcePerGame
      );
    //console.log("getTop10TimeOnIcePerGame: ", getTop10TimeOnIcePerGame);
    // Top 10 Time on Ice - Short Handed
    const getTop10TimeOnIceShortHanded = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.shortHandedTimeOnIce !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.shortHandedTimeOnIce -
          a.playerStats.stat.shortHandedTimeOnIce
      );
    //console.log("getTop10TimeOnIceShortHanded: ", getTop10TimeOnIceShortHanded);
    // Top 10 Time on Ice - Powerplay
    const getTop10TimeOnIcePowerplay = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.powerPlayTimeOnIce !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.powerPlayTimeOnIce -
          a.playerStats.stat.powerPlayTimeOnIce
      );
    //console.log("getTop10TimeOnIcePowerplay: ", getTop10TimeOnIcePowerplay);
    // Top 10 Powerplay Goals
    const getTop10PowerplayGoals = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.powerPlayGoals !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.powerPlayGoals - a.playerStats.stat.powerPlayGoals
      );
    //console.log("getTop10PowerplayGoals: ", getTop10PowerplayGoals);
    // Top 10 Short Handed Goals
    const getTop10ShortHandedGoals = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.shortHandedGoals !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.shortHandedGoals -
          a.playerStats.stat.shortHandedGoals
      );
    //console.log("getTop10ShortHandedGoals: ", getTop10ShortHandedGoals);
    // Top 10 Powerplay Points
    const getTop10PowerplayPoints = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.powerPlayPoints !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.powerPlayPoints -
          a.playerStats.stat.powerPlayPoints
      );
    //console.log("getTop10PowerplayPoints: ", getTop10PowerplayPoints);
    // Top 10 Short Handed Points
    const getTop10ShortHandedPoints = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.shortHandedPoints !== undefined
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.shortHandedPoints -
          a.playerStats.stat.shortHandedPoints
      );
    //console.log("getTop10ShortHandedPoints: ", getTop10ShortHandedPoints);
    // Top 10 Face Off %
    const getTop10FaceoffPercentage = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.faceOffPct !== undefined
        );
      })
      .sort(
        (a, b) => b.playerStats.stat.faceOffPct - a.playerStats.stat.faceOffPct
      );
    //console.log("getTop10FaceoffPercentage: ", getTop10FaceoffPercentage);

    // GOALIES (Above 5 games played)
    // Top 10 Save Percentage
    const getTop10SavePercentage = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.savePercentage !== undefined &&
          player.playerStats.stat.games > 5
        );
      })
      .sort(
        (a, b) =>
          b.playerStats.stat.savePercentage - a.playerStats.stat.savePercentage
      );
    //console.log("getTop10SavePercentage: ", getTop10SavePercentage);
    // Top 10 Goals Against Average
    const getTop10GoalsAgainstAverage = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.goalAgainstAverage !== undefined &&
          player.playerStats.stat.games > 5
        );
      })
      .sort(
        (a, b) =>
          a.playerStats.stat.goalAgainstAverage -
          b.playerStats.stat.goalAgainstAverage
      );
    //console.log("getTop10GoalsAgainstAverage: ", getTop10GoalsAgainstAverage);
    // Top 10 Wins
    const getTop10Wins = allPlayers
      .filter((player) => {
        return (
          player.playerStats !== undefined &&
          player.playerStats.stat.wins !== undefined &&
          player.playerStats.stat.games > 5
        );
      })
      .sort((a, b) => b.playerStats.stat.wins - a.playerStats.stat.wins);
    //console.log("getTop10Wins: ", getTop10Wins);
  }

*/

// const image = getPlayerMugshot({
//   name: 'Auston Matthews',
//   team: 'TOR',
//   season: '20212022'
// })
// console.log("image: ", image);

// const austonID = getPlayerId('auston mathews');
// console.log("austonID: ", austonID);

// let allHomies = players.map(p => p);
// console.log("allHomies: ", allHomies)

  return (
    <Container
      width="50%"
      height="50rem"
      backgroundColor="white"
      margin="2rem 0"
    >
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Top 10 Points</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default TopTenStats;
