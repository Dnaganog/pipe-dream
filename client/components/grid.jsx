import React from 'react';
import styled from 'styled-components';
import Display from './display.jsx';

const GridSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const Grid = () => {
  const displays = [];
  for (let i = 0; i < 9; i += 1) {
    displays.push(<Display key={i + 'Display'}/>)
  }
  console.log(displays);
  return (
    <GridSection>
      {displays}
    </GridSection>
  )
}

export default Grid;
