var express = require('express');
var router = express.Router();

//item model
const Item = require('../models/Item');

// @route GET items
// @description get all items
// @access public
router.get('/', (req, res) => {
  Item.find((err,data) => { //Item.find({approved: true}, (err,data) => { to query only approved
    if(err) {
      return res.json({sucess: false, error:err});
    } else {
      return res.json({sucess:true, info:data});
    }
  })
});

// @route POST items
// @description add a new item
// @access public
router.post('/', (req, res) => {
  let d = new Item();
  d.lat = req.body.lat;
  d.lng = req.body.lng;
  d.icon = req.body.icon
  d.title = req.body.title
  d.insta = req.body.insta
  d.approved = req.body.approved;

  d.save((err) => {
    if(err) {
      console.log("Error Saving");
      return res.json({sucess:false, error:err});
    }
    return res.json({sucess:true});
  });
});

module.exports = router;
