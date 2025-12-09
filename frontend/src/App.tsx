import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Box } from '@mui/material';
import Home from './pages/Home';
import InputForm from './pages/InputForm';
import Results from './pages/Results';
import Simulation from './pages/Simulation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', bgcolor: 'white', color: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              FinStable AI
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/results" element={<Results />} />
            <Route path="/simulate" element={<Simulation />} />
          </Routes>
        </Box>
        <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">
            © 2024 Financial Stability Advisor. Hackathon Project.
          </Typography>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
