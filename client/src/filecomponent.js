import React from 'react';


export const UploadProblem = () => {
        
    const handleSubmit = async (event) => {
        event.preventDefault();
            
    try {
        const res = await fetch("http://localhost:8000/getfile", {// change url to send to different place
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
            <input type = "submit"></input>
        </form>
    );
  };

