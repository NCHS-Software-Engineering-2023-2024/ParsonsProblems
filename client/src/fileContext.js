import React, { createContext, useState } from 'react';

export const fileContext = createContext();
// React.useContext(fileContext) to use file/setfile
// need to import fileContext and wrap in FileProvider

export const FileProvider = ({children}) => {
                            // initally loaded problem
    const [file, setFile] = useState([
    {
        id: 1,
        name: 'numba 1',
        indent: 0,
    },
    {
        id: 2,
        name: 'Numba 2',
        indent: 1,
    },
    {
        id: 3,
        name: 'NUMBA 3',
        indent: 2,
    }]);
    return (
    <fileContext.Provider value = {{file, setFile}}>
        {children}
    </fileContext.Provider>
    );
}