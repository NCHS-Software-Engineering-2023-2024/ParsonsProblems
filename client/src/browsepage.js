// App.jsx
 
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Link
} from "react-router-dom";
import './browsepage.css';
import { FileProvider, fileContext } from "./fileContext";
import { Upload } from "./filecomponent";
import './index.css';
export function Browse()  {
    const baseURL  = 'http://localhost:8000/'
    const [files, setFiles] = useState([]);
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');
    const {file, setFile} = useContext(fileContext());
    useEffect(() => {
        getProblems();
    }, []);
    //console.log(files);

    async function getProblems() {
      console.log("hiiiiiiiii")
      await fetch(`${baseURL}Problems`) // use backticks instead of apostrophes
            .then((res) => res.json())
            .then((data) => {setFiles(data.data); console.log(data.data)})

      console.log(files);
    }

    const handleSort = (key) => {
      if (sortKey === key){
        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
      }
      else {
        setSortKey(key)
        setSortDirection('ascending');
      }
    };

  const sortedData = useMemo(() => {
    if (!sortKey) return files;
    return [...files].sort((a, b) => {
    const A = a[sortKey].toLowerCase();
    const B = b[sortKey].toLowerCase();
    if (A < B){
      return sortDirection === 'ascending' ? -1 : 1;
    }
    if (A > B){
      return sortDirection === 'ascending' ? 1 : -1;
    }
    return 0;
    });
  }, [files, sortKey, sortDirection]);


    return (
        <div>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

        </head>
        <div class = "navbar">
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
                  <Upload callback={() => getProblems()}/>
                </div>
            </div>

        </div>
        <div class = "container-fluid mt-4">
        <table class = "center">
       
          <thead>
            <tr class = "tr">
            <th onClick={() => handleSort('Name')}>Problem Name</th>
            <th onClick={() => handleSort('Type')}>File Type</th>
            <th onClick={() => handleSort('Comments')}>Comments</th>
            <th onClick={() => handleSort('Date')}>Date</th>
            </tr>
          </thead>
          <tbody>
          {sortedData.map((Problem, index)=>(
             
              <tr key = {index}>
                <FileProvider>
                  <td style={{textAlign:"center", cursor:"pointer"}} onclick = {() => setFile(Problem.Problem)}><Link to="/">{Problem.Name}</Link></td>
                </FileProvider>
                
                
                
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