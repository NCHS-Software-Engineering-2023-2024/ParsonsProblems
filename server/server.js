// Video4Ever Starter Code for Node.js Server
// Dr. Miller
// Start your server using npm run dev in the server directory
// You can setup your own server following the instructions at https://codedamn.com/news/reactjs/how-to-connect-react-with-node-js


// Express is a Node.js framework for handling routing
// Express determines what function to call based on the endpoint specified
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const mysql = require('mysql'); 

// This will check if the server is running on port 8000
// If you change the port number here, you also have to change the baseURL in App.js
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

const connection = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'redhawk_parsons', 
  password: 'Qiprufecr*22@lc0fru',
  database: 'redhawk_parsons'
});
connection.connect((err) => 
{
  if (err) {
    console.log("Error connecting to the database", err);
  }else {
    console.log("Connected to the database!");
    function fetchFromDatabase(callback){ // callback function to allow the database page to update when a problem is added
      connection.query("SELECT `Problem Name` AS Name, `File Type` AS Type, Comments AS Comments, Date AS Date, Problem AS Problem FROM Files", function (err, result) {
        if (err) callback(err, result);
        else callback(null, result);
        });
    }
    };
    app.get('/Problems', (req, res) => {
      fetchFromDatabase((err, data) => {
        if (err) throw err;
        else{
          res.json({ data });
          //console.log(data);
        }
        
      });
    });
  });




// This is an example GET request endpoint
// req is the request object that was sent
// res is the result object of the request
// The result is converted to a JSON object with a key of message and value "Hello from server!"
app.get('/message', (req, res) => {
    res.json({ message: "NCHS Parsons Problems!" });
    
});

const upload = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'redhawk_parsons', 
  password: 'Qiprufecr*22@lc0fru',
  database: 'redhawk_parsons'
});

app.put('/put', (req, res) => {
  //upload.connect((err) => {
    //if (err){
      //console.log("err "+ err);
    //}
    //else {
      console.log("uploading...");
      console.log(req.body);
      let sql = "INSERT INTO Files VALUES (?, ?, ?, ?, ?)";
      upload.query(sql, [req.body.name, req.body.type, req.body.comments, req.body.date, JSON.stringify(req.body.problem)]);
      //if (err) console.log("err "+ err)
    //}
});
/*
const update = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'redhawk_parsons', 
  password: 'Qiprufecr*22@lc0fru',
  database: 'redhawk_parsons'
});
update.query('/update', (req, res) => {
  let sql = "SET `Problem Name` = (?), `File Type` = (?), Comments = (?), Date = (?) WHERE Problem = (?)";
  update.query(sql, [req.body.name, req.body.type, req.body.comments, req.body.date, JSON.stringify(req.body.problem)]);
});
*/