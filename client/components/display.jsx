import React from 'react';
import styled from 'styled-components';

const DisplayDiv = styled.article`
  padding: 0.25rem 0.5rem;
  margins: 10px 10px 10px 10px;
  background: #EBECCA;
  border-radius: 25rem;
`

const Display = (props) => {
  return (
    <DisplayDiv>
      <h2>I am displaying!</h2>
    </DisplayDiv>
  )
}

export default Display;
