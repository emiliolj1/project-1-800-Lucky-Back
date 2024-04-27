require('dotenv').config();
const { User } = require('../Models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addUser = async(req, res) => {
  try {
    const {Name, Email, Password, Role} = req.body;
    //using the model of ../Models/usersModel
    const newUser = new User({
      Name,
      Email,
      Password,
      Role
    });
    //using bcrypt to encrypt the password
    const saltRounds = 12
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(Password, salt);
    newUser.Password = hash;
    //then we save it in the data base
    await newUser.save();
    res.status(200).json({message: 'The user was created succesfully'});
  } catch (error) {
    res.status(500).json({message: 'we cant create the user, sorry for the problems.', error: error.message});
  };
};

const loginUser =  async (req,res) => { 
  try { 
    const {Email, Password, RepitPassword} = req.body;
    //finding the user by Email
    const user =  await User.findOne({ Email });
    if(!user){
      return res.status(404).json({message:'the user doesnt exist'})
    };
    //we check if the repitPassword is the same as password (doble validation)
    if(Password === RepitPassword){
      //if is the same we compare it with the password from the data base.
      const isMatch = bcrypt.compareSync(Password, user.Password)
      if(!isMatch){
        return res.status(400).json({message: 'invalid Password', error: error.message})
      };
    };
    //creating the accesToken
    const AccesToken =  jwt.sing(
      {
        id: user._id,
        Email: user.Email,
        Name: user.Name,
        Role: user.Role,
      },
      process.env.ACCESS_TOKEN_SECRETE,
      {
        expireIn:'300s'
      }
    );
    //using the refresh token to access into the pageweb
    const Refreshtoken = jwt.sing(
      {
        id: user._id,
        Email: user.Email,
        Name: user.Name,
        Role: user.Role,
      },
      process.env.REFRESH_TOKEN_SECRETE,
      {
        expireIn:'1d'
      }
    );
    //saving the refreshtoken in the user
    user.Refreshtoken = Refreshtoken;
    await user.save()

    res.cookie('RefreshToken', Refreshtoken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({AccesToken, message: 'Succesfull User Logged'});
  } catch (error) {
    res.status(500).json({message: 'we cant loggin you,  sorry for the problems.', error: error.message});
  };
};

const HandleLogOut = async (req, res) => {
  try {
    const cookies = req.params;
    if(!cookies?.Refreshtoken){
      return res.status(200).json({message: 'we cannot find the cookies', error: error.message});
    };
    const RefreshToken = cookies.RefreshToken;
    const user = await User.findOne({RefreshToken});
    if(!user){
      res.clearCookies('RefreshToken', {
        httpOnly: true, sameSite: 'None', secure: true
      });
    };
    user.RefreshToken = '';
    await user.save();
    res.clearCookies('RefreshToken', {
      httpOnly: true, sameSite: 'None', secure: true
    });
    res.status(200).json({message:'Users Cookies deleted'})
  } catch (error) {
    res.status(500).jsonn({message: 'we cannot clear the cookies, sorry for the problems', error: error.message})
  };
};

const changePassword =  async (req, res) => {
  try {
    const {Name, Email ,newPassword, newPasswordRepit} = req.body;
    //finding the user by Email and Name
    const user = await User.findOne({Name, Email});
    if(!user){
      return res.status(400).json({message: 'we cannot find the user.', error: error.message});
    };
    if(newPassword === newPasswordRepit){
      // use the tool bcrypt to generate a new encrypted password 
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(newPassword, salt);
      user.password = hash
      //then we save it in the data base
      await user.save()
    };
    res.status(200).json({message:'the users password changed to the new one.'})
  } catch (error) {
    res.status(500).json({ message: 'we cannot change the password, sorry for the problems', error: error.message })
  }
}

module.exports = {addUser, loginUser, HandleLogOut, changePassword}