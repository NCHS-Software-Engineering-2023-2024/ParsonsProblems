import React, { useContext, useState } from 'react';
import { fileContext } from './fileContext';


export const ImportProblem = () => {
    const [file, setFile] = useContext(fileContext);

    const [content, setContent] = useState("");
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        const reader = new FileReader();
        
        reader.onload = function() {
            //console.log(reader.result);
            
            setContent(reader.result);
        }
        reader.readAsText(event.target.files[0]);
        
    }
    var json = [];
    var count = 0;
    for (const line of content.split("\n")){ 
        if (line.length !== 0){ 
             json.push([{id: count, name: line, positionx: null, positiony: null }]);
             
             count++;
        };
        
    }
    console.log(json);

        var asdf ={
            "id": 1,
            "name": 'firstasdjkahsaskakskdjasjkdjkakjsssssssssssssskjskkdasd aasdasdakslk',
            "positionx": null,
            "positiony": null,
        }
        
        const handleSubmit = (event) => {
            event.preventDefault();
            setFile(json);
            console.log(json);
        }
        /*
        const handleSubmit = async (event) => {
            event.preventDefault();
            
        try {
            const res = await fetch("http://localhost:8000/getfile", {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(asdf)
                
            });
            
            console.log(res.ok);
        }
        catch (error){
            console.error('upload error');
        }}*/

       
    return (
        <form onSubmit = {handleSubmit}>
            <input type = "file" accept = ".txt, .java, .py" onChange = {handleFileChange} />
            <button type = "submit">Upload</button>
        </form>
    );
  };

