// Import necessary dependencies from React
import React from 'react';
import DataProvider from './context/DataProvider';
import Home from './components/Home'; // Adjust the path to the Home component

// App component - the main entry point of the application
function App() {
  return (
    // Wrap the entire application with the DataProvider to provide context
    <DataProvider>
      {/* Render the Home component */}
      <Home />
    </DataProvider>
  );
}

// Export the App component as the default export
export default App;
