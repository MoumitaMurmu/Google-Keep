import { useContext, useEffect } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

// Styled component for the card
const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`;

// Archive component for displaying archived notes
const Archive = ({ archive }) => {
    // Extract data and functions from the DataContext
    const { archiveNotes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);

    // Effect to load data from local storage when the component mounts
    useEffect(() => {
        const storedArchiveNotes = JSON.parse(localStorage.getItem("archiveList")) || [];
        if (storedArchiveNotes.length > 0) {
          setArchiveNotes(storedArchiveNotes);
        }
    }, [setArchiveNotes]);
    
    // Effect to save data to local storage whenever archiveNotes state changes
    useEffect(() => {
        localStorage.setItem("archiveList", JSON.stringify(archiveNotes));
    }, [archiveNotes]);

    // Function to unarchive a note
    const unArchiveNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        setArchiveNotes(updatedNotes);
        setNotes(prevArr => [archive, ...prevArr]);
    }

    // Function to delete a note from the archive
    const deleteNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        setArchiveNotes(updatedNotes);
        setDeleteNotes(prevArr => [archive, ...prevArr]);
    }

    return (
        // Styled card component
        <StyledCard>
            {/* Card content with heading and text */}
            <CardContent>
                <Typography>{archive.heading}</Typography>
                <Typography>{archive.text}</Typography>
            </CardContent>
            
            {/* Card actions with unarchive and delete buttons */}
            <CardActions>
                {/* Unarchive button */}
                <Unarchive 
                    fontSize="small" 
                    style={{ marginLeft: 'auto' }} 
                    onClick={() => unArchiveNote(archive)}
                />
                
                {/* Delete button */}
                <Delete 
                    fontSize="small"
                    onClick={() => deleteNote(archive)}
                />
            </CardActions>
        </StyledCard>
    );
}

export default Archive;
