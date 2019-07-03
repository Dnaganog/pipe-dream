import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  border: 5px solid red;
  border-radius: 25rem;
`

function Button() {
  return (
    <ButtonStyle>Add</ButtonStyle>
  )
}

export default Button;