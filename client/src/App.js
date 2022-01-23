import React, { useState, useEffect } from "react";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import { bindActionCreators } from 'redux';
// import * as actionCreators from './actions/types';
// import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import background1 from "./media/arena-background.jpg";
import FetchRoster from "./components/FetchRoster";
import RosterTable from "./components/RosterTable";
import "bootstrap/dist/css/bootstrap.min.css";
import LiveGamesTable from "./components/LiveGamesTable";
import NavBar from "./components/NavBar";
import Standings from "./components/Standings";
import "bootstrap/dist/css/bootstrap.min.css";
import TopTenStats from "./components/top10stats/TopTenStats";
import Top10Points from "./components/top10stats/Top10Points";

function App() {
  // const player = useSelector((state) => state.player);

  // console.log("player: ", player);

  // const dispatch = useDispatch();

  // const AC = bindActionCreators(actionCreators, dispatch);



  return (
    // <Provider store={store}>
    <PageWrapper className="wrapper">
      <NavBar />
      {/* <LiveGamesTable/> */}
      {/* <FetchRoster/> */}
      {/* <Standings/> */}
      {/* <TopTenStats /> */}
      {/* <Routes>
        <Route to="/" component={Top10Points}></Route>
      </Routes> */}
      <TopTenStats />
    </PageWrapper>
    // </Provider>
  );
}

const PageWrapper = styled.div`
  border: 1px solid black;
  background: url(${background1}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  min-height: 200vh;
  ${"" /* height: 100%; */}
  display: flex;
  ${"" /* justify-content: center; */}
  align-items: center;
  flex-direction: column;
`;

export default App;
