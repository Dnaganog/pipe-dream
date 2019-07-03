import React, {useState, useEffect} from 'react';
import Entry from './entry.jsx';
import styled from 'styled-components';
// import request from 'request';

const DisplayDiv = styled.article`
  padding: 0.25rem 0.5rem;
  margins: 10px 10px 10px 10px;
  background: #EBECCA;
  border-radius: 25rem;
`

const Display = (props) => {
  const [data, setData] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('love');
  const [geo, setGeo] = useState('US-CA-800');
  let fetchObj = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      keyword: keyword,
      geo: geo,
    }), // body data type must match "Content-Type" header
}

  function fetchUrl() {
    fetch('/db', fetchObj)
    .then(response => response.json())
    .then(response => {
      console.log('hi', response);
      setData(response.default.rankedList.map(e => e.rankedKeyword.map(e => e.query))[0]);
      setLoading(false);
      // dataArr = Array.from(data);
    })
    .catch(err => {
      console.log(err);
    })
    // request.get('/db')
    // .on('error', () => {
    //   console.log('error');
    // })
    // .pipe(dataArr)
  }

  useEffect(() => {
    // setData('Hello World')
    fetchUrl();
  }, []);
  const Entries = [];
  for(let i = 0; i < data.length; i += 1) {
    Entries.push(<Entry key={i + 'button'} datum={data[i]}/>)
  }
  // const Entries = data.map((e, i) => (<Entry key={i + 'entry'} datum={e}/>))
  return (
    <DisplayDiv>
      <h2>I am displaying!</h2>
        {Entries}
        {loading &&
        <p>Loading...</p>}
    </DisplayDiv>
  )
}

export default Display;
