import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Table } from "react-bootstrap";

function Top10TimeOnIceShortHanded() {
  const [top10TimeOnIceShortHanded, settop10TimeOnIceShortHanded] = useState([]);

  const url = "https://nhl-game-tracker-app.herokuapp.com/api/items/players/top10timeoniceshorthanded";

  useEffect(async () => {
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        settop10TimeOnIceShortHanded(data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [url]);

  //console.log("Top 10 assists: ", top10PlusMinus);

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
    top10TimeOnIceShortHanded.forEach((player) => {
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
          <td>{player.playerStats.stat.shortHandedTimeOnIce}</td>
        </tr>
      )
    })
  };
  getContent();

  return (
    <Accordion.Item eventKey="7">
      <Accordion.Header>Top 10 Time On Ice Short Handed</Accordion.Header>
      <Accordion.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time On Ice Short Handed</th>
            </tr>
          </thead>
          <tbody>{content ? content : null}</tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Top10TimeOnIceShortHanded;
