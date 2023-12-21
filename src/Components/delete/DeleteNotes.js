import { useContext } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';
import DeleteNote from './DeleteNote';

// Styled component for the drawer header
const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

// DeleteNotes component for displaying all deleted notes
const DeleteNotes = () => {
    // Extract deleted notes from the DataContext
    const { deleteNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                {/* Drawer header */}
                <DrawerHeader />

                {/* Grid container to display deleted notes */}
                <Grid container>
                    {/* Map through deleted notes and render DeleteNote component for each */}
                    {deleteNotes.map(deleteNote => (
                        <Grid item key={deleteNote.id}>
                            {/* DeleteNote component */}
                            <DeleteNote deleteNote={deleteNote} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default DeleteNotes;
