import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled component for the header
const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

// Styled component for the heading
const Heading = styled(Typography)`
  color: #5F6368;
  font-size: 24px;
  margin-left: 25px;
`;

// HeaderBar component with props for open state and drawer handling
const HeaderBar = ({ open, handleDrawer }) => {
  // Placeholder logo URL
  const logo = 'https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png';
  
  return (
    // Styled header component
    <Header open={open}>
      {/* Toolbar for organizing header content */}
      <Toolbar>
        {/* IconButton for opening/closing the drawer */}
        <IconButton
          onClick={() => handleDrawer()}
          sx={{ marginRight: '20px'}}
          edge="start"
        >
          {/* Menu icon */}
          <Menu />
        </IconButton>
        {/* Logo image */}
        <img src={logo} alt="logo" style={{width: 30}} />
        {/* Heading text */}
        <Heading>Keep</Heading>
      </Toolbar>
    </Header>
  );
}

export default HeaderBar;
