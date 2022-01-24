import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Table } from "react-bootstrap";

function Top10ShortHandedGoals() {
  const [top10ShortHandedGoals, settop10ShortHandedGoals] = useState([]);

  const url = "http://localhost:5000/api/items/players/top10shorthandedgoals";

  useEffect(async () => {
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        settop10ShortHandedGoals(data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [url]);

  const tdStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  }

  const headshotDivStyle = {
    width: "5rem",
    height: "5rem",
    borderRadius: "1rem",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    margin: "0 1rem"
  };

  const headshotImage = {
      maxWidth: "100%",
  }

  let content = [];
  const getContent = async () => {
    top10ShortHandedGoals.forEach((player) => {
      content.push(
        <tr key={player._id}>
          <td style={tdStyle}>
            {/* Player Headshot and Name */}
            <div style={headshotDivStyle}>
              <img
                src={`${player.playerHeadshot}`}
                alt={`${player.playerInfo[0].fullName} headshot`}
                style={headshotImage}
              />
            </div>
            {/* Player Name */}
            <span>{player.playerInfo[0].fullName}</span>
          </td>
          {/* Player Points */}
          <td>{player.playerStats.stat.shortHandedGoals}</td>
        </tr>
      )
    })
  };
  getContent();

  return (
    <Accordion.Item eventKey="10">
      <Accordion.Header>Top 10 Short-Handed Goals</Accordion.Header>
      <Accordion.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Short-Handed Goals</th>
            </tr>
          </thead>
          <tbody>{content ? content : null}</tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Top10ShortHandedGoals;
