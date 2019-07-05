import React from 'react';
import styled from 'styled-components';
import Display from './display.jsx';

const GridSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const Grid = (props) => {
  const displays = [];
  let i = 0;
  let shadowValue = 'middle';
  while (i < 36) {
    if(i % 3 === 0) shadowValue = 'left';
    if(i % 3 === 1) shadowValue = 'middle';
    if(i % 3 === 2) shadowValue = 'right';
    displays.push(
    <Display 
      label={i % 2 ? "GridItemOdd" : "GridItemEven"} 
      shadow={shadowValue}
      rows={props.rows}
      inverted={props.inverted}
      key={i + 'Display'}
    />
    )
      i += 1;
  }
  return (
    <GridSection>
      {displays}
    </GridSection>
  )
}

export default Grid;
