
import React from 'react';
import FoodTruckNameGeneratorMUI from "@/components/FoodTruckNameGeneratorMUI";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#16a34a', // Green to match the original Tailwind primary
      light: '#dcfce7',
    },
    secondary: {
      main: '#4f46e5',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.375rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
        },
      },
    },
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <header style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
          <a 
            href="https://foodtechnologylabs.com" 
            style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}
          >
            FoodTechnologyLabs.com
          </a>
        </header>
        
        <main>
          <FoodTruckNameGeneratorMUI />
        </main>
        
        <footer style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          <p>© {new Date().getFullYear()} Food Technology Labs. All rights reserved.</p>
          <p style={{ marginTop: '0.25rem' }}>The ultimate resource for food truck entrepreneurs.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
