import React, { createContext, useState } from 'react';

export const fileContext = createContext();
// React.useContext(fileContext) to use file/setfile
// need to import fileContext and wrap in FileProvider

export const FileProvider = ({children}) => {
                            // initally loaded problem
    const [file, setFile] = useState([
        {
        id: 1,
        name: 'firstasdjkahsaskakskdjasjkdjkakjsssssssssssssskjskkdasd aasdasdakslk',
        positionx: null,
        positiony: null,
    },
    {
        id: 2,
        name: 'second',
        positionx: null,
        positiony: null,
    },
    {
        id: 3,
        name: 'third',
        positionx: null,
        positiony: null,
    }]);
    return (
    <fileContext.Provider value = {{file, setFile}}>
        {children}
    </fileContext.Provider>
    );
}

