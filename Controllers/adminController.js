require('dotenv').config();
const { User } = require('../Models/usersModel');
const { Event } = require('../Models/eventsModel');
const { Restaurant, Restaurant } = require('../Models/restaurantModel');
const e = require('express');

const createRestaurant = async (req, res) => {
  try {
    const {Title, Information1, Information2, Menu} = req.body
    const restaurant = await Restaurant.findOne({Title});
    if(restaurant){
      return res.status(400).json({message: 'the restaurant already exist'});
    }else if(!restaurant){
      const newRestaurant = new Restaurant ({
        Title,
        Information1,
        Information2,
        Menu
      });
      await newRestaurant.save();
      res.status(200).json({message: 'the restaurant was created successfully'});
    };
  } catch (error) {
    res.status(500).json({message: 'we cannot create the restaurant, sorry for the problems', error: error.message});
  };
};
const createEvent = async (req, res) => {
  try {
    const {} = req.body;
    const event =  await Event.findOne({Title});
    if(event){
      return res.status(400).json({message:''});
    }else if(!event){
      const newEvent = new Event({
        Title,
        Information1
      });
      await newEvent.save();
      res.status(200).json({message: 'the Event was created successfully'}); 
    };
  } catch (error) {
    res.status(500).json({message: 'we cannot create the Event, sorry for the problems', error: error.message});
  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const deleteRestaurant = async (req,res) => {
  try {
    
  } catch (error) {
    
  };
};
const deleteEvent = async (req, res) => {
  try {

  } catch (error) {

  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const getAllUsers = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};
const getAllRestaurants = async (req,res) => {
  try {
    
  } catch (error) {
    
  };
};
const getAllEvents = async (req,res) => {
  try {
    
  } catch (error) {
    
  };
};