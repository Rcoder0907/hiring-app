import React from "react";
import { useSelector } from 'react-redux';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Routes from './routes';

import themes from './themes';

// import NavigationScroll from './elements/Navigation/NavigationScroll';

function App() {

  const customization = useSelector((state) => state.customization);
  return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          {/*<NavigationScroll>*/}
            <Routes />
          {/*</NavigationScroll>*/}
        </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
