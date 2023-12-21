import { LightbulbOutlined as Lightbulb } from '@mui/icons-material';
import { Typography, Box, styled } from '@mui/material';

// Styled component for the Lightbulb icon
const LightIcon = styled(Lightbulb)`
    font-size: 120px;
    color: #F5F5F5;
`;

// Styled component for the text
const Text = styled(Typography)`
    color: #80868b;
    font-size: 22px;
`;

// Styled component for the container
const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20vh;
`;

// Component for displaying when there are no notes
const EmptyNotes = () => {
    return (
        <Container>
            {/* Lightbulb icon */}
            <LightIcon />

            {/* Text indicating that notes will appear here */}
            <Text>Notes you add appear here</Text>
        </Container>
    );
};

export default EmptyNotes;
