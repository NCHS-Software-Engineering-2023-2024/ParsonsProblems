// Video4Ever Starter Code
// Dr. Miller
// Start your React app using npm start while in the client directory
import React, { useState } from "react";
import './App.css';
import { DndContainer } from "./dnd-container.js";
import './index.css';
import { PopUp } from "./pop-up.js";

  // You can use this function for sending POST requests You can modify it if you want to use it for GET requests as well
  // This is an asynchronous function meaning that it returns a Promise
  // A Promise means it will either return a valid value or reject the request
  // Promises are important for  operations that take time such as querying a database or fetching data from a server
  // Using await means this function will suspend execution until the Promise resolves so it won't return until it has a response
  // The await keyword only works in asynchronous functions
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects

    
    

    // The message variable is displayed below and will update, if necessary
    // You can put any Javascript (JSX) code within curly brackets in a React app

  }
  
  
  

function App() {
    // Use this variable whenever you want to connect to the Node.js server
    // When you create production version of a React app, this address will change
    const baseURL = "http://localhost:3000/";
    
    // This is an example variable (message) that can be changed with the setMessage function
    // The initial state of the message is an empty string. When the variable is changed, it changes everywhere it is used.
    // This is referred to as a state hook
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [file, setFile] = useState([
        {
            id: 1,
            name: 'firstasdjkahsaskakskdjasjkdjkakjsssssssssssssskjskkdasd aasdasdakslk',
            positionx: null,
            positiony: null,
        },
        {
            id: 2,
            name: 'second',
            positionx: null,
            positiony: null,
        },
        {
            id: 3,
            name: 'third',
            positionx: null,
            positiony: null,
        },
    ])

    // useEffect will run when the app loads
    // This is referred to as an effect hook
    // This effect will modify the message based on what is returned from a GET request to the server's message 
    /*
    useEffect(() => {
      fetch(`${baseURL}message`)
        .then((res) => res.json())
        .then((data) => {setMessage(data.message);}
        );
    }, []);
    */
  return (
    <div className="App">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      </head>
      <body className="App-body">

      <div class = "jumbotron">
       
        <div class = "row">
          <div class = "col-4"> 
            <h1 class="text-start">NCHS Parsons Problems</h1>
          </div>
          <div class = "col-8">
            <h1 class = "text-end">Log In</h1>
          </div>
      </div>
      
      </div>
        
    
      <div class="container text-center">
        <div class="row">
          <div class="col-md-3" >
          <button class = "button">Browse Problems Database</button>
          </div>
          <div class="col-md-2">
            <PopUp />
          </div>
          <div class="col-md-3">
            
          </div>
          <div class="col-md-2">
          <button class = "button">Save</button>
          </div>
          <div class="col-md-2">
            <button class ="button">Save As</button>
          </div>
        </div>
        
        <div class="row mt-3">
          <div class = "box">
              < DndContainer file ={file}/>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-2">
            <button class = "button">Reset</button>
          </div>
          <div class="col-md-2">
            <button class = "button">Check</button>
          </div>
         
        </div>
      </div>

          
      </body>

    </div>
  )
} 

export default App;