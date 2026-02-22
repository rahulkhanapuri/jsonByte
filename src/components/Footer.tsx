import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const version = "1.0.0";

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
            <Typography variant="body2" color="text.secondary" align="center">
                © {currentYear} JsonByte. All rights reserved. | Version {version}
            </Typography>
        </Box>
    );
};

export default Footer;
