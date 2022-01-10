const express = require('express');
const router = express.Router();

// Item Model 
const Item = require('../../models/Item');

// @route GET api/items
// @desc GET all items
// @access public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items));
})

// @route POST api/items
// @desc POST an item
// @access public
router.post('/', (req, res) => {
    const newItem = new Item({
        playerInfo: req.body.playerInfo,
        playerStats: req.body.playerStats
    });

    newItem.save()
    .then(() => res.json(newItem));
})

// @route DELETE api/items
// @desc DELETE an item
// @access public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})


module.exports = router;