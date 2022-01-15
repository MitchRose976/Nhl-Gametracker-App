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
    playerPicture: {
        type: 'object',
        required: false
    }
});

const Player = mongoose.model('player', playerSchema);

module.exports = Player;