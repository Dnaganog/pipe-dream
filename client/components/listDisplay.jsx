import React from 'react';
import { FixedSizeList as List } from 'react-window';

const ListDisplay = (props) => {
  <List
  height={150}
  itemCount={1000}
  itemSize={35}
  width={300}
  >
  {props.entries}
  </List>
}
export default ListDisplay;