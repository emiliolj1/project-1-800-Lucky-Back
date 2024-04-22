require('dotenv').config();
require('../Database/database');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const credentials = require('');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { corsOptions } = require('../Config/corsOptions');


//////////////////////////////////////////////////////////////////////////////////////

        // use this space to put the controllers

//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////

        // use this space to put the app.use

//////////////////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT, () => {
  console.log(`Escuchando por el puerto ${process.env.PORT}`);
})