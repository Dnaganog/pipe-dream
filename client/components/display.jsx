import React, {useState, useEffect} from 'react';
import Entry from './entry.jsx';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import {Observable, interval, of, from} from 'rxjs';
import {throttleTime, map, pluck, debounceTime} from 'rxjs/operators'
import {useObservable, useEventCallback} from 'rxjs-hooks';

const DisplayDiv = styled.article`
  padding: 0.25rem 0.5rem;
  margins: 5px 5px 5px 5px;
  border-radius: 10px;
  text-align: center;
  box-shadow: ${(props) => {
    switch(props.shadow) {
      case 'left':
        return '-15px 15px #615550';
      case 'middle':
        return '0px 20px #615550';
      case 'right':
          return '15px 15px #615550';
      default:
        return '0px 10px #615550';
    }
  }};
  background-color: ${(props) => props.className === 'GridItemOdd' ? '#f5d6c6' : '#fff'};
  border: 5px solid ${(props) => props.className === 'GridItemOdd' ? '#eee' : '#f5d6c6'};
  visibility: ${(props) => {
    return props.className === (props.inverted ? 'GridItemEven' : 'GridItemOdd') ? 'hidden' : 'visible'
  }};
`

const InputFancy = styled.input`
  padding: 0.25rem 0.5rem;
  border-radius: 10rem;
  text-align: center;
  font-size: 22px;
`

const HrFancy = styled.hr`
  border: 1px solid #615550;
`

const RowDiv = styled.div`
  font-size: 22px;
  border-radius: 25rem;
  background-color: ${(props) => props.className === 'ListItemEven' ? '#f5d6c6' : '#fff'};
`

const Display = (props) => {
  const [data, setData] = useState([]);

  function fetchUrl(value) {
    fetch('/db', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: value,
      }),
    })
    .then(response => response.json())
    .then(response => {
      setData(JSON.parse(JSON.parse(response).keyword));
      return;
    })
    .catch(err => {
      console.log(err);
    })
  }
  const addS = (input) => {return input + 's'};

  const [textCallback, textValue] = useEventCallback(
    event$ => event$.pipe(
      throttleTime(100),
      pluck('target', 'value'),
      map(value => {return value}),
      map(value => {if(value.length > 1) fetchUrl(value); return value})), 'type away friend!');
  
  const Entries = [];
  for(let i = 0; i < data.length; i += 1) {
    Entries.push(data[i])
  }

  const Row = ({ index, style }) => (
    <RowDiv className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      {Entries[index]}
    </RowDiv>
  );
  
  return (
    <DisplayDiv shadow={props.shadow} className={props.label} inverted={props.inverted}>
      <h2>*{textValue}*</h2>
        <InputFancy 
          type="text" 
          name="name"
          placeholder="word association!"
          onChangeCapture={textCallback}
        />
        <HrFancy/>
        <List
          height={150}
          itemCount={props.rows}
          itemSize={35}
          width={window.outerWidth / 3.01}
          >
          {Row}
        </List>
        <p>showing <strong>{String(props.rows)}</strong> items</p>
    </DisplayDiv>
  )
}

export default Display;
