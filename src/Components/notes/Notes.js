import { useContext, useEffect } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

// Components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';
import { LightbulbOutlined } from '@mui/icons-material';

// Styled component for the drawer header
const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {
    // Get notes and setNotes function from the DataContext
    const { notes, setNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                {/* Drawer header for styling consistency */}
                <DrawerHeader />

                {/* Form component for adding new notes */}
                <Form />

                {/* Check if there are notes to display */}
                {notes.length > 0 ? (
                    // Grid container for organizing note components
                    <Grid container style={{ marginTop: 16 }}>
                        {notes.map((note) => (
                            <Grid item key={note.id}>
                                {/* Note component for displaying individual notes */}
                                <Note note={note} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    // Display EmptyNotes component when there are no notes
                    <EmptyNotes />
                )}
            </Box>
        </Box>
    );
};

export default Notes;
