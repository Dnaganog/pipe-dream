import React, {useState, useEffect} from 'react';
import Entry from './entry.jsx';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import Rx, {interval, of, from} from 'rxjs';
import {throttleTime, map, pluck, debounceTime} from 'rxjs/operators'
import {useObservable, useEventCallback} from 'rxjs-hooks';
// import request from 'request';

const DisplayDiv = styled.article`
  padding: 0.25rem 0.5rem;
  margins: 10px 10px 10px 10px;
  background: #EBECCA;
  border-radius: 25rem;
`

const Display = (props) => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [keyword, setKeyword] = useState('want');
  // const [geo, setGeo] = useState('US-CA-800');
  // let fetchObj = {
  //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: 'same-origin', // include, *same-origin, omit
  //   headers: {
  //       'Content-Type': 'application/json',
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify({
  //     keyword: textValue,
  //     // geo: geo,
  //   }), // body data type must match "Content-Type" header
  // }
  
  function fetchUrl(value) {
    fetch('/db', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        keyword: value,
        // geo: geo,
      }), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(response => {
      // console.log('hi', response);
      // if (JSON.parse(response).keyword) setData(JSON.parse(response).keyword)
      // console.log(response);
      setData(JSON.parse(JSON.parse(response).keyword));
      // setLoading(false);
      // dataArr = Array.from(data);
      return 
    })
    .catch(err => {
      console.log(err);
    })
  }
  const addS = (input) => {return input + 's'};

  
  const [textCallback, textValue] = useEventCallback(
    event$ => event$.pipe(
      throttleTime(600),
      pluck('target', 'value'),
      map(value => {console.log(value); return value}),
      map(value => {if(value.length > 1) fetchUrl(value); return value})), 'type away friend!');
  // const observable = interval(6000);
  
  // useEffect(() => {
  //   // setData('Hello World')
  //   fetchUrl();
  // }, []);
  const Entries = [];
  for(let i = 0; i < data.length; i += 1) {
    Entries.push(data[i])
  }

  const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      {Entries[index]}
    </div>
  );
  // const Entries = data.map((e, i) => (<Entry key={i + 'entry'} datum={e}/>))
  return (
    <DisplayDiv>
      <h2>{textValue}</h2>
        <input type="text" name="name" onChangeCapture={textCallback}/>
        <List
          height={150}
          itemCount={12}
          itemSize={35}
          width={300}
          >
          {Row}
        </List>
        {/* {loading &&
        <p>Loading...</p>} */}
    </DisplayDiv>
  )
}

export default Display;
