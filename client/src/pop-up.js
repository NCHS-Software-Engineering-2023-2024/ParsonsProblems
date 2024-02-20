import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function PopUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

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
          <Button variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUp;