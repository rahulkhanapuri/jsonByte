import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

interface AdSenseBannerProps {
    adClient?: string;
    adSlot?: string;
    format?: string;
    fullWidthResponsive?: boolean;
}

declare global {
    interface Window {
        adsbygoogle?: Array<Record<string, unknown>>;
    }
}

const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
    adClient = 'ca-pub-9229899133028155',
    adSlot = '1234567890',
    format = 'auto',
    fullWidthResponsive = true,
}) => {
    
      const location = useLocation();

    useEffect(() => {
        const scriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
        const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');

        const pushAd = () => {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        };

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.onload = pushAd;
            document.head.appendChild(script);
            return;
        }

        pushAd();
    }, [adClient, location.pathname]);

    return (
        <Box sx={{ my: 2, width: '100%' }}>
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    color: 'text.secondary',
                    mb: 0.75,
                    textAlign: 'center',
                }}
            >
                Advertisement
            </Typography>
            <Box
                component="ins"
                className="adsbygoogle"
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format={format}
                data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
                sx={{
                    display: 'block',
                    width: '100%',
                    minHeight: 90,
                    borderRadius: 2,
                    border: '1px dashed',
                    borderColor: 'divider',
                    bgcolor: 'action.hover',
                    mx: 'auto',
                    textAlign: 'center',
                    overflow: 'hidden',
                }}
            />
        </Box>
    );
};

export default AdSenseBanner;
