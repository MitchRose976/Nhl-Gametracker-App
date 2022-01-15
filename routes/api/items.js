const express = require('express');
const router = express.Router();
const axios = require('axios');

// Item Model 
const Player = require('../../models/player');

// @route GET api/items
// @desc Get All items
// @access public
router.get('/', (req, res) => {
    Player.find()
    .then(players => res.json(players));
});

// @route POST api/items
// @desc Create a player
// @access public
router.post('/', (req, res) => {
    // Mongoose method creates AND saves
    Player.create({
        playerInfo: req.body.playerInfo,
        playerStats: req.body.playerStats
    })
      .then((player) => {
        res.send(player);
      })
      .catch((err) => res.status(404).json({ success: false }));
  });

// @route DELETE api/items/:id
// @desc Delete a player
// @access public
router.delete('/', (req, res) => {
// Mongoose method creates AND saves
    Player.findById(req.params.id)
    .then(player => player.remove().then(() => res.json({success: true})))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
