import React from 'react';
import styled from 'styled-components';

const EntryWrapper = styled.p`
  border: 5px solid black;
`

function Entry(props) {
  return <div>
  <EntryWrapper>{props.datum}</EntryWrapper>
  </div>
}

export default Entry;