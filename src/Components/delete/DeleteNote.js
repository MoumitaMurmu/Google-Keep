import { useContext } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

// Styled component for the card
const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`;

// DeleteNote component for displaying and managing deleted notes
const DeleteNote = ({ deleteNote }) => {
    // Extract data and functions from the DataContext
    const { deleteNotes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);

    // Function to restore a deleted note
    const restoreNote = (deletedNote) => {
        const updatedNotes = deleteNotes.filter(data => data.id !== deletedNote.id);
        setDeleteNotes(updatedNotes);
        setNotes(prevArr => [deletedNote, ...prevArr]);
    }

    // Function to permanently remove a deleted note
    const removeNote = (deletedNote) => {
        // Display a confirmation dialog
        const userConfirmed = window.confirm("Are you sure you want to remove this note?");

        // If the user confirms, proceed with note removal
        if (userConfirmed) {
            const updatedNotes = deleteNotes.filter(data => data.id !== deletedNote.id);
            setDeleteNotes(updatedNotes);
        }
    }

    return (
        // Styled card component
        <StyledCard>
            {/* Card content with heading and text */}
            <CardContent>
                <Typography>{deleteNote.heading}</Typography>
                <Typography>{deleteNote.text}</Typography>
            </CardContent>
            
            {/* Card actions with delete and restore buttons */}
            <CardActions>
                {/* Delete button */}
                <Delete 
                    fontSize="small" 
                    style={{ marginLeft: 'auto' }} 
                    onClick={() => removeNote(deleteNote)}
                />
                
                {/* Restore button */}
                <Restore 
                    fontSize="small"
                    onClick={() => restoreNote(deleteNote)}
                />
            </CardActions>
        </StyledCard>
    );
}

export default DeleteNote;
