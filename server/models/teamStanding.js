const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamStandingSchema = new Schema({
    teamID: {
        type: 'number',
        required: [true, 'Team ID is required']
    },
    teamName: {
        type: 'string',
        required: [true, 'Team Name is required']
    }, 
    gamesPlayed: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    wins: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    losses: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    overtimeLosses: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    points: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    goalsFor: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    goalsAgainst: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    goalsDifferencial: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    streak: {
        type: 'object',
        required: [true, 'Team Name is required']
    },
    winPercentage: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
    divisionHomeRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    divisionAwayRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    divisionLast10Rank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    divisionPowerplayRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    conferenceRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    conferenceHomeRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    conferenceAwayRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    conferenceLast10Rank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    conferencePowerplayRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    leagueRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    leagueHomeRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    leagueAwayRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    leagueLast10Rank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    leaguePowerplayRank: {
        type: 'string',
        required: [true, 'Team Name is required']
    },
    regularWins: {
        type: 'number',
        required: [true, 'Team Name is required']
    },
});

const teamStanding = mongoose.model('standing', teamStandingSchema);

module.exports = teamStanding;