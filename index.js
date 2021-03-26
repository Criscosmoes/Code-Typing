const dotenv = require("dotenv"); 
const server = require("./api/server");
const mongoose = require("mongoose"); 




dotenv.config(); 


//Connect to DB

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, () => console.log("Connected to DB")); 

const PORT = process.env.PORT || 4000; 


server.listen(PORT, () => console.log(`Listening on port ${PORT}`))