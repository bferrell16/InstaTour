var express = require('express');
var router = express.Router();

//item model
const Item = require('../models/Item');

// @route GET items
// @description get all items
// @access public
router.get('/', (req, res) => {
  Item.find((err,data) => {
    if(err) {
      return res.json({sucess: false, error:err});
    } else {
      return res.json({sucess:true, info:data});
    }
  })
});

router.post('/', (req, res) => {
  let d = new Item();
  d.lat = 38.7459467;
  d.lng = -76.5465889;
  d.icon = "/art.svg"
  d.title = "Test Art"
  d.insta = "https://www.instagram.com/p/CByvm3wlu_I/"
  d.approved = true;

  d.save((err) => {
    if(err) return res.json({sucess:false, error:err});
    return res.json({sucess:true});
  });
});

module.exports = router;
