import React from 'react';
import styled from 'styled-components';

const EntryWrapper = styled.p`
  border: 5px solid rgba(0,0,255,0.1);
`

function Entry(props) {
  return <div>
  <EntryWrapper>{props.datum}</EntryWrapper>
  </div>
}

export default Entry;