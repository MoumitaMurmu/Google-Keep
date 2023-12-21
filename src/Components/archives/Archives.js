import { useContext } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

// Import the Archive component
import Archive from './Archive';

// Styled component for the drawer header
const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

// Archives component for displaying all archived notes
const Archives = () => {
    // Extract archived notes from the DataContext
    const { archiveNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                {/* Drawer header */}
                <DrawerHeader />

                {/* Grid container to display archived notes */}
                <Grid container>
                    {/* Map through archived notes and render Archive component for each */}
                    {archiveNotes.map(archive => (
                        <Grid item key={archive.id}>
                            {/* Archive component */}
                            <Archive archive={archive} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Archives;
