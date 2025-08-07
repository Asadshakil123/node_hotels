const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


//Post method for MenuItems
router.post('/', async(req, res) =>{
  try{
    const Menudata = req.body;
    const newMenuItem = new MenuItem(Menudata);
    const response = await newMenuItem.save();
    console.log("Menu items added Successfully!!");
    res.status(200).json(response);
  }catch(err){
      console.log(err);
  res.status(500).json({error: 'Internal server error'});
  }
})


//GET method for menu item
router.get('/', async (req, res) => {
  try{
    const data = await MenuItem.find();
    console.log("data fetched!");
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

module.exports = router;

