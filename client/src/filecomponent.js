import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fileContext } from './fileContext.js';

String.prototype.hashCode = function () {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr
    hash |=0;
  }
  return hash + Math.ceil(Math.random()*100);
}

export function Upload({input}, callback) {
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
  var types = ["txt", "java", "py"]
  const handleFileChange = (event) => {
    var extension = event.target.files[0].name.split(".").pop().toLowerCase();
    console.log(extension);
    if (types.indexOf(extension) > -1){
          setType("."+extension);

          const reader = new FileReader();
          reader.onload = function() {
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
          json.push({id: count, name: str})
          count++;
        }
      }
      else if (line.length !== 0 ){ 
           json.push({id: count, name: line});
           count++;
      }
  }
  
  const handleSubmit = async () => {
    //event.preventDefault();
    const id = name.hashCode()
    const put = { type: type,
                  name: name, 
                  problem: json,
                  date: date,
                  comments: comments, 
                  id: id
                };
    setFile([id, file[1]])
    //console.log(JSON.stringify(put));
    try {
        const res = await fetch("http://localhost:8000/put", {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(put)
        })
        .then(callback)
        .then(alert("Refresh the page to see the added problem."));
    }
        catch (error){
            console.error('upload error');
        }
  }
  return (
    <>
      <button class = "button" onClick={handleShow}>
        {input}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Save a problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <form class = "loadfile" style={{display:"block"}}>
                <input required="true" type = "file" accept = ".txt, .java, .py" id = "problem" onChange = {handleFileChange}/>  
                <br/>
                <label for = "name">Problem Name</label>
                <br/>
                <input required type = "text" id = "name" onInput = {event => setName(event.target.value)}></input>
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
            {input}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function Save({...props}) {
  //hooks - for reading inputs from user
  const [show, setShow] = useState(false);
  const [type, setType] = useState(props.problemType);
  const [name, setName] = useState(props.problemName);
  const [comments, setComments] = useState(props.problemComments);
  const [date, setDate] = useState(props.problemDate);
  const [problem, setProblem] = useState(props.problem);
  //console.log(problem)
  //hooks - makes the popup 'appear' 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const update = { 
                  name: name, 
                  problem: problem,
                  date: date,
                  comments: comments, 
                  id: props.id
                  };
    try {
        //console.log("update "+JSON.stringify(update))
        await fetch("http://localhost:8000/update", {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        })
        .then(props.callback)
        //.then(console.log(problem))
        .then(alert("Refresh the page to see the updated problem on the database page."));
    }
        catch (error){
            console.error('upload error');
        }
  }
  return (
    <>
      <button class = "button" onClick={handleShow}>
        Edit Problem
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered = {true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit database entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <form class = "loadfile" style={{display:"block"}}>  
                <label for = "problem">Problem</label>
                <br/>
                <textarea id = "problem" rows = "10" cols = "50"  onInput = {event => setProblem(event.target.value)} value = {problem}></textarea>
                <div style= {{display:"table"}}>
                  <div style = {{display:"table-cell"}}>
                    <label for = "type">Type</label>
                    <input type = "text" list = "type" onInput = {event => setType(event.target.value)} value = {type}></input>
                    <datalist id = "type">
                      <option>.java</option>
                      <option>.py</option>
                      <option>.txt</option>
                    </datalist>
                  </div>
                  <div style = {{display:"table-cell"}}>
                    <label for = "name">Problem Name</label>
                    <input type = "text" id = "name" onInput = {event => setName(event.target.value)} value = {name}></input>
                  </div>
                </div>
                <label for = "comments">Comments</label>
                <br/>
                <textarea id = "comments" rows = "3" cols = "50" placeholder='Enter comments here' onInput = {event => setComments(event.target.value)} value = {comments}></textarea>
                <br/>
                <label for = "date">Date</label>
                <br/>
                <input type = "date" id = "date" onInput = {event => setDate(event.target.value)} value = {date}></input>
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