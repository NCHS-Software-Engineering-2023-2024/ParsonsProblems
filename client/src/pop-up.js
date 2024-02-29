import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PopUp() {
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
          {/*file upload from bootstrap*/}
          <Form.Group controlId="formFile" className="mb-3" >
            <Form.Label>Choose a File: 
            </Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
                        <button type = "submit">Upload</button> {/*call function to write uploaded file to database*/}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUp;