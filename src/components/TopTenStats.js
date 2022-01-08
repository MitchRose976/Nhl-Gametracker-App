import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Container from "../UX/Container";

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
      currentSeason = (currentYear).toString().concat(currentYear + 1);
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
        let allRosters = await Promise.all(rosterPromises)
        .then((response) => {
            return response;
        });
        allRosters = allRosters.map(roster => roster.data.roster);
        // Push all players in league to 1 array
        for (let i = 0; i < allRosters.length; i++) {
            for (let j = 0; j < allRosters[i].length; j++) {
                allPlayerInfo.push(allRosters[i][j]);
            }
        }
        //console.log("allPlayers: ", allPlayerInfo);
        // Fetch stats for every player in the league
        allPlayerInfo.forEach(player => 
            playerStatsPromises.push(
                axios.get(
                    `https://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats?stats=statsSingleSeason&season=${currentSeason}`
                )
            )
        );
        let allPlayerStats = await Promise.all(playerStatsPromises)
        .then((response) => {
            return response;
        })
        allPlayerStats = allPlayerStats.map(player => player.data.stats[0].splits[0]);
        // console.log("allPlayerStats: ", allPlayerStats);
        // Loop through array of stats for each player
        for (let i = 0; i < allPlayerInfo.length; i++) {
            let player = {
                playerInfo: allPlayerInfo[i],
                playerStats: allPlayerStats[i]
            }
            players.push(player);
        }
        //console.log("players: ", players);
        setAllPlayers(players);
      };
      getRoster();

    }); // end
  }, [getallTeamsURL]);

  
  if (allPlayers) {
    console.log("allPlayers: ", allPlayers);
      // PLAYERS
      // Top 10 Points
    //   let top10Points = [];
    //   for (let i = 0; i < allPlayers.length; i++) {
    //         let biggest = 0;
    //         if (allPlayers[i].playerStats.stat.points > biggest) {
    //             biggest = allPlayers[i];
    //         }
    //   }
      //console.log("top 10 points: ", top10Points);
      // Top 10 Goals
      // Top 10 Assists
      // Top 10 +/-
      // Top 10 Penalty Minutes
      // Top 10 Hits
      // Top 10 Time on Ice
      // Top 10 Time on Ice - Per Game 
      // Top 10 Time on Ice - Short Handed
      // Top 10 Time on Ice - Powerplay
      // Top 10 Powerplay Goals
      // Top 10 Short Handed Goals
      // Top 10 Powerplay Points
      // Top 10 Short Handed Points
      // Top 10 Face Off %

      // GOALIES
      // Top 10 Save Percentage
      // Top 10 Goals Against Average
      // Top 10 Wins
  }
  

  

  return <Container></Container>;
}

export default TopTenStats;
