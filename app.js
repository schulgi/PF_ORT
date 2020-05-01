const express = require('express'); //Express Framework
const app = express(); //Saving Framework on Variable App

//Routes

//Index Route
app.use('/',(require('./Routes/index')))

//App Listening Selected Port
const port = process.env.PORT || 5000; //Selected Port Number
app.listen(port,console.log(`Server Running ${port}`));