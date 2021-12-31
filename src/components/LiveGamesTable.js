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
  let url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=2021-12-30&endDate=2021-12-30`;
  // url to fetch teams array that will be used to get all teams in
  // league
  let teamUrl = "https://statsapi.web.nhl.com/api/v1/teams";
  // url to fetch the logo for specific team based on its id
  //let teamPicUrl = `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${teamId}.svg`;
  // State to hold API call for live games
  const [liveGames, setLiveGames] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => setLiveGames(response.data));
  }, [url]);

  const [teamLogos, setTeamLogos] = useState(null);
  useEffect(() => {
    let teams;
    let teamLogoPromises = [];
    let teamLogoArray = [];
    axios.get(teamUrl).then((response) => {
      teams = response.data.teams;
      // Create an array of promises to fetch each team logo
      teams.forEach((team) => {
        teamLogoPromises.push(
          axios.get(
            `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`
          )
        );
      });
      // Create an async function to fetch all team logos
      let getTeamLogos = async () => {
        let data = await Promise.all(teamLogoPromises);
        data = data.map((logo) => logo.data);
        for (let i = 0; i < teams.length; i++) {
          // for each team, push an object to an array with:
          // name, id, logo
          teamLogoArray[i] = {
            name: teams[i].name,
            id: teams[i].id,
            logo: data[i],
          };
        }
        setTeamLogos(teamLogoArray);
      };
      getTeamLogos();
    });
  }, [teamUrl]);

  // Convert ISO 8601 time to EST
  const convertStartTime = (time) => {
    let startTime = time.slice(11, time.length - 4);
    let startTimeHour = parseInt(startTime.slice(0, 2)) + 7;
    startTime = startTimeHour.toString() + ":00 p.m. EST";
    return "Today - " + startTime;
  };
  // Get live game time (current period - time left in period)
  const liveGameTime = (liveTime) => {
    let currentPeriod = liveTime.currentPeriod;
    currentPeriod = "P" + currentPeriod.toString();
    let timeLeftInPeriod = liveTime.currentPeriodTimeRemaining.pretty;
    return currentPeriod + " - " + timeLeftInPeriod;
  };
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
    } else if (game.status.state === "FINAL") {
      return "FINAL";
    }
  };

  // Collect all info from live games (status, team names, team logos, score, etc)
  // and push an accordion item for each game to an array to be rendered 
  let liveGameData = [];
  if (liveGames && teamLogos) {
    //console.log("liveGames: ", liveGames[0].games[1]);
    console.log("liveGames: ", liveGames);
    let allGames = liveGames[0].games;
    console.log("allGames", allGames);

    allGames.forEach((game) => {
      console.log("game: ", game);
      console.log("game scores: ", game.scores);
      let gameStatus = setGameStatus(game);
      console.log("gameStatus: ", gameStatus);
      let awayTeamLogo;
      let homeTeamLogo;
      let homeTeamName;
      let awayTeamName;
      // The abbreviation is used to destructure the object to
      // get the live score of the game
      let awayTeamAbbreviation = game.teams.away.abbreviation;
      let homeTeamAbbreviation = game.teams.home.abbreviation;
      let awayTeamScore = game.scores[`${awayTeamAbbreviation}`];
      let homeTeamScore = game.scores[`${homeTeamAbbreviation}`];
      let key = parseInt(`${game.teams.away.id}${game.teams.home.id}`);
      console.log("key: ", key);
    //   console.log(
    //     `${awayTeamAbbreviation} ${awayTeamScore} : ${homeTeamScore} ${homeTeamAbbreviation}`
    //   );
      let score;
      for (let i = 0; i < teamLogos.length; i++) {
        if (game.teams.away.id === teamLogos[i].id) {
          awayTeamLogo = teamLogos[i].logo;
          awayTeamName = teamLogos[i].name;
          //console.log("awayTeamLogo: ", awayTeamLogo);
          console.log("awayTeamName: ", awayTeamName);
        } else if (game.teams.home.id === teamLogos[i].id) {
          homeTeamLogo = teamLogos[i].logo;
          homeTeamName = teamLogos[i].name;
          //console.log("homeTeamLogo: ", homeTeamLogo);
          console.log("homeTeamName: ", homeTeamName);
        }
      }
      // Push the live game data to the array
      liveGameData.push(
        <Accordion.Item eventKey={`${key}`}>
          <Accordion.Header>
            {/* {gameStatus}    {awayTeamName}  {awayTeamScore} : {homeTeamScore}  {homeTeamName} */}
            
          </Accordion.Header>
          <Accordion.Body>"Proident sunt Lorem qui amet"</Accordion.Body>
        </Accordion.Item>
      );
    });
    console.log("liveGameData", liveGameData);
    console.log("_________________________________");
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
        {liveGameData ? liveGameData : "Error while loading data"}
      </Accordion>
    </Container>
  );
}

const ScoreboardHeader = styled.h1`
  font-family: "Heebo", sans-serif;
  font-size: 2rem;
  text-align: center;
`;

export default LiveGamesTable;
