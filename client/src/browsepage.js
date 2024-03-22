// App.jsx
 
import React, { useState, useEffect } from "react";
 
import React from "react";
import './App.css';
import { DndContainer } from "./dnd-container.js";
import './index.css';
import { PopUp } from "./pop-up.js";
import React, { useState, useEffect } from "react";
 
export function Browse()  {
    const [file, setFiles] = useState([]);

    useEffect(() => {
        fetch('${http://localhost:8000/Problems')
            .then((res) => res.json())
            .then((data) => {setFiles(data.data)})

    }, []);

    
    

    return (
        <div>
            
        <table class = "center">
       
          <thead>
            <tr>
            <th>Problem Name</th>
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


        </div>
      );
    
    
};
 
export default Browse;