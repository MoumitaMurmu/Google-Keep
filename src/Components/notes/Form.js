import React, { useState, useRef, useContext, useEffect } from 'react';
import { Box, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';

import { DataContext } from '../../context/DataProvider';

// Styled component for the container
const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`;

// Initial note template
const note = {
    id: '',
    heading: '',
    text: '',
};

// Function to get local items from storage
const getLocalItems = () => {
    const storedNotes = localStorage.getItem("list");
    return storedNotes ? JSON.parse(storedNotes) : [];
};

const Form = () => {
    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({ ...note, id: uuid() });

    // Get notes and setNotes function from the DataContext
    const { notes, setNotes } = useContext(DataContext);

    // Reference to the container
    const containerRef = useRef();

    // Load data from local storage when the component mounts
    useEffect(() => {
        const storedNotes = getLocalItems();
        if (storedNotes.length > 0) {
            setNotes(storedNotes);
        }
    }, [setNotes]);

    // Save data to local storage whenever notes state changes
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(notes));
    }, [notes]);

    // Handle click away from the text field
    const handleClickAway = () => {
        setShowTextField(false);
        containerRef.current.style.minHeight = '30px';
        setAddNote({ ...note, id: uuid() });

        // If heading or text is not empty, add a new note to the list
        if (addNote.heading || addNote.text) {
            setNotes((prevArr) => [addNote, ...prevArr]);
        }
    };

    // Handle click on the text area to show the text field
    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minHeight = '70px';
    };

    // Handle text change in the text fields
    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value };
        setAddNote(changedNote);
    };

    return (
        // ClickAwayListener to handle clicks away from the text field
        <ClickAwayListener onClickAway={handleClickAway}>
            {/* Styled container component */}
            <Container ref={containerRef}>
                {/* Show title text field when showTextField is true */}
                {showTextField && (
                    <TextField
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name="heading"
                        value={addNote.heading}
                    />
                )}
                {/* Multiline text field for note content */}
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={(e) => onTextChange(e)}
                    name="text"
                    value={addNote.text}
                />
            </Container>
        </ClickAwayListener>
    );
};

export default Form;
