import React from 'react';
import Grid from './components/grid.jsx';
import VaadinButton from '../webcomponents/vaadin-button.js';
import styled from 'styled-components';

const AppDiv = styled.div`
  text-align: center;
`

const App = () => {
  return (
    <AppDiv>
      <h1>pipeDream.js</h1>
      <VaadinButton />
      <Grid />
    </AppDiv>
  );
};
export default App;
