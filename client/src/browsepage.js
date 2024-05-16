// App.jsx
 
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Link
} from "react-router-dom";
import './browsepage.css';
import { fileContext } from "./fileContext";
import { Save, Upload } from "./filecomponent";
export function Browse()  {
    const baseURL  = 'http://localhost:8000/'
    const [files, setFiles] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');
    const {file, setFile} = useContext(fileContext);
    useEffect(() => {
        getProblems();
    }, []);
    //console.log(files);

    async function getProblems() {
      await fetch(`${baseURL}Problems`) // use backticks instead of apostrophes
            .then((res) => res.json())
            .then((data) => setFiles(data.data))

      //console.log(files);
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

    const handleRowSelect = (id) => {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows[id] = !updatedSelectedRows[id];
      setSelectedRows(updatedSelectedRows);
    }

    const deleteRows = async () => {
      if (window.confirm("Delete the selected rows?")){
        if (selectedRows === null){
          alert("You haven't selected any rows to delete.");
        } 
        else{
          try {
            const deletedIds = selectedRows.reduce((acc, isSelected, index) => {
              if (isSelected){
                acc.push(files[index].id);
              }
              return acc;
            }, []);
            await fetch ("http://localhost:8000/delete", {
              method: 'PUT',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(deletedIds)
            })
            .then(window.location.reload());

            const updatedTable = files.filter((Problem, index) => !selectedRows[index]);
            setFiles(updatedTable);
            //console.log(selectedRows)
            
          }  
          catch (error) {console.log(error)};
          setSelectedRows(new Array(files.length).fill(false));
        }
      }
    }
      
    return (
        <div>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

        </head>
        <ul>
          <li style={{pointerEvents: "none"}}><a href = {undefined}><Link to="/">NCHS Parsons Problems</Link></a></li> 
          <li><a href = {undefined}><Link to="/">Homepage</Link></a></li>
        </ul>
        <div class = "container">
            <div class = "row mt-4">
                <div class = "col-4">
                  <button class = "button" onClick = {deleteRows}>Delete Selected Rows</button>
                </div>
                <div class = "col-4"></div>
                <div class = "col-4">
                  <Upload input = {"Upload"} callback={() => getProblems()}/>
                </div>
            </div>

        </div>
        <div class = "container-fluid mt-4">
        <table class = "center">
       
          <thead>
            <tr class = "tr">
            <th style={{cursor: "default" }}></th>
            <th onClick={() => handleSort('Name')} style={{width: "25%"}}>Problem Name</th>
            <th onClick={() => handleSort('Type')} style={{width: "7.5%"}}>File Type</th>
            <th onClick={() => handleSort('Comments')} >Comments</th>
            <th onClick={() => handleSort('Date')} style={{width: "10%"}}>Date</th>
            <th style={{cursor: "default", width: "10%"}}></th>
            </tr>
          </thead>
          <tbody>
          {sortedData.map((Problem, index)=>(
             
              <tr key = {index}>
                <td style={{textAlign:"center", width:"25px"}}>
                  <div class = "checkbox"> 
                  <input style = {{width:"20px", height:"20px"}}
                    type = "checkbox"
                    checked = {selectedRows[index]}
                    onChange = {() => handleRowSelect(index)}
                  />
                  </div>
                </td>
                <td style={{textAlign:"center", cursor:"pointer"}} onClick = {() => setFile([Problem.id, JSON.parse(Problem.Problem)])}><Link to="/">{Problem.Name}</Link></td>
                <td style={{textAlign:"center"}}>{Problem.Type}</td>
                <td>{Problem.Comments}</td>
                <td style={{textAlign:"center"}}>{Problem.Date.substring(0,10)}</td>
                <td style={{textAlign:"center"}}><Save problem = {Problem.Problem} problemName = {Problem.Name} problemType = {Problem.Type} problemComments = {Problem.Comments} problemDate = {Problem.Date.substring(0,10)} id = {Problem.id} callback={() => getProblems()}/></td>
              </tr>

              ))}
            
          </tbody>
          
    </table>
    </div>

        </div>
      );
    
    
};
 
export default Browse;