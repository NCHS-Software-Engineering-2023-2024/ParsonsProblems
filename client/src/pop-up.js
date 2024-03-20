import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ImportProblem } from './filecomponent.js';
import { FileProvider, fileContext } from './fileContext.js';

export function PopUp() {
  //hooks - makes the popup 'appear' 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {file, setFile} = useContext(fileContext);
    
  const [content, setContent] = useState("");
  const handleFileChange = (event) => {
      //setFile(event.target.files[0]);
      const reader = new FileReader();
      
      reader.onload = function() {
          //console.log(reader.result);
          
          setContent(reader.result);
      }
      reader.readAsText(event.target.files[0]);
      
  }
  var json = [];
  var count = 0;
  console.log(content);
  for (const line of content.split("\n")){ 
      if (line.includes("\r")){
        var str = line.substring(0, line.indexOf("\r"));
        if (str.length !== 0){
          json.push({id: count, name: str, positionx: null, positiony: null})
          count++;
        }
        
      }
      else if (line.length !== 0 ){ 
           json.push({id: count, name: line, positionx: null, positiony: null });
           count++;
      }
      
      
  }

      
      const handleSubmit = async (event) => {
          event.preventDefault();
          setFile(json);
          console.log(file);
          
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
          <Modal.Title>Import</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FileProvider>
            <form onSubmit = {handleSubmit}>
            <input type = "file" accept = ".txt, .java, .py" onChange = {handleFileChange} />
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
