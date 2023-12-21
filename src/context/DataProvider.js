import { createContext, useState } from 'react';

// Create a context for data management
export const DataContext = createContext(null);

// DataProvider component for managing and providing data to the app
const DataProvider = ({ children }) => {
    // State for managing notes, archive notes, and deleted notes
    const [notes, setNotes] = useState([]);
    const [archiveNotes, setArchiveNotes] = useState([]);
    const [deleteNotes, setDeleteNotes] = useState([]);

    // Provide the state values and setter functions to the context
    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archiveNotes,
            setArchiveNotes,
            deleteNotes,
            setDeleteNotes
        }}>
            {/* Render the child components */}
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
