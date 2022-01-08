import React, {useState} from 'react';
import './App.css';
import styled from 'styled-components'
import background1 from './media/arena-background.jpg';
import FetchRoster from './components/FetchRoster'
import RosterTable from './components/RosterTable'
import 'bootstrap/dist/css/bootstrap.min.css';
import LiveGamesTable from './components/LiveGamesTable';
import NavBar from './components/NavBar';
import Standings from './components/Standings';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopTenStats from './components/TopTenStats';

function App() {
  return (
    <PageWrapper className="wrapper">
      <NavBar/>
      {/* <RosterTable/> */}
      {/* <FetchRoster/> */}
      {/* <LiveGamesTable/> */}
      {/* <Standings/> */}
      <TopTenStats/>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  border: 1px solid black;
  background: url(${background1}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  height: 200vh;
  display: flex;
  ${'' /* justify-content: center; */}
  align-items: center;
  flex-direction: column;
`

export default App;
