import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Container from "../../UX/Container";
import { Accordion, Table } from "react-bootstrap";
import Top10Points from "./Top10Points";
import Top10Goals from "./Top10Goals";
import Top10Assists from "./Top10Assists"
import Top10PlusMinus from "./Top10PlusMinus"
import Top10PenaltyMinutes from "./Top10PenaltyMinutes"
import Top10Hits from "./Top10Hits"
import Top10TotalTimeOnIce from "./Top10TotalTimeOnIce";
import Top10TimeOnIceShortHanded from "./Top10TimeOnIceSH";
import Top10TimeOnIcePowerplay from "./Top10TimeOnIcePP";
import Top10PowerplayGoals from "./Top10PowerplayGoals";
import Top10ShortHandedGoals from "./Top10ShorthandedGoals";
import Top10PowerplayPoints from "./Top10PowerplayPoints";
import Top10ShortHandedPoints from "./Top10ShortHandedPoints";
import Top10Wins from "./Top10Wins";
import Top10FaceOffPercentage from "./Top10FaceOffPerc";
import Top10SavePercentage from "./Top10SavePerc";
import Top10GoalsAgainst from "./Top10GoalsAgainst";

function TopTenStats() {
  
  return (
    <Container
      width="50%"
      height="50rem"
      backgroundColor="var(--EerieBlack)"
      color="white"
      margin="2rem 0"
      borderRadius="1rem"
      className="top-ten-stats-container"
    >
      <h1 style={{textAlign: 'center', padding: '0.5rem'}}>Top 10 Stats</h1>
      <Accordion defaultActiveKey="0" className="top-ten-stats-accordion">
        <Top10Points eventKey="0"/>
        <Top10Goals eventKey="1"/>
        <Top10Assists eventKey="2"/>
        <Top10PlusMinus eventKey="3"/>
        <Top10PenaltyMinutes eventKey="4"/>
        <Top10Hits eventKey="5"/>
        <Top10TotalTimeOnIce eventKey="6"/>
        <Top10TimeOnIceShortHanded eventKey="7"/>
        <Top10TimeOnIcePowerplay eventKey="8"/>
        <Top10PowerplayGoals eventKey="9"/>
        <Top10ShortHandedGoals eventKey="10"/>
        <Top10PowerplayPoints eventKey="11"/>
        <Top10ShortHandedPoints eventKey="12"/>
        <Top10FaceOffPercentage eventKey="13"/>
        <Top10SavePercentage eventKey="14"/>
        <Top10Wins eventKey="15"/>
        <Top10GoalsAgainst eventKey="16"/>
      </Accordion>
    </Container>
  );
}

export default TopTenStats;
