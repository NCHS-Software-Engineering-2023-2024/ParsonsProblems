import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UploadComponent } from './filecomponent.js';
/* 
export function texttoJSON(){
    let uploadtext = selectedFile.text();
    console.log(uploadtext);
    let json = "";
    let i = 0;
    while (uploadtext.includes('\\')){
      
      json += '{"id": "'+i+'", "name": "'+ uploadtext.substring(0, indexOf('\\')) + '", "positionx": "null", "positiony": "null"}';
      uploadtext = uploadtext.substring(indexOf('\\')+2);
      i++;
    }
return (
  {json}
);
}*/

export function PopUp() {
  //hooks - makes the popup 'appear' 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <button variant="primary" onClick={handleShow}>
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
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <UploadComponent />
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