import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fileContext } from './fileContext.js';

export function Upload(props) {
  //hooks - for reading inputs from user
  const [show, setShow] = useState(false);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  //hooks - makes the popup 'appear' 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {file, setFile} = useContext(fileContext);// to update dnd-container's file without sending props
    
  
  const handleFileChange = (event) => {
    if (event.target.files[0].name.slice(-4) === ".txt" ||
        event.target.files[0].name.slice(-5) === ".java" ||
        event.target.files[0].name.slice(-3) === ".py"){
          
          setType(event.target.files[0].type);
          console.log(type);
          const reader = new FileReader();
          reader.onload = function() {
            //console.log(reader.result);
            setContent(reader.result); // to parse outside of handleFileChange
          }
          reader.readAsText(event.target.files[0]);
        }
    else {
          alert("The file type you selected is not supported.");
        }
    }

  const json = [];
  var count = 0;
  // file contents need to be added to an array for dnd
  for (const line of content.split("\n")){
      if (line.includes("\r")){
        var str = line.substring(0, line.indexOf("\r"));
        if (str.length !== 0){ // doesn't add lines that only contain \r 
          json.push({id: count, name: str, index: 0})
          count++;
        }
      }
      else if (line.length !== 0 ){ 
           json.push({id: count, name: line, index: 0});
           count++;
      }
  }
  
  // only sets the file when submit button is clicked to limit rerenders
  const handleSubmit = async (event) => {
    //event.preventDefault();
      
    const put = { type: type,
                  name: name, 
                  problem: json,
                  date: date,
                  comments: comments 
                };

    console.log(JSON.stringify(put));
    try {
        const res = await fetch("http://localhost:8000/put", {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(put)
        })
        .then(props.callback())
        .then(alert("Refresh the page to see the added problem."));
    }
        catch (error){
            console.error('upload error');
        }
  }
  return (
    <>
      <button class = "button" onClick={handleShow}>
        Save
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered = {true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Save a problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <form class = "loadfile" style={{display:"block"}}>
                <input type = "file" accept = ".txt, .java, .py" id = "problem" onChange = {handleFileChange}/>  
                <br/>
                <label for = "name">Problem Name</label>
                <br/>
                <input type = "text" id = "name" onInput = {event => setName(event.target.value)}></input>
                <br/>
                <label for = "comments">Comments</label>
                <br/>
                <textarea id = "comments" rows = "5" cols = "50" placeholder='Enter comments here' onInput = {event => setComments(event.target.value)}></textarea>
                <br/>
                <label for = "date">Date</label>
                <br/>
                <input type = "date" id = "date" onInput = {event => setDate(event.target.value)}></input>
              </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {handleClose(); handleSubmit()}}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function Save(buttontype = '', props) {
  //hooks - for reading inputs from user
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const {file, setFile} = useContext(fileContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  // only sets the file when submit button is clicked to limit rerenders
  const handleSubmit = async (event) => {
    //event.preventDefault();
      
    const json = { type: type,
                  name: name, 
                  problem: file,
                  date: date,
                  comments: comments 
                };

    console.log(JSON.stringify(json));
      try {
        await fetch("http://localhost:8000/update", {
            method: 'UPDATE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(props.callback())
        .then(alert("Updated database entry"));
      }
        catch (error){
            console.error('upload error');
        }

    }
    
  return (
    <>
      <button class = "button" onClick={handleShow}>
        Save
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered = {true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Save a problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class = "loadfile" style={{display:"block"}}>
            <label for = "name">Problem Name</label>
            <br/>
            <input type = "text" id = "name" onInput = {event => setName(event.target.value)}></input>
            <br/>
            <label for = "comments">Comments</label>
            <br/>
            <textarea id = "comments" rows = "5" cols = "50" placeholder='Enter comments here' onInput = {event => setComments(event.target.value)}></textarea>
            <br/>
            <label for = "date">Date</label>
            <br/>
            <input type = "date" id = "date" onInput = {event => setDate(event.target.value)}></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {handleClose(); handleSubmit()}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
