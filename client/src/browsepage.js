// App.jsx
 
import React, { useState, useEffect } from "react";
import './browsepage.css';
import { DndContainer } from "./dnd-container.js";
import './index.css';
import { PopUp } from "./pop-up.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  render
} from "react-router-dom";


export function Browse()  {
    const baseURL  = 'http://localhost:8000/'
    const [file, setFiles] = useState([]);

    useEffect(() => {
        fetch(`${baseURL}Problems`) // use backticks instead of apostrophes
            .then((res) => res.json())
            .then((data) => {setFiles(data.data)})

    }, []);
    console.log(file);
    
    

    return (
        <div>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

        </head>
        <div class = "jumbotron">
          <div class = "container">
            <div class = "row">
              <div class = "col"> 
                <h1 class="text-start">NCHS Parsons Problems</h1>
              </div>
              <div>
                <h1 class = "text-end">Log In</h1>
              </div>
          </div>
        </div>
        </div>
        <table class = "center">
       
          <thead>
            <tr class = "tr">
            <th class = "th">Problem Name</th>
            <th>File Type</th>
            <th>Comments</th>
            <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {file.map((Problem)=>(
             
              <tr>
                <td>{Problem.Name}</td>
                <td>{Problem.Type}</td>
                <td>{Problem.Comments}</td>
                <td>{Problem.Date}</td>
              </tr>

              ))}
            
          </tbody>
          
    </table>
            <button class = "button" ><Link to="/">Back to Home</Link></button>

        </div>
      );
    
    
};
 
export default Browse;