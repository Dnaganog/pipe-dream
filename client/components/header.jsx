import React from 'react';
import styled from 'styled-components';
import Button from './button.jsx'

const HeaderWrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

function Header() {
  const Buttons = [];
  for(let i = 0; i < 3; i += 1) {
    Buttons.push(<Button key={i + 'button'}/>)
  }
  return (
    <HeaderWrapper>
      {Buttons}
    </HeaderWrapper>
  )
}

export default Header;