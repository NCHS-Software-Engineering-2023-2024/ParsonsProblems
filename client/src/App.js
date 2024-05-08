// Video4Ever Starter Code
// Dr. Miller
// Start your React app using npm start while in the client directory
import React from "react";
import {
  Link,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import { Browse } from "./browsepage.js";
import { DndContainer } from "./drag-and-drop/dnd-container.js";
import { PopUp } from "./pop-up.js";
import { Upload } from "./filecomponent.js";

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
  
  function Home() {
    return (
      <div className="App">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      </head>
      <body className="App-body">
  
      <ul>
        <li style={{pointerEvents: "none"}}><a><Link to="/">NCHS Parsons Problems</Link></a></li>
        <li><a><Link to="/browse">Problems Database</Link></a></li>
      </ul>
      
      <div class="container text-center">
        <div class="row mt-4">
          <div class="col-3" >
            <button class = "button" ><Link to="/browse">Browse Problems Database</Link></button>
          </div>
          <div class="col-3">
            <PopUp />
          </div>
          <div class="col-1">
  
          </div>
          <div class="col-2">
          <button class = "button">Save</button>
          </div>
              <div class="col-2">
                <Upload input ={"Save as"}/>
              </div>
          </div>
      </div>
      
      <div>
        <DndContainer/>
      </div>
          
          
          </body>
          </div>
          
        );
      }
  
    
  

function App() {
    // Use this variable whenever you want to connect to the Node.js server
    // When you create production version of a React app, this address will change
    const baseURL = "http://localhost:3000/";
    
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
      <>
            {/* This is the alias of BrowserRouter i.e. Router */}
  
                <Routes>
                    {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
                    <Route
                            exact
                            path="/"
                            element={<Home />}
                        ></Route>
  
                    {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
                    <Route
                        path="/browse"
                        element={<Browse />}
                    />
  
                    {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
  
  
                    {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
                    {/* <Redirect to="/" /> */}
  
                </Routes>
                </>
    )
} 

export default App;