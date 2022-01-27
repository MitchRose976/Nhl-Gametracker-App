const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const playerSchema = new Schema({
    playerInfo: {
        type: 'object',
        required: [true, 'Player info is required']
    },
    playerStats: {
        type: 'object',
        required: [true, 'Player stats are required']
    }, 
    playerHeadshot: {
        type: 'string',
        required: [true, 'Player headshot is required']
    }
});

const Player = mongoose.model('players', playerSchema);

module.exports = Player;