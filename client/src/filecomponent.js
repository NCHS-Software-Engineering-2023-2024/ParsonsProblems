import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FileProvider, fileContext } from './fileContext.js';

export function Upload() {
  //hooks - makes the popup 'appear' 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {file, setFile} = useContext(fileContext);// to update dnd-container's file without sending props
    
  const [content, setContent] = useState("");
  const handleFileChange = (event) => {
    if (event.target.files[0].name.slice(-4) !== ".txt" ||
        event.target.files[0].name.slice(-5) !== ".java" ||
        event.target.files[0].name.slice(-3) !== ".py"){
          alert("The file type you selected is not supported.");
        }
    else {
        const reader = new FileReader();
      reader.onload = function() {
          //console.log(reader.result);
          setContent(reader.result); // to parse outside of handleFileChange
      }
      
        }
    }
    

  var json = [];
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
      setFile(json);
      
            
    try {
        const res = await fetch("", {// change url to send to different place
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: {
                
            }
                
        });
        });
            
        console.log(res.ok);
    }
        console.log(res.ok);
    }
        catch (error){
            console.error('upload error');
        }
  }

  

  return (
    <>
      <button class = "button" onClick={handleShow}>
        Import a Problem
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
                    <label for = "comments">Comments</label>
                    <textarea id = "comments" rows = "2"></textarea>
                    <input type = "submit"></input>
                </div>    

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