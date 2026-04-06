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
            <Route path="/" element={<MainLayout />} />
            <Route path="/json-validator" element={<MainLayout />} />
            <Route path="/json-formatter" element={<MainLayout />} />
            <Route path="/json-minifier" element={<MainLayout />} />
            <Route path="/json-to-csv" element={<MainLayout />} />
            <Route path="/json-to-yaml" element={<MainLayout />} />
            <Route path="/json-to-xml" element={<MainLayout />} />
            <Route path="/json-size-checker" element={<MainLayout />} />
            <Route path="/json-size-in-bytes" element={<MainLayout />} />
            <Route path="/json-size-in-kb" element={<MainLayout />} />
            <Route path="/json-size-in-mb" element={<MainLayout />} />
            <Route path="/json-graphical-view" element={<MainLayout />} />
            <Route path="*" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;
