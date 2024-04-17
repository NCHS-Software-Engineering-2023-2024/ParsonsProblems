// App.jsx
 
import React, { useEffect, useState } from "react";
import {
  Link
} from "react-router-dom";
import './browsepage.css';
import { Upload } from "./filecomponent";
import './index.css';

export function Browse()  {
    const baseURL  = 'http://localhost:8000/'
    const [file, setFiles] = useState([]);
    const [sorting, setSorting] = useState({ field: 'name', ascending: false })

    useEffect(() => {
        fetch(`${baseURL}Problems`) // use backticks instead of apostrophes
            .then((res) => res.json())
            .then((data) => {setFiles(data.data)})
    }, []);
    console.log(file);
    
    useEffect(() => {
      const copy = JSON.parse(JSON.stringify(file));

      const sort = copy.sort((a, b) => {
        return a[sorting.key].localeCompare(b[sorting.key]);
      })
      setFiles(sorting.ascending ? sort :sort.reverse());
    }, [file, sorting])

    function applySorting () {
      setSorting({ key: key, ascending: ascending });
    }

    return (
        <div>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

        </head>
        <div class = "navbar" onClick={() => applySorting('name', !sorting.ascending)}>
          <div class = "container-fluid">
            <div class = "row">
              <div class = "col"> 
                <h1>NCHS Parsons Problems</h1>
              </div>
          </div>
        </div>
        </div>
        <div class = "container">
            <div class = "row mt-4">
                <div class = "col-4">
                  <button class = "button" ><Link to="/">Back to Home</Link></button>
                </div>
                <div class = "col-4"></div>
                <div class = "col-4">
                  <Upload />
                </div>
            </div>

        </div>
        <div class = "container-fluid mt-4">
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
                <td style={{textAlign:"center"}}>{Problem.Name}</td>
                <td style={{textAlign:"center"}}>{Problem.Type}</td>
                <td>{Problem.Comments}</td>
                <td style={{textAlign:"center"}}>{Problem.Date.substring(0,10)}</td>
              </tr>

              ))}
            
          </tbody>
          
    </table>
    </div>

        </div>
      );
    
    
};
 
export default Browse;