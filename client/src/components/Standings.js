import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../UX/Container";
import { Table, Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";

function Standings() {
  let url = "https://statsapi.web.nhl.com/api/v1/standings";

  const [standings, setStandings] = useState(null);
  useEffect(() => {
    axios.get(url)
    .then((response) => {
      setStandings(response.data.records);
    });
  }, []);

  return (
    <Container
      className="standings-container"
      width="50%"
      borderRadius="1rem"
      margin="1rem 0"
      backgroundColor="var(--EerieBlack)"
      padding= "1rem"
    >
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 tab-list"
      >
        {/* Western Conference */}
        <Tab eventKey="west" title="Western Conference" className="conference-tab">
          {/* Central Division */}
          <DivisionTitle className="division-table">
            Central Division
          </DivisionTitle>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>OTL</th>
                <th>Pts</th>
                <th>GF</th>
                <th>GA</th>
                <th>Diff</th>
                <th>Strk</th>
                <th>W%</th>
                <th>Home Rank (Div)</th>
                <th>Away Rank (Div)</th>
                <th>L10 Rank (Div)</th>
                <th>PP Rank (Div)</th>
                <th>Conf. Rank</th>
                <th>Home Rank (Conf)</th>
                <th>Away Rank (Conf)</th>
                <th>L10 Rank (Conf)</th>
                <th>PP Rank (Conf)</th>
                <th>League Rank</th>
                <th>Home Rank (League)</th>
                <th>Away Rank (League)</th>
                <th>L10 Rank (League)</th>
                <th>PP Rank (League)</th>
                <th>Reg. Wins</th>
              </tr>
            </thead>
            <tbody>
              {standings
                ? standings[2].teamRecords.map((team) => {
                    return (
                      <tr key={team.team.id}>
                        {/* Team */}
                        <td>{team.team.name}</td>
                        {/* Games Played */}
                        <td>{team.gamesPlayed}</td>
                        {/* Wins */}
                        <td>{team.leagueRecord.wins}</td>
                        {/* Losses */}
                        <td>{team.leagueRecord.losses}</td>
                        {/* Overtime Losses */}
                        <td>{team.leagueRecord.ot}</td>
                        {/* Points */}
                        <td>{team.points}</td>
                        {/* Goals For */}
                        <td>{team.goalsScored}</td>
                        {/* Goals Against */}
                        <td>{team.goalsAgainst}</td>
                        {/* Goal Differential */}
                        <td>{team.goalsScored - team.goalsAgainst}</td>
                        {/* Current Streak */}
                        <td>{team.streak.streakCode}</td>
                        {/* Win Percentage */}
                        <td>{`${parseFloat(
                          (team.leagueRecord.wins / team.gamesPlayed) * 100
                        ).toFixed(1)}%`}</td>
                        {/* Home Rank Division */}
                        <td>{team.divisionHomeRank}</td>
                        {/* Away Rank Division */}
                        <td>{team.divisionRoadRank}</td>
                        {/* Last 10 Rank Division  */}
                        <td>{team.divisionL10Rank}</td>
                        {/* Powerplay Rank Division */}
                        <td>{team.ppDivisionRank}</td>
                        {/* Conference Rank */}
                        <td>{team.conferenceRank}</td>
                        {/* Home Rank Conference */}
                        <td>{team.conferenceHomeRank}</td>
                        {/* Away Rank Conference */}
                        <td>{team.conferenceRoadRank}</td>
                        {/* Last 10 Rank Conference */}
                        <td>{team.conferenceL10Rank}</td>
                        {/* Powerplay Rank Conference */}
                        <td>{team.ppConferenceRank}</td>
                        {/* League Rank */}
                        <td>{team.leagueRank}</td>
                        {/* Home Rank League */}
                        <td>{team.leagueHomeRank}</td>
                        {/* Away Rank League */}
                        <td>{team.leagueRoadRank}</td>
                        {/* Last 10 Rank League */}
                        <td>{team.leagueL10Rank}</td>
                        {/* Powerplay Rank League */}
                        <td>{team.ppLeagueRank}</td>
                        {/* Regulation Wins */}
                        <td>{team.regulationWins}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>

          {/* Pacific Division */}
          <DivisionTitle className="division-table">
            Pacific Division
          </DivisionTitle>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>OTL</th>
                <th>Pts</th>
                <th>GF</th>
                <th>GA</th>
                <th>Diff</th>
                <th>Strk</th>
                <th>W%</th>
                <th>Home Rank (Div)</th>
                <th>Away Rank (Div)</th>
                <th>L10 Rank (Div)</th>
                <th>PP Rank (Div)</th>
                <th>Conf. Rank</th>
                <th>Home Rank (Conf)</th>
                <th>Away Rank (Conf)</th>
                <th>L10 Rank (Conf)</th>
                <th>PP Rank (Conf)</th>
                <th>League Rank</th>
                <th>Home Rank (League)</th>
                <th>Away Rank (League)</th>
                <th>L10 Rank (League)</th>
                <th>PP Rank (League)</th>
                <th>Reg. Wins</th>
              </tr>
            </thead>
            <tbody>
              {standings
                ? standings[3].teamRecords.map((team) => {
                    return (
                      <tr key={team.team.id}>
                        {/* Team */}
                        <td>{team.team.name}</td>
                        {/* Games Played */}
                        <td>{team.gamesPlayed}</td>
                        {/* Wins */}
                        <td>{team.leagueRecord.wins}</td>
                        {/* Losses */}
                        <td>{team.leagueRecord.losses}</td>
                        {/* Overtime Losses */}
                        <td>{team.leagueRecord.ot}</td>
                        {/* Points */}
                        <td>{team.points}</td>
                        {/* Goals For */}
                        <td>{team.goalsScored}</td>
                        {/* Goals Against */}
                        <td>{team.goalsAgainst}</td>
                        {/* Goal Differential */}
                        <td>{team.goalsScored - team.goalsAgainst}</td>
                        {/* Current Streak */}
                        <td>{team.streak.streakCode}</td>
                        {/* Win Percentage */}
                        <td>{`${parseFloat(
                          (team.leagueRecord.wins / team.gamesPlayed) * 100
                        ).toFixed(1)}%`}</td>
                        {/* Home Rank Division */}
                        <td>{team.divisionHomeRank}</td>
                        {/* Away Rank Division */}
                        <td>{team.divisionRoadRank}</td>
                        {/* Last 10 Rank Division  */}
                        <td>{team.divisionL10Rank}</td>
                        {/* Powerplay Rank Division */}
                        <td>{team.ppDivisionRank}</td>
                        {/* Conference Rank */}
                        <td>{team.conferenceRank}</td>
                        {/* Home Rank Conference */}
                        <td>{team.conferenceHomeRank}</td>
                        {/* Away Rank Conference */}
                        <td>{team.conferenceRoadRank}</td>
                        {/* Last 10 Rank Conference */}
                        <td>{team.conferenceL10Rank}</td>
                        {/* Powerplay Rank Conference */}
                        <td>{team.ppConferenceRank}</td>
                        {/* League Rank */}
                        <td>{team.leagueRank}</td>
                        {/* Home Rank League */}
                        <td>{team.leagueHomeRank}</td>
                        {/* Away Rank League */}
                        <td>{team.leagueRoadRank}</td>
                        {/* Last 10 Rank League */}
                        <td>{team.leagueL10Rank}</td>
                        {/* Powerplay Rank League */}
                        <td>{team.ppLeagueRank}</td>
                        {/* Regulation Wins */}
                        <td>{team.regulationWins}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Tab>

        {/* Eastern Conference */}
        <Tab eventKey="easter" title="Eastern Conference">
          {/* Central Division */}
          <DivisionTitle className="division-table">
            Atlantic Division
          </DivisionTitle>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>OTL</th>
                <th>Pts</th>
                <th>GF</th>
                <th>GA</th>
                <th>Diff</th>
                <th>Strk</th>
                <th>W%</th>
                <th>Home Rank (Div)</th>
                <th>Away Rank (Div)</th>
                <th>L10 Rank (Div)</th>
                <th>PP Rank (Div)</th>
                <th>Conf. Rank</th>
                <th>Home Rank (Conf)</th>
                <th>Away Rank (Conf)</th>
                <th>L10 Rank (Conf)</th>
                <th>PP Rank (Conf)</th>
                <th>League Rank</th>
                <th>Home Rank (League)</th>
                <th>Away Rank (League)</th>
                <th>L10 Rank (League)</th>
                <th>PP Rank (League)</th>
                <th>Reg. Wins</th>
              </tr>
            </thead>
            <tbody>
              {standings
                ? standings[1].teamRecords.map((team) => {
                    return (
                      <tr key={team.team.id}>
                        {/* Team */}
                        <td>{team.team.name}</td>
                        {/* Games Played */}
                        <td>{team.gamesPlayed}</td>
                        {/* Wins */}
                        <td>{team.leagueRecord.wins}</td>
                        {/* Losses */}
                        <td>{team.leagueRecord.losses}</td>
                        {/* Overtime Losses */}
                        <td>{team.leagueRecord.ot}</td>
                        {/* Points */}
                        <td>{team.points}</td>
                        {/* Goals For */}
                        <td>{team.goalsScored}</td>
                        {/* Goals Against */}
                        <td>{team.goalsAgainst}</td>
                        {/* Goal Differential */}
                        <td>{team.goalsScored - team.goalsAgainst}</td>
                        {/* Current Streak */}
                        <td>{team.streak.streakCode}</td>
                        {/* Win Percentage */}
                        <td>{`${parseFloat(
                          (team.leagueRecord.wins / team.gamesPlayed) * 100
                        ).toFixed(1)}%`}</td>
                        {/* Home Rank Division */}
                        <td>{team.divisionHomeRank}</td>
                        {/* Away Rank Division */}
                        <td>{team.divisionRoadRank}</td>
                        {/* Last 10 Rank Division  */}
                        <td>{team.divisionL10Rank}</td>
                        {/* Powerplay Rank Division */}
                        <td>{team.ppDivisionRank}</td>
                        {/* Conference Rank */}
                        <td>{team.conferenceRank}</td>
                        {/* Home Rank Conference */}
                        <td>{team.conferenceHomeRank}</td>
                        {/* Away Rank Conference */}
                        <td>{team.conferenceRoadRank}</td>
                        {/* Last 10 Rank Conference */}
                        <td>{team.conferenceL10Rank}</td>
                        {/* Powerplay Rank Conference */}
                        <td>{team.ppConferenceRank}</td>
                        {/* League Rank */}
                        <td>{team.leagueRank}</td>
                        {/* Home Rank League */}
                        <td>{team.leagueHomeRank}</td>
                        {/* Away Rank League */}
                        <td>{team.leagueRoadRank}</td>
                        {/* Last 10 Rank League */}
                        <td>{team.leagueL10Rank}</td>
                        {/* Powerplay Rank League */}
                        <td>{team.ppLeagueRank}</td>
                        {/* Regulation Wins */}
                        <td>{team.regulationWins}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>

          {/* Metropolitan Division */}
          <DivisionTitle className="division-table">
            Metropolitan Division
          </DivisionTitle>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>OTL</th>
                <th>Pts</th>
                <th>GF</th>
                <th>GA</th>
                <th>Diff</th>
                <th>Strk</th>
                <th>W%</th>
                <th>Home Rank (Div)</th>
                <th>Away Rank (Div)</th>
                <th>L10 Rank (Div)</th>
                <th>PP Rank (Div)</th>
                <th>Conf. Rank</th>
                <th>Home Rank (Conf)</th>
                <th>Away Rank (Conf)</th>
                <th>L10 Rank (Conf)</th>
                <th>PP Rank (Conf)</th>
                <th>League Rank</th>
                <th>Home Rank (League)</th>
                <th>Away Rank (League)</th>
                <th>L10 Rank (League)</th>
                <th>PP Rank (League)</th>
                <th>Reg. Wins</th>
              </tr>
            </thead>
            <tbody>
              {standings
                ? standings[0].teamRecords.map((team) => {
                    return (
                      <tr key={team.team.id}>
                        {/* Team */}
                        <td>{team.team.name}</td>
                        {/* Games Played */}
                        <td>{team.gamesPlayed}</td>
                        {/* Wins */}
                        <td>{team.leagueRecord.wins}</td>
                        {/* Losses */}
                        <td>{team.leagueRecord.losses}</td>
                        {/* Overtime Losses */}
                        <td>{team.leagueRecord.ot}</td>
                        {/* Points */}
                        <td>{team.points}</td>
                        {/* Goals For */}
                        <td>{team.goalsScored}</td>
                        {/* Goals Against */}
                        <td>{team.goalsAgainst}</td>
                        {/* Goal Differential */}
                        <td>{team.goalsScored - team.goalsAgainst}</td>
                        {/* Current Streak */}
                        <td>{team.streak.streakCode}</td>
                        {/* Win Percentage */}
                        <td>{`${parseFloat(
                          (team.leagueRecord.wins / team.gamesPlayed) * 100
                        ).toFixed(1)}%`}</td>
                        {/* Home Rank Division */}
                        <td>{team.divisionHomeRank}</td>
                        {/* Away Rank Division */}
                        <td>{team.divisionRoadRank}</td>
                        {/* Last 10 Rank Division  */}
                        <td>{team.divisionL10Rank}</td>
                        {/* Powerplay Rank Division */}
                        <td>{team.ppDivisionRank}</td>
                        {/* Conference Rank */}
                        <td>{team.conferenceRank}</td>
                        {/* Home Rank Conference */}
                        <td>{team.conferenceHomeRank}</td>
                        {/* Away Rank Conference */}
                        <td>{team.conferenceRoadRank}</td>
                        {/* Last 10 Rank Conference */}
                        <td>{team.conferenceL10Rank}</td>
                        {/* Powerplay Rank Conference */}
                        <td>{team.ppConferenceRank}</td>
                        {/* League Rank */}
                        <td>{team.leagueRank}</td>
                        {/* Home Rank League */}
                        <td>{team.leagueHomeRank}</td>
                        {/* Away Rank League */}
                        <td>{team.leagueRoadRank}</td>
                        {/* Last 10 Rank League */}
                        <td>{team.leagueL10Rank}</td>
                        {/* Powerplay Rank League */}
                        <td>{team.ppLeagueRank}</td>
                        {/* Regulation Wins */}
                        <td>{team.regulationWins}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
}

const DivisionTitle = styled.h2`
  color: white;
  text-align: center;
`;

export default Standings;
