const express = require('express');
const router = express.Router();
const axios = require('axios');

// To find goalies, you must change the search filter for games played
// ex. Player.find({ "playerStats.stat.games" : {$gte: 10} })

// Item Model 
const Player = require('../../models/player');

// TOP 10 PLAYERS/GOALIES ROUTES

// @route GET api/items
// @desc Get All items
// @access public
router.get('/', (req, res) => {
    Team.find()
    .then(players => res.json(players));
});

// @route GET api/top10points
// @desc Get top 10 points
// @access public
router.get('/players/top10points', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.points" : -1 })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10goals
// @desc Get top 10 goals
// @access public
router.get('/players/top10goals', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.goals" : -1 })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10assists
// @desc Get top 10 assists
// @access public
router.get('/players/top10assists', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.assists" : -1 })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10plusminus
// @desc Get top 10 plus minus
// @access public
router.get('/players/top10plusminus', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.plusMinus" : -1 })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10penaltyminutes
// @desc Get top 10 penalty minutes
// @access public
router.get('/players/top10penaltyminutes', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.pim" : -1 })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10hits
// @desc Get top 10 hits
// @access public
router.get('/players/top10hits', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.hits" : -1 })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10totaltimeonice
// @desc Get top 10 total time on ice 
// @access public
router.get('/players/top10totaltimeonice', (req, res) => {
  Player.find({})
  .sort({"playerInfo.primaryPosition.type" : 1, "playerStats.stat.timeOnIce" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10timeonicepergame
// @desc Get top 10 time on ice per game
// @access public
router.get('/players/top10timeonicepergame', (req, res) => {
  Player.find({})
  .sort({"playerInfo.primaryPosition.type" : 1, "playerStats.stat.timeOnIcePerGame" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10timeoniceshorthanded
// @desc Get top 10 time on ice - short handed
// @access public
router.get('/players/top10timeoniceshorthanded', (req, res) => {
  Player.find({})
  .sort({"playerInfo.primaryPosition.type" : 1, "playerStats.stat.shortHandedTimeOnIce" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10timeonicepowerplay
// @desc Get top 10 time on ice - power play
// @access public
router.get('/players/top10timeonicepowerplay', (req, res) => {
  Player.find({})
  .sort({"playerInfo.primaryPosition.type" : 1, "playerStats.stat.powerPlayTimeOnIce" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10powerplaygoals
// @desc Get top 10 powerplay goals
// @access public
router.get('/players/top10powerplaygoals', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.powerPlayGoals" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10shorthandedgoals
// @desc Get top 10 shorthanded goals
// @access public
router.get('/players/top10shorthandedgoals', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.shortHandedGoals" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10powerplaypoints
// @desc Get top 10 powerplay points
// @access public
router.get('/players/top10powerplaypoints', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.powerPlayPoints" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10shorthandedpoints
// @desc Get top 10 short handed points
// @access public
router.get('/players/top10shorthandedpoints', (req, res) => {
  Player.find({})
  .sort({"playerStats.stat.shortHandedPoints" : -1})
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10faceoffpercentage
// @desc Get top 10 face off percentage
// @access public
router.get('/players/top10faceoffpercentage', (req, res) => {
  Player.find({})
  .sort({
         "playerInfo.primaryPosition.code" : 1,
         "playerStats.stat.faceOffPct" : -1
         })
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10savepercentage
// @desc Get top 10 save percentage
// @access public
router.get('/players/top10savepercentage', (req, res) => {
  Player.find( { "playerStats.stat.games" : {$gte: 10} })
  .sort({"playerStats.stat.savePercentage" : -1})
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10wins
// @desc Get top 10 wins
// @access public
router.get('/players/top10wins', (req, res) => {
  Player.find({})
  .sort( {"playerStats.stat.wins" : -1} )
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// @route GET api/top10goalsagainstaverage
// @desc Get top 10 goals against average
// @access public
router.get('/players/top10goalsagainstaverage', (req, res) => {
  Player.find({
    "playerInfo.primaryPosition.code" : 'G',
    "playerStats.stat.games" : {$gte: 10}
  })
  .sort( {"playerStats.stat.goalAgainstAverage" : 1} )
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  })
});

// POST/UPDATE/DELETE

// @route POST api/items
// @desc Create a player
// @access public
router.post('/', (req, res) => {
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
