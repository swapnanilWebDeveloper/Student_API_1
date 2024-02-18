const express = require("express");
// db/connection.js file is required here
require("./db/connection");
const studentRouter = require("./routers/student");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(studentRouter);

app.listen(port , () => {
    console.log(`connection is setup at ${port}`);
});

// you do not need express.json() and express.urlencoded()
// for GET Requests or DELETE Requests. We only need it for the put and the post request.

// express.json() is a method inbuilt in express to recognize the incoming 
// Request Object as a JSON Object. This method is called as a middleware
// in your application using the code : app.use(express.json())