import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FileProvider, fileContext } from './fileContext.js';


export function PopUp() {
  //hooks - makes the popup 'appear' 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var types = ["txt", "java", "py"]
  const {file, setFile} = useContext(fileContext);// to update dnd-container's file without sending props
    
  const [content, setContent] = useState("");
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    
    var extension = event.target.files[0].name.split(".").pop().toLowerCase();
    if (types.indexOf(extension) > -1){
          const reader = new FileReader();
          reader.onload = function() {
          //console.log(reader.result);
          setContent(reader.result); // to parse outside of handleFileChange
            }
          reader.readAsText(event.target.files[0]);
      }
    else{
      alert("The file type you selected is not supported.");
    }
    }
    

  var json = [];
  var count = 1;
  // file contents need to be added to an array for dnd
  for (const line of content.split("\n")){
      if (line.includes("\r")){
        var str = line.substring(0, line.indexOf("\r"));
        if (str.length !== 0){ // doesn't add lines that only contain \r 
          json.push({id: count, name: str})
          count++;
        }
      }
      else if (line.length !== 0 ){ 
           json.push({id: count, name: line});
           count++;
      }
  }
  
  // only sets the file when submit button is clicked to limit rerenders
  const handleSubmit = async (event) => {
      //event.preventDefault();
      setFile(0,json);
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
              </form>
            </FileProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {handleSubmit(); handleClose(); }}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}