import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FileProvider, fileContext } from './fileContext.js';

export function Upload() {
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
          json.push({id: count, name: str, positionx: null, positiony: null})
          count++;
        }
      }
      else if (line.length !== 0 ){ 
           json.push({id: count, name: line, positionx: null, positiony: null });
           count++;
      }
  }
  
  // only sets the file when submit button is clicked to limit rerenders
  const handleSubmit = async (event) => {
    event.preventDefault();
      
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
                
        });
            
        console.log(res.ok);
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
            <FileProvider>
              <form onSubmit = {handleSubmit}>
                <div>
                    <input type = "file" accept = ".txt, .java, .py" id = "problem" onChange = {handleFileChange}/>  
                </div>
                <div>
                  <label for = "name">Problem Name</label>
                  <input type = "text" id = "name" onInput = {event => setName(event.target.value)}></input>
                </div>
                <div>
                    <label for = "comments">Comments</label>
                    <textarea id = "comments" placeholder='Enter comments here' onInput = {event => setComments(event.target.value)}></textarea>
                </div>   
                <div>
                  <label for = "date">Date</label>
                  <input type = "date" id = "date" onInput = {event => setDate(event.target.value)}></input>
                </div>
                <input type = "submit"></input>
              </form>
            </FileProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
