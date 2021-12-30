import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../UX/Container";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";

function LiveGamesTable() {
  // Function to format current date to yyyy-mm-dd
  const formatYearMonthDay = (date) => date.toISOString().slice(0, 10);
  let currentDay = formatYearMonthDay(new Date());
  // url to fetch info for all live games
  let url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=2021-12-29&endDate=2021-12-29`;
  // State to hold API call for live games
  const [liveGames, setLiveGames] = useState(null);
  useEffect(() => {
    axios.get(url)
    .then(
        (response) => 
        //console.log(response.data)
        setLiveGames(response.data)
    );
  }, [url]);

  console.log("liveGames", liveGames);

  // Convert ISO 8601 time to EST
  const convertStartTime = (time) => {
    let startTime = time.slice(11, time.length - 4);
    let startTimeHour = parseInt(startTime.slice(0,2)) + 7;
    startTime = startTimeHour.toString() + ":00 p.m. EST";
    return "Today - " + startTime;
  }
  // Get live game time (current period - time left in period)
  const liveGameTime = (liveTime) => {
    let currentPeriod = liveTime.currentPeriod;
    currentPeriod = 'P' + currentPeriod.toString();
    let timeLeftInPeriod = liveTime.currentPeriodTimeRemaining.pretty;
    return currentPeriod + " - " + timeLeftInPeriod;
  }
  // This function will determine if a game has started or not
  // If it HAS NOT started, display the start time 
  // (EX. Today - 10:00 p.m EST)
  // If it HAS started, display current time in game
  // (EX. P1 - 15:33)
  // If game is postponed, display postponed
  const setGameStatus = (game) => {
    if (game.status.state === "PREVIEW") {
        return convertStartTime(game.startTime);
    } else if (game.status.state === "LIVE") {
        return liveGameTime(game.status.progress);
    } else if (game.status.state === "POSTPONED") {
        return "POSTPONED";
    }
  }

  let gamesArray = [];
  if (liveGames) {
      //console.log("liveGames: ", liveGames);
        for (let i = 0; i < liveGames[0].games.length; i++) {
            console.log("Game: ", liveGames[0].games[i]);
            console.log(setGameStatus(liveGames[0].games[i]));
            console.log("___________________________________");
        }
  }

  
  

  return (
    <Container
      backgroundColor="rgb(255,255,255, 0.6)"
      width="70%"
      height="45rem"
      display="flex"
      margin="2rem 0 0 0"
      justifyContent="center"
      flexDirection="column"
      padding="1rem"
    >
        <ScoreboardHeader>Scoreboard</ScoreboardHeader>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

const ScoreboardHeader = styled.h1`
    font-family: 'Heebo', sans-serif;
    font-size: 2rem;
    text-align: center;
`

export default LiveGamesTable;
