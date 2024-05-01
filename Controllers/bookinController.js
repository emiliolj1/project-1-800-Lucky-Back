require('dotenv').config();
const { Restaurant } = require('../Models/restaurantModel');

const Bookins = async (req, res) => {
  try {
    const {Name, Email, Date, Time, Restaurants} = req.body 
    let dateString = Date;
    let timeString = Time;
    let concat =  dateString + 'T' + timeString;
    let DateISO = new Date(concat);
    let now = new Date();
    let Restaurants1 =  await Restaurant.findOne({Title:Restaurants});
    if(DateISO < now){
      return res.status(400).json({message: 'you cannot make bookins in the past.'});
    };
    if(Restaurants1.Title === Restaurants){
      Restaurant.Array.push({ name: Name, email: Email, date: DateISO});
      await Restaurant.save();
      res.status(200).json({message:'the bookin was created succesfully!'});
    }else{
      res.status(404).json({message:'we didnt find the restaurant.'})
    };
  } catch (error) {
    res.status(500).json({message:'we cannot create the bookin, sorry for the problems', error: error.message});
  };
};

const deleteBookin = async (req, res) => {
  try {
    const {id, RestaurantName} = req.body;
    const deleteOperation = {
      $pull: {
        Array: {_id:id}
      }
    }
    await Restaurant.findOneAndUpdate(
      {Title: RestaurantName},
      deleteOperation,
      {new: true}
    );
    res.status(200).json({message: 'succesfully deleted'});
  } catch (error) {
    res.status(500).json({message:'we cannot deleted the bookin, sorry for the problems', error: error.message});
  };
};

module.exports = {Bookins, deleteBookin}