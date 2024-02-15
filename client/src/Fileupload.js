import Form from 'react-bootstrap/Form';

export  function SingleFileUpload() {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Choose a File: 
        </Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <button type = "submit">Submit</button>
    </>
  );
}