const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const Player = require("../models/player");
const axios = require("axios");
const db = require("../config/keys").mongoURI;
const { postDataToMongoDB, getData } = require("./functions");

// current season
let currentYear = new Date().getFullYear();
let currentSeason = (currentYear - 1).toString().concat(currentYear);
// Increment the season year by 1 to get latest season stats
// 2021/2022 => 2022/2023
let newSeasonStart = new Date().toLocaleDateString();
if (newSeasonStart === `7/15/${currentYear}`) {
  currentSeason = currentYear.toString().concat(currentYear + 1);
}

const seed = async () => {
  // Set up new client
  const client = new MongoClient(db);

  try {
    // Connect to MongoDB
    await client
      .connect()
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.log(err));

    // Get all teams from 'teams' collection in MongoDB
    let allTeams = await client
      .db("myFirstDatabase")
      .collection("teams")
      .find()
      .toArray();

    // push a promise for each teams roster to array
    let rosterPromises = [];
    await allTeams.forEach((team) => {
      rosterPromises.push(
        axios.get(
          `https://statsapi.web.nhl.com/api/v1/teams/${team.teamId}/roster`
        )
      );
    });
    // promise.all to get all teams rosters
    let allRosters = await Promise.all(rosterPromises).then((response) => {
      return response;
    });
    allRosters = allRosters.map((roster) => roster.data.roster);
    // Push all players in league to 1 array
    let allPlayerInfo = [];
    for (let i = 0; i < allRosters.length; i++) {
      for (let j = 0; j < allRosters[i].length; j++) {
        allPlayerInfo.push(allRosters[i][j]);
      }
    }
    // push a promise for each players stats and biography to arrays
    let playerStatsPromises = [];
    let fullPlayerInfoPromises = [];
    allPlayerInfo.forEach((player) => {
      fullPlayerInfoPromises.push(
        axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${player.person.id}`
        )
      );
      playerStatsPromises.push(
        axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats?stats=statsSingleSeason&season=${currentSeason}`
        )
      );
    });
    // Fetch all player data from promises array for stats
    let allPlayerStats = await Promise.all(playerStatsPromises).then(
      response => {
        return response;
      }
    );
    allPlayerStats = allPlayerStats.map(
      (player) => player.data.stats[0].splits[0]
    );
    // Fetch all player data from promises array for biography
    let allPlayerBios = await Promise.all(fullPlayerInfoPromises).then(
      response => {
        return response;
      }
    )
    allPlayerBios = allPlayerBios.map(
      player => player.data.people
    );
    // Loop through array of stats/bio's for each player
    let players = [];
    for (let i = 0; i < allPlayerInfo.length; i++) {
      // Make Player model of each player
      let player = new Player({
        playerInfo: allPlayerBios[i],
        playerStats: allPlayerStats[i],
        playerHeadshot: `http://nhl.bamcontent.com/images/headshots/current/168x168/${allPlayerBios[i][0].id}.jpg`
      });
      players.push(player);
    }
    
    // Post data to "players" collection in mongoDB
    let database = 'myFirstDatabase'
    let collection = 'players'
    //await postDataToMongoDB(client, database, collection, players);

  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
seed().catch((err) => console.log(err));
