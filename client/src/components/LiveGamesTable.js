import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "../UX/Container";
import { Accordion, Table } from "react-bootstrap";
import styled from "styled-components";
import SVG, { Props as SVGProps } from "react-inlinesvg";

function LiveGamesTable() {
  // Function to format current date to yyyy-mm-dd
  const formatYearMonthDay = (date) => date.toISOString().slice(0, 10);
  let currentDay = formatYearMonthDay(new Date());
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let newDate = year + "-" + month + "-" + (day - 1);
  // url to fetch info for all live games
  let url = `https://nhl-score-api.herokuapp.com/api/scores?startDate=${currentDay}&endDate=${currentDay}`;
  // url to fetch teams array that will be used to get all teams in
  // league
  let teamUrl = "https://statsapi.web.nhl.com/api/v1/teams";
  // url to fetch the logo for specific team based on its id
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
    // Array to hold all games
    let allGames = liveGames[0].games;
    allGames.forEach((game) => {
      let gameStatus = setGameStatus(game);
      let awayTeamLogoURL;
      let homeTeamLogoURL;
      let homeTeamName;
      let awayTeamName;
      // The abbreviation is used to destructure the object to
      // get the live score of the game
      let awayTeamAbbreviation = game.teams.away.abbreviation;
      let homeTeamAbbreviation = game.teams.home.abbreviation;
      let awayTeamScore = game.scores[`${awayTeamAbbreviation}`];
      let homeTeamScore = game.scores[`${homeTeamAbbreviation}`];
      let key = parseInt(`${game.teams.away.id}${game.teams.home.id}`);
      //   loop through teamLogos and set svg logo and name of team
      for (let i = 0; i < teamLogos.length; i++) {
        if (game.teams.away.id === teamLogos[i].id) {
          awayTeamLogoURL = teamLogos[i].logo;
          awayTeamName = teamLogos[i].name;
        } else if (game.teams.home.id === teamLogos[i].id) {
          homeTeamLogoURL = teamLogos[i].logo;
          homeTeamName = teamLogos[i].name;
        }
      }
      let goals = [];
      if (game.status.state !== "POSTPONED") {
        
        if (game.goals) {
          for (let i = 0; i < game.goals.length; i++) {
            goals.push(
              <tr>
                {/* Period */}
                <td>{game.goals[i].period}</td>
                {/* Team */}
                <td>{game.goals[i].team}</td>
                {/* Time */}
                <td>'{game.goals[i].min}</td>
                {/* Goal Scorer */}
                <td>
                  {game.goals[i].scorer.player} ({game.goals[i].scorer.seasonTotal}) {game.goals[i].strength ? game.goals[i].strength : ""}
                </td>
                {/* Assists */}
                <td className="assists-cell">
                {
                    game.goals[i].assists[0] ? `${game.goals[i].assists[0].player} (${game.goals[i].assists[0].seasonTotal})` : ""
                } 
                {
                    game.goals[i].assists[1] ? `, ${game.goals[i].assists[1].player} (${game.goals[i].assists[1].seasonTotal})` : ""
                }
                </td>
              </tr>
            );
          }
        } else {
            console.log("no goals");
        }
      }
      // Push the live game data to the array
      liveGameData.push(
        <Accordion.Item eventKey={`${key}`} key={`${key}`}>
          <Accordion.Header>
            {/* Game Status */}
            <GameStatusDiv>
              <GameStatus>{gameStatus}</GameStatus>
            </GameStatusDiv>
            {/* Container to hold team names and scores */}
            <Container display="flex" flexDirection="row">
              {/* Away Team Name */}
              <TeamName className="full-title">{awayTeamName}</TeamName>
              <TeamName className="abbreviated-title">
                {awayTeamAbbreviation}
              </TeamName>
              {/* Away Team Logo */}
              <TeamLogoDiv>
                <SVG src={awayTeamLogoURL} className="team-logo" />
              </TeamLogoDiv>
              {/* Away Team Score : Home Team Score */}
              <Score>{awayTeamScore}</Score> : <Score>{homeTeamScore}</Score>
              {/* Home Team Logo */}
              <TeamLogoDiv>
                <SVG src={homeTeamLogoURL} className="team-logo" />
              </TeamLogoDiv>
              {/* Home Team Name */}
              <TeamName className="full-title">{homeTeamName}</TeamName>
              <TeamName className="abbreviated-title">
                {homeTeamAbbreviation}
              </TeamName>
            </Container>
          </Accordion.Header>
          <Accordion.Body>
            <Table
              striped
              bordered
              hover
              responsive
            >
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Team</th>
                  <th>Time</th>
                  <th>Goal</th>
                  <th>Assists</th>
                </tr>
              </thead>
              <tbody>{goals ? goals : null}</tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  return (
    <Container
      className="scoreboard-container"
      backgroundColor="var(--EerieBlack)"
      overflow="hidden"
      borderRadius="1rem"
      margin="2rem auto"
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
  margin-top: 1rem;
  text-align: center;
  color: white;
`;

const GameStatusDiv = styled.div`
  height: 2.5rem;
  min-width: 6rem;
  font-weight: bold;
  ${'' /* border: 1px solid blue; */}
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 400px) {
    margin-bottom: 0.5rem;
    border: none;
    text-align: center;
  }
`;

const GameStatus = styled.span`
  font-size: 0.9rem;
`;

const TeamLogoDiv = styled.div`
  height: 2rem;
  min-width: 3rem;
  ${"" /* border: 1px solid blue; */}
`;

const TeamName = styled.span`
  font-size: 1.1rem;
  margin: 0 0.5rem;
`;

const Score = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0.5rem;
`;

export default LiveGamesTable;
