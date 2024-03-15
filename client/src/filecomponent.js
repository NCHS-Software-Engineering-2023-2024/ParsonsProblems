import React, { useState } from 'react';


export const ImportProblem = () => {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState("hi");
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        const reader = new FileReader();
        
        reader.onload = function() {
            //console.log(reader.result);
            
            setContent(reader.result);
        }
        reader.readAsText(event.target.files[0]);
        
    }
    var json = "";
    var count = 0;
    for (const line of content.split("\n")){
        if (line.length !== 0){
             json += {id: count, name: line, positionx: null, positiony: null };
             console.log(json);
        };
    }
    

    console.log(content);
    
    
    console.log(file);
        var asdf ={
            "id": 1,
            "name": 'firstasdjkahsaskakskdjasjkdjkakjsssssssssssssskjskkdasd aasdasdakslk',
            "positionx": null,
            "positiony": null,
            "file": file
        }

        
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
        }}

       
    return (
        <form onSubmit = {handleSubmit}>
            <input type = "file" accept = ".txt, .java, .py" onChange = {handleFileChange} />
            <button type = "submit">Upload</button>
        </form>
    );
  };


async function createFile (path, name, type)
{
       {
        let response = await fetch(path);
        let data = await response.blob();
        let metadata = {
            type: type
        };
        return new File([data], name, metadata);
}
}