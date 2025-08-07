const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//Post route to add a person
router.post('/', async(req, res) => {
  try{
 const data = req.body;

  //Create a new person document using the mongoose model
  const newPerson = new Person(data);

  //save the new person to the database
  const response = await newPerson.save();
  console.log("data saved!");
  res.status(200).json(response);
 }
 catch(err){
  console.log(err);
  res.status(500).json({error: 'Internal server error'});
}});


//GET method to add the person
router.get('/', async (req, res) =>{
  try{
    const data = await Person.find();
    console.log("data feteched!");
    res.status(200).json(data);
  }catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal server error'});
  }
})


//GET method for Person work type
router.get('/:workType', async(req, res) => {
  try{
    const workType = req.params.workType;
    if(workType == 'Chef' || workType == 'manager' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log("response fetched!");
      res.status(200).json(response);
    }else{
      res.status(404).json({error : 'Invalid workType.'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

//Update method for person
router.put('/:id', async(req, res)=> {
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new : true,
      runValidators: true,
    });

    if(!response){
      return res.status(404).json({error: 'Person not found!'});
    }
    console.log("data Updated.");
    res.status(200).json(response);
  }catch(err){
     console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})


//delete Route for Person
router.delete('/:id', async(req, res)=>{
try{
  const personId = req.params.id;

//Asuming you have the person model
const response = await Person.findByIdAndDelete(personId);
   if(!response){
      return res.status(404).json({error: 'Person not found!'});
    }
      console.log("data Deleted!");
      res.status(200).json({message: 'Person deleted Successfully!'});
}catch(err){
   console.log(err);
    res.status(500).json({error: 'Internal server error'});
}
})

module.exports = router;