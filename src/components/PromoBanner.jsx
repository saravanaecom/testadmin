import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { LocalOffer, Verified } from '@mui/icons-material';

const PromoBanner = () => {
    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
            py: { xs: 2, md: 3 },
            borderTop: '2px solid #FF9933',
            borderBottom: '2px solid #138808',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.9)',
                zIndex: 0
            }
        }}>
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={4} md={4}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: '8px',
                            background: 'rgba(255, 153, 51, 0.1)',
                            border: '2px solid #FF9933',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(255, 153, 51, 0.2)'
                            }
                        }}>
                            <LocalOffer sx={{ fontSize: 32, color: '#FF9933' }} />
                            <Box>
                                <Typography sx={{ 
                                    fontWeight: 700, 
                                    fontSize: { xs: '14px', sm: '15px' },
                                    color: '#1a1a2e',
                                    lineHeight: 1.2
                                }}>
                                    தரமான சேவை உறுதி

                                </Typography>
                                <Typography sx={{ 
                                    fontSize: { xs: '11px', sm: '12px' },
                                    color: '#4a4a4a',
                                    fontWeight: 500
                                }}>
                                    quality service guarantee
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: { xs: 'center', sm: 'center' },
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: '8px',
                            background: 'rgba(19, 136, 8, 0.1)',
                            border: '2px solid #138808',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(19, 136, 8, 0.2)'
                            }
                        }}>
                            <Verified sx={{ fontSize: 32, color: '#138808' }} />
                            <Box>
                                <Typography sx={{ 
                                    fontWeight: 700, 
                                    fontSize: { xs: '14px', sm: '15px' },
                                    color: '#1a1a2e',
                                    lineHeight: 1.2
                                }}>
                                 குறைந்த விலை உத்தரவாதம்

                                </Typography>
                                <Typography sx={{ 
                                    fontSize: { xs: '11px', sm: '12px' },
                                    color: '#4a4a4a',
                                    fontWeight: 500
                                }}>
                                    lowest price guarantee
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    
                </Grid>
            </Container>
        </Box>
    );
};

export default PromoBanner;
