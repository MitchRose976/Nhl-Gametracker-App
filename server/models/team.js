const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const teamSchema = new Schema({
    teamId: {
        type: 'number',
        required: [true, 'Team ID is required']
    },
    teamName: {
        type: 'string',
        required: [true, 'Team Name is required']
    }, 
    teamAbbreviation: {
        type: 'string',
        required: [true, 'Team Abbreviation is required']
    },
    teamDivision: {
        type: 'object',
        required: [true, 'Team Division is required']
    },
    teamConference: {
        type: 'object',
        required: [true, 'Team Division is required']
    },
    teamVenue: {
        type: 'object',
        required: [true, 'Team Venue is required']
    },
    firstYearOfPlay: {
        type: 'string',
        required: [true, 'First Year of Play is required']
    },
    teamLogoUrl: {
        type: 'string',
        required: [true, 'Team Logo URL is required']
    }
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;

/*

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
              `https://statsapi.web.nhl.com/api/v1/people/${player.person.id}`
            )
          )
        );
        let allPlayerHeadshots = await Promise.all(playerHeadshotPromises).then(
          (response) => {
              return response;
          }
        ).catch(err => console.log(err));
        // console.log(playerPics.getPlayerMugshot({
        //     name: 'Auston Matthews',
        //     team: 'tor',
        //     season: '20212022'
        // }))
        //allPlayerHeadshots.map(headshot => headshot.data.people.currentTeam.id);
        //console.log("allPlayerHeadshots: ", allPlayerHeadshots.length);
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
*/