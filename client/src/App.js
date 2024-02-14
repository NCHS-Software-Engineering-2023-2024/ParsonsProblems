// Video4Ever Starter Code
// Dr. Miller
// Start your React app using npm start while in the client directory
import interact from 'interactjs';
import './App.css';
import React, { useState, useEffect } from "react";

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
/* */
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.snap({
        targets: [
          interact.snappers.grid({ x: 60, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      }),
      interact.modifiers.restrict({
        restriction: 'parent',
        elementRect: { top: 0, left: .5, bottom: 0, right: .5 },
        endOnly: true
      })
  
    ],

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener
      
      //changes element text to "element moved xyz pixels idk"
      // call this function on every dragend event
      //end (event) {
        /*
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
            */
      //}
    }
  })
  .resizable({
    // resize from all edges and corners

    listeners: {
      move (event) {
        var target = event.target

        // update the element's style
        target.style.width = event.rect.width + 'px'
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

  })

function dragMoveListener (event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    draggableElement.textContent = 'Dragged in'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.relatedTarget.textContent = 'Dragged out'
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped'
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

function App() {
  // Use this variable whenever you want to connect to the Node.js server
  // When you create production version of a React app, this address will change
  const baseURL = "http://localhost:8000/";

  // This is an example variable (message) that can be changed with the setMessage function
  // The initial state of the message is an empty string. When the variable is changed, it changes everywhere it is used.
  // This is referred to as a state hook
  const [message, setMessage] = useState("");

  // useEffect will run when the app loads
  // This is referred to as an effect hook
  // This effect will modify the message based on what is returned from a GET request to the server's message 
  useEffect(() => {
    fetch(`${baseURL}message`)
      .then((res) => res.json())
      .then((data) => {setMessage(data.message);}
      );
  }, []);
  const textboxes = [
      {"order":"1", "content":"asdf1"},
      {"order":"2", "content":"asdf2"},
      {"order":"3", "content":"asdf3"}
    ];
  // The message variable is displayed below and will update, if necessary
  // You can put any Javascript (JSX) code within curly brackets in a React app
  return (
    <div className="App">
      <header className="App-header">
      
        <div class="test-box">
          
        {
            textboxes.map((box) => 
              React.createElement('div', {id: "drag-"+box.order, class:"draggable"}, box.content)
            )
        }
        </div>
        <div id="drag-1" class="dropzone">#inner-dropzone</div>

        
      </header>
      
    </div>
  );
}

export default App;
