import React, { useState } from 'react';

export const UploadComponent = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var json ={
            "id": 1,
            "name": 'firstasdjkahsaskakskdjasjkdjkakjsssssssssssssskjskkdasd aasdasdakslk',
            "positionx": null,
            "positiony": null,
            "file": file
        }
        


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
        }
    }
    return (
        <form onSubmit = {handleSubmit}>
            <input type = "file" accept = ".txt, .java, .py" onChange = {handleFileChange} />
            <button type = "submit">Upload</button>
        </form>
    );
  };
