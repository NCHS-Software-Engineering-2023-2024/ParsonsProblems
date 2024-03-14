import React, { useState } from 'react';


export const ImportProblem = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        
    }
    var f;
    if (file !== null) {
        f = createFile (file.webkitRelativePath, file.name, file.type);
    }

    console.log(f);
    const reader = new FileReader();
    reader.readAsText(f);
    console.log(reader.result);

    console.log(file);
        var json ={
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
                body: JSON.stringify(json)
                
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