import React from 'react';
import "../style.css";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50', // Deep navy blue
    },
    secondary: {
      main: '#2980b9', // Softer blue
    },
    error: {
      main: '#c0392b', // Assertive red
    },
    background: {
      default: '#ecf0f1', // Light grey
      paper: '#bdc3c7', // Medium grey
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontSize: '2rem', // Increased size
    },
    h5: {
      fontSize: '1.5rem', // Increased size
    },
  },
});

function LoginSection() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Updated styling for the login section
  const loginSectionStyle = {
    mt: 2,
    py: 3, // Increased padding
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light,
    // Adjusted margin to push the section slightly up
    marginBottom: '64px', // You can adjust this value to suit your layout
  };

  return (
    <Box sx={loginSectionStyle}>
      <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
        Ready to Manage Your Assets?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginClick}
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.primary.dark, // Added hover effect
            // You can change the color to whatever you want
          },
        }}
      >
        Log In
      </Button>
    </Box>
  );
}

function FeatureCard({ title, description }) {
  // Increased padding and removed hover effects from the card
  const cardStyle = {
    padding: 3,
    backgroundColor: '#e8eaf6',
    // Removed hover effect from the card
  };

  return (
    <Grid item xs={12} sm={4}>
      <Paper elevation={2} sx={cardStyle}>
        <Typography variant="h5" component="h3" sx={{ color: theme.palette.primary.main }}>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Paper>
    </Grid>
  );
}

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header placeholder */}
        <main style={{ flex: 1 }}>
          <Paper elevation={3} sx={{ padding: 4, margin: 2, backgroundColor: theme.palette.primary.main, color: '#fff' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to IT Asset Management
            </Typography>
            <Typography variant="h6" gutterBottom>
              Manage your software assets efficiently and effectively.
            </Typography>
          </Paper>

          <Grid container spacing={2} sx={{ padding: 3 }}>
            <FeatureCard
              title="Asset Tracking"
              description="Keep track of all your assets in one place with powerful search functionality."
            />
            <FeatureCard
              title="Collaborative Environment"
              description="Work together with your team to manage and update assets seamlessly."
            />
            <FeatureCard
              title="Advanced Reporting"
              description="Generate reports to get insights into your assets' status and history."
            />
          </Grid>
        </main>

        {/* LoginSection slightly above the bottom */}
        <LoginSection />

        {/* Footer placeholder */}
        {/* Add your footer here and apply similar styling to push it to the bottom if needed */}
      </Box>
    </ThemeProvider>
  );
}

export default Home;
