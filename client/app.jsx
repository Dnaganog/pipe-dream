import React, {useState} from 'react';
import Grid from './components/grid.jsx';
import styled from 'styled-components';
import Rx, {interval, of, from} from 'rxjs';
import {throttleTime, map, pluck, debounceTime} from 'rxjs/operators'
import {useObservable, useEventCallback} from 'rxjs-hooks';

const AppDiv = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: * 1fr *;
`

const Header = styled.header`
  width: ${window.innerWidth};
  position: sticky
`

const InvertButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 10rem;
  font-size: 22px;
`

const InputFancy = styled.input`
  padding: 0.25rem 0.5rem;
  border-radius: 10rem;
  text-align: center;
  font-size: 22px;
`
const Slider = styled.input`
  width: ${window.innerWidth};
`

const PFancy = styled.p`
  font-size: 22px;
`

const App = () => {
  const [data, setData] = useState([]);
  const [inverted, setInverted] = useState(false);
  const [sliderCallback, sliderValue] = useEventCallback(
    event$ => event$.pipe(
      pluck('target', 'value'),
      map(value => {return Number(value)})), 12);
  // console.log('this is slider Value',sliderValue);
  const invertHandler = () => setInverted(!inverted);
  return (
    <AppDiv>
      <Header>
        <h1>pipeDream.js</h1>
        <InvertButton onClick={invertHandler}>Invert!</InvertButton>
        <br/>
        <Slider type='range' min='1' max='36' value={sliderValue} onChange={sliderCallback}/>
        <PFancy># of results: </PFancy><PFancy><strong>{sliderValue + ' rows'}</strong></PFancy>
        {/* <InputFancy 
          type="text" 
          name="db-search"
          placeholder="global search!"
        /> */}
      </Header>
      <Grid inverted={inverted} rows={sliderValue}/>
    </AppDiv>
  );
};
export default App;
