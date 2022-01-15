const mongoose = require("mongoose");
const Player = require("./config/keys");
const db = require("./config/keys").mongoURI;
const axios = require("axios");
//const fetch = require('node-fetch');

let resultData;
let saveCounter = 0;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Fetch all teams in league
const getAllTeamsURL = "https://statsapi.web.nhl.com/api/v1/teams";
// current season
let currentYear = new Date().getFullYear();
let currentSeason = (currentYear - 1).toString().concat(currentYear);
// Increment the season year by 1 to get latest season stats
// 2021/2022 => 2022/2023
let newSeasonStart = new Date().toLocaleDateString();
if (newSeasonStart === `7/15/${currentYear}`) {
  currentSeason = currentYear.toString().concat(currentYear + 1);
}

const getPlayers = async () => {
  let allTeams = [];
  let rosterPromises = [];
  let allPlayerInfo = [];
  let playerHeadshotPromises = [];
  let playerStatsPromises = [];
  let players = [];
  try {
    await axios.get(getAllTeamsURL).then((response) => {
      allTeams = response.data.teams;
      allTeams.forEach((team) => {
        rosterPromises.push(
          axios.get(
            `https://statsapi.web.nhl.com/api/v1/teams/${team.id}/roster`
          )
        );
      });
      // console.log("allTeams: ", allTeams);
      // console.log("rosterPromises: ", rosterPromises);
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
        //console.log("allPlayerStats: ", allPlayerStats);
        // Fetch all player headshots
        allPlayerInfo.forEach((player) =>
          playerHeadshotPromises.push(
            axios.get(
              `http://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`
            )
          )
        );
        let allPlayerHeadshots = await Promise.all(playerHeadshotPromises).then(
          (response) => {
              return response;
          }
        ).catch(err => console.log(err));
        //allPlayerHeadshots.map(headshot => headshot.data);
        console.log("allPlayerHeadshots: ", allPlayerHeadshots.length);
        // Loop through array of stats for each player
        for (let i = 0; i < allPlayerInfo.length; i++) {
          let player = {
            playerInfo: allPlayerInfo[i],
            playerStats: allPlayerStats[i],
          };
          players.push(player);
        }
        //console.log("players: ", players);
      };
      getRoster();
    });
  } catch (error) {
    console.log(error);
  }
};
getPlayers();
