import React, { createContext, useMemo, useState, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
    snowMode: false,
    toggleSnowMode: () => { }
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>('dark');
    const [snowMode, setSnowMode] = useState(false);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            snowMode,
            toggleSnowMode: () => {
                setSnowMode((prev) => !prev);
            }
        }),
        [snowMode],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // Light mode palette
                            primary: { main: '#0a7479' },
                            secondary: { main: '#dc004e' },
                            background: { paper: '#fafbfb', default: '#ffffff' },
                        }
                        : {
                            // Dark mode palette
                            primary: { main: '#0a7479' },
                            secondary: { main: '#f48fb1' },
                            background: { default: '#0d1117', paper: '#161b22' },
                        }),
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                borderRadius: 8,
                            }
                        }
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none'
                            }
                        }
                    }
                }
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ColorModeContext.Provider>
    );
};
