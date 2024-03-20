// App.jsx
 
import React from "react";
import './App.css';
import { DndContainer } from "./dnd-container.js";
import './index.css';
import { PopUp } from "./pop-up.js";
export function Browse()  {
    return (
        <div className="Browse">
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        </head>
        <body className="App-body">
        
        <div class = "fat">
          <div class = "container">
            <div class = "row">
              <div class = "col"> 
                <h1 class="text-start">NCHS Parsons Problems</h1>
              </div>
              <div class = "col">
                <h1 class = "text-end">Aryan is shit</h1>
              </div>
          </div>
        </div>
        
        </div>
        
        <div class="container text-center">
          <div class="row">
            <div class="col-md-4" >
            <button class = "button" ></button>
            </div>
            <div class="col-md-3">
              <PopUp />
            </div>
            <div class="col-md-1">
              
            </div>
            <div class="col-md-2">
            <button class = "button">Save</button>
            </div>
            <div class="col-md-2">
              <button class ="button">Aryan isnt fat</button>
            </div>
          </div>
        </div>
  
        
        
        <div class = "container text-center">
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
      );
    
    
};
 
export default Browse;