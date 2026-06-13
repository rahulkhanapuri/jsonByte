import React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const version = "1.0.2";

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                borderTop: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Stack spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary" align="center">
                    © {currentYear} JsonByte. All rights reserved. | Version {version}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                    <Link href="/about" color="inherit" underline="hover">About</Link>
                    <Link href="/contact" color="inherit" underline="hover">Contact</Link>
                    <Link href="/privacy-policy" color="inherit" underline="hover">Privacy Policy</Link>
                </Box>
            </Stack>
        </Box>
    );
};

export default Footer;
