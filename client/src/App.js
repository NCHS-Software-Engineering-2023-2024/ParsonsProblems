// Video4Ever Starter Code
// Dr. Miller
// Start your React app using npm start while in the client directory
import './App.css';
import './index.css';
import React, { Component, useState, useEffect } from "react";
import { render } from 'react-dom';
import { DndContainer as default } from "./dnd-container.js"

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
}
function App() {
  return (
    
    <div className = "App">
      <div className = "App-body">
        { DndContainer.render()  }
      </div>
    </div>
  )
} 

export default App;