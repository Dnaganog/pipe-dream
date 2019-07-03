import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
// import fetch from 'isomorphic-fetch';

const DisplayDiv = styled.article`
  padding: 0.25rem 0.5rem;
  margins: 10px 10px 10px 10px;
  background: #EBECCA;
  border-radius: 25rem;
`

const Display = (props) => {
  const [data, setData] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  function fetchUrl() {
    fetch('/db')
    .then(response => response.json())
    .then(data => {
      console.log('hi', data);
      setLoading(false)
      setData(JSON.stringify(data))
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    // setData('Hello World')
    fetchUrl();
  }, []);

  return (
    <DisplayDiv>
      <h2>I am displaying!</h2>
      {!loading && 
      <div>{data}</div>}
    </DisplayDiv>
  )
}

export default Display;
