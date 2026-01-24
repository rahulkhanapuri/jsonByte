import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from './theme/ThemeContext';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MainLayout />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
