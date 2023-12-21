import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Modal,
  TextField,
  Button,
  Box,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  ColorLensOutlined as ColorLens,
} from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

// Styled component for the card
const StyledCard = styled(Card)`
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Note = ({ note }) => {
  // Extract data and functions from the DataContext
  const { notes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);

  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({});

  // Color Picker state
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentColor, setCurrentColor] = useState(note.color || '#ffffff');

  useEffect(() => {
    // Set the editedNote state when the note prop changes
    setEditedNote({
      heading: note.heading,
      text: note.text,
      color: note.color || '#ffffff',
    });
  }, [note]);

  // Handlers for the Color Picker
  const handleColorPickerClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color) => {
    setCurrentColor(color);
    handleColorPickerClose();
  };

  // Handlers for the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditedNote({ heading: note.heading, text: note.text, color: note.color || '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditedNote({});
  };

  // Archive and delete functions
  const archiveNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setArchiveNotes((prevArr) => [note, ...prevArr]);
  };

  const deleteNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setDeleteNotes((prevArr) => [note, ...prevArr]);
  };

  // Handle edits and save changes
  const handleEdit = () => {
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, heading: editedNote.heading, text: editedNote.text, color: editedNote.color } : n
    );
    setNotes(updatedNotes);
    handleCloseModal();
  };

  return (
    <>
      <div style={{ borderRadius: '8px', border: '1px solid #00000020' }}>
        {/* Styled card component */}
        <StyledCard onClick={handleOpenModal} style={{ backgroundColor: currentColor }}>
          <CardContent>
            <Typography>{note.heading}</Typography>
            <Typography>{note.text}</Typography>
          </CardContent>
        </StyledCard>

        {/* Card actions including Color Picker, Archive, and Delete buttons */}
        <CardActions style={{ backgroundColor: '#f7f1da' }}>
          <IconButton onClick={handleColorPickerClick}>
            <ColorLens fontSize="small" />
          </IconButton>
          {/* Color Picker menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleColorPickerClose}>
            <MenuItem onClick={() => handleColorSelect('#ffffff')} style={{ backgroundColor: '#ffffff' }} />
            <MenuItem onClick={() => handleColorSelect('#ffcccb')} style={{ backgroundColor: '#ffcccb' }} />
            <MenuItem onClick={() => handleColorSelect('#ffd700')} style={{ backgroundColor: '#ffd700' }} />
            <MenuItem onClick={() => handleColorSelect('#98fb98')} style={{ backgroundColor: '#98fb98' }} />
            <MenuItem onClick={() => handleColorSelect('#dda0dd')} style={{ backgroundColor: '#dda0dd' }} />
          </Menu>
          {/* Archive and Delete buttons */}
          <Archive fontSize="small" style={{ marginLeft: 'auto' }} onClick={() => archiveNote(note)} />
          <Delete fontSize="small" onClick={() => deleteNote(note)} />
        </CardActions>

        {/* Modal for editing notes */}
        <Modal open={isModalOpen} onClose={handleCloseModal} className='modal' style={{ borderRadius: '10px' }}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 26, p: 6 }}>
            {/* Text fields for editing title and text */}
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              margin="normal"
              value={editedNote.heading}
              onChange={(e) => setEditedNote({ ...editedNote, heading: e.target.value })}
            />
            <TextField
              label="Text"
              fullWidth
              multiline
              variant="standard"
              margin="normal"
              value={editedNote.text}
              onChange={(e) => setEditedNote({ ...editedNote, text: e.target.value })}
            />
            {/* Button to save changes */}
            <Button onClick={handleEdit}>Save Changes</Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Note;
