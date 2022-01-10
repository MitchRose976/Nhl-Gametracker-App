const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const ItemSchema = new Schema({
    playerInfo: {
        type: 'object',
        required: true
    },
    playerStats: {
        type: 'object',
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);