const express = require("express"); // for building rest api
const bodyParser = require("body-parser"); // helps to parse the request and create the req.body object
const cors = require("cors"); // rovides express middleware to enable CORS with various options

const PORT = process.env.PORT || 4000;

const app = express();

/** --------------------   M I D D L E W A R E    S E T U P ----------------------*/
// setup cors
const corsOptions = {origin: "http://localhost:8081"};
app.use(cors(corsOptions));

// setup - application/json 
app.use(bodyParser.json());

// setup - application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: true}));


/** --------------------   R O U T E S ----------------------*/

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Country API"})
})

require("./app/routes/countries.routes")(app);


/** --------------------   B O O T S T R A P ----------------------*/
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



