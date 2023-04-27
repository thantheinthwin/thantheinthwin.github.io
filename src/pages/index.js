import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, colors } from '@mui/material'

import { Main } from './components';

export const ColorModeContext = React.createContext();

export default function App() {
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // customizing theme
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...( mode === 'light' 
          ? {
          // palette values for light mode
            
          } 
          : {
          // palette values for dark mode
           background: {
            default: colors.grey[800]
           }
          }),
        },
        typography: {
          fontFamily: 'Quicksand',
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightSemiBold: 600,
          fontWeightBold: 700,
          Logo: {
            fontFamily: 'Lobster'
          }
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280
          }
        }
      }),
    [mode],
  );

  React.useEffect(() => {
    if(mode === 'dark'){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  })

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}