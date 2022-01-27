const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
//const Player = require("./config/keys");
const Team = require("../models/team");
const db = require("../config/keys").mongoURI;
const axios = require("axios");


const getTeamsUrl = "https://statsapi.web.nhl.com/api/v1/teams";

const getData = async () => {
    let data = await axios.get(getTeamsUrl).then(response => response.data.teams);
    return data;
  };
  
  const postDataToMongoDB = async (client, data) => {
    const results = await client
      .db("myFirstDatabase")
      .collection("teams")
      .insertMany(data);
  
    console.log(`${results.insertedCount} new teams added`);
    console.log("Result IDs: ", results.insertedIds);
  };



const seed = async () => {
  // Set up new client
  const client = new MongoClient(db);

  try {
    // Connect to MongoDB
    await client
      .connect()
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.log(err));

    // get data from NHL api
    let data = await getData()
    console.log(data);
    // array to hold model of data based on Team schema for each team
    let teamData = [];
    // push every teams data as a Team model to array
    // data.forEach(team => {
    //     let newTeam = new Team({
    //         teamId: team.id,
    //         teamName: team.name,
    //         teamAbbreviation: team.abbreviation,
    //         teamDivision: team.division,
    //         teamConference: team.conference,
    //         teamVenue: team.venue,
    //         firstYearOfPlay: team.firstYearOfPlay,
    //         teamLogoUrl: `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`
    //     })
    //     teamData.push(newTeam);
    // })

    // Post data to "teams" collection in mongoDB
    //await postDataToMongoDB(client, teamData);
   


  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
seed().catch((err) => console.log(err));

