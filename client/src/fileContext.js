import React, { createContext, useState } from 'react';

export const fileContext = createContext();
// React.useContext(fileContext) to use file/setfile
// need to import fileContext and wrap in FileProvider

export const FileProvider = ({children}) => {
                            // initally loaded problem
    const [file, setFile] = useState([
    {
        id: 0,
        name: 'This',
        indent: 0,
    },
    {
        id: 1,
        name: 'is a',
        indent: 1,
    },
    {
        id: 2,
        name: 'sample problem',
        indent: 2,
    }]);
    return (
    <fileContext.Provider value = {{file, setFile}}>
        {children}
    </fileContext.Provider>
    );
}