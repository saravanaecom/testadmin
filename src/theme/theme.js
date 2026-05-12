import { createTheme } from '@mui/material/styles';

const COLORS = {
  orange: '#FF7A00',
  orangeLight: '#FFF0E0',
  orangeDark: '#E06800',

  purple: '#6A3DF0',
  purpleLight: '#EDE8FD',
  purpleDark: '#5530C8',

  white: '#FFFFFF',
  background: '#F8F9FB',
  darkText: '#222222',
  grey: '#E5E7EB',
  charcoal: '#4a4a4a',
  navy: '#222222',

  green: '#22C55E',
  red: '#EF4444',
};

export const ThemeSettings = (themeLists = {}) => {
  return createTheme({
    typography: {
      fontFamily: "'Barlow', sans-serif",
      h1: {
        fontWeight: 700,
        color: COLORS.navy,
      },
      h2: {
        fontWeight: 600,
        color: COLORS.navy,
      },
      h3: {
        fontWeight: 600,
        color: COLORS.navy,
      },
      h4: {
        fontWeight: 600,
        color: COLORS.navy,
      },
      h5: {
        fontWeight: 600,
        color: COLORS.navy,
      },
      h6: {
        fontWeight: 600,
        color: COLORS.navy,
      },
      body1: {
        color: COLORS.charcoal,
      },
      body2: {
        color: COLORS.charcoal,
      },
    },
    paletteSecondary: {
      basecolorCode: {
        main: themeLists.basecolorCode || COLORS.orange,
        secondary: themeLists.basecolorCode || COLORS.orangeLight,
      },
      colorCode: {
        main: themeLists.colorCode || COLORS.darkText,
        secondary: themeLists.colorCode || COLORS.charcoal,
      },
      lightblackcolorCode: {
        main: themeLists.lightblackcolorCode || COLORS.darkText,
      },
      shadowcolorCode: {
        main: themeLists.shadowcolorCode || COLORS.orangeLight,
      },
      whitecolorCode: {
        main: themeLists.whitecolorCode || COLORS.white,
      },
      footertextcolorCode: {
        main: COLORS.purpleLight,
      }
    },
    palette: {
      primary: {
        main: COLORS.orange,
        light: COLORS.orangeLight,
        dark: COLORS.orangeDark,
        contrastText: COLORS.white,
      },
      secondary: {
        main: COLORS.purple,
        light: COLORS.purpleLight,
        dark: COLORS.purpleDark,
        contrastText: COLORS.white,
      },
      basecolorCode: {
        main: themeLists.basecolorCode || COLORS.orange,
        secondary: themeLists.basecolorCode || COLORS.orangeLight,
      },
      colorCode: {
        main: themeLists.colorCode || COLORS.darkText,
        secondary: themeLists.colorCode || COLORS.charcoal,
      },
      lightblackcolorCode: {
        main: themeLists.lightblackcolorCode || COLORS.darkText,
      },
      shadowcolorCode: {
        main: themeLists.shadowcolorCode || COLORS.orangeLight,
      },
      whitecolorCode: {
        main: themeLists.whitecolorCode || COLORS.white,
      },
      footertextcolorCode: {
        main: COLORS.purpleLight,
      },
      navy: {
        main: COLORS.darkText,
      },
      background: {
        default: COLORS.white,
        paper: COLORS.white,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
          },
          containedPrimary: {
            backgroundColor: COLORS.orange,
            '&:hover': { backgroundColor: COLORS.orangeDark },
          },
          containedSecondary: {
            backgroundColor: COLORS.purple,
            '&:hover': { backgroundColor: COLORS.purpleDark },
          },
          outlinedPrimary: {
            borderColor: COLORS.orange,
            color: COLORS.orange,
            '&:hover': { backgroundColor: COLORS.orangeLight, borderColor: COLORS.orange },
          },
          outlinedSecondary: {
            borderColor: COLORS.purple,
            color: COLORS.purple,
            '&:hover': { backgroundColor: COLORS.purpleLight, borderColor: COLORS.purple },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: COLORS.purple,
          },
        },
      },
    },
  });
};

export { COLORS };
export default ThemeSettings;
