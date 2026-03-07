import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from './theme/ThemeContext';
import MainLayout from './components/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
