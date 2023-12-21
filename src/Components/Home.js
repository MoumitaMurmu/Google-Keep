import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataProvider from '../context/DataProvider';

import { Box } from '@mui/material';
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';

const Home = () => {
  return (
    // Wrap the entire application with the DataProvider to provide context
    <DataProvider>
      {/* Use Box for flexible layout */}
      <Box style={{ display: 'flex', width: '100%' }}>
        {/* Set up routing using React Router */}
        <Router>
          {/* Include the SwipeDrawer component outside the Routes for consistent navigation */}
          <SwipeDrawer />

          {/* Define the routes for different sections of the app */}
          <Routes>
            {/* Route for the main Notes section */}
            <Route path="/" element={<Notes />} />

            {/* Route for the Archives section */}
            <Route path="/archive" element={<Archives />} />

            {/* Route for the DeleteNotes section */}
            <Route path="/delete" element={<DeleteNotes />} />
          </Routes>
        </Router>
      </Box>
    </DataProvider>
  );
}

export default Home;
