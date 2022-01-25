import React, { useState } from "react";
import styled from "styled-components";
import { HiArrowRight } from "react-icons/hi";
import { GoThreeBars } from "react-icons/go";
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State to control hamburger menu
  const [isOpen, setisOpen] = useState(false);

  // Style to spin arrow 180deg
  const arrowStyle = {
    transform: isOpen ? 'rotate(180deg)' : '', 
    transition: 'transform 0.5s ease', // smooth transition
   }
   // Style to hamburger spin 180deg
  const hamburgerStyle = {
    transform: isOpen ? 'rotate(360deg)' : '', 
    transition: 'transform 0.9s ease', // smooth transition
   }

   console.log("window.innerWidth: ", window.innerWidth);

  return (
    <Nav isOpen={isOpen} style={{}}>
      <LogoDiv onClick={() => setisOpen(!isOpen)}>
          <HiArrowRight style={arrowStyle}/>
      </LogoDiv>
      <HamburgerDiv onClick={() => setisOpen(!isOpen)}>
          <GoThreeBars style={hamburgerStyle}/>
      </HamburgerDiv>
      <Menu isOpen={isOpen}>
        <MenuItem to="/">Live Scores</MenuItem>
        <MenuItem to="rosters">Rosters</MenuItem>
        <MenuItem to="standings">Standings</MenuItem>
        <MenuItem to="statscentre">Stats Centre</MenuItem>
      </Menu>
    </Nav>
  );
};

// Nav
const Nav = styled.div`
  text-align: center;
  background-color: ${({ isOpen }) => (isOpen ? "var(--EerieBlack)" : "rgba(20, 20, 20, 0.7)")};
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ isOpen }) => (isOpen ? "9rem" : "4rem")};
  transition: ${({ isOpen }) => (isOpen ? "width 0.5s" : "width 0.5s")};
  border-right: ${({ isOpen }) => (isOpen ? "1px solid var(--RedCrayola)" : "1px solid white")};

  
  @media (min-width: 501px) {
    min-height: 270vh;
    height: 100% !important;
  }
  @media (max-width: 500px) {
    ${'' /* padding-right: 3rem !important; */}
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? "20rem" : "5rem")};
    transition: ${({ isOpen }) => (isOpen ? "height 0.5s" : "height 0.5s")};
    border-bottom: ${({ isOpen }) => (isOpen ? "1px solid var(--RedCrayola)" : "1px solid white")};
    margin-bottom: 1rem;
    background-color: rgba(20, 20, 20, 0.7);
  }
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; 
  width: 100%;
  height: 5rem;
  position: sticky;
  text-align: center;
  color: white;
  font-size: 3rem;
  cursor: pointer;

  &:hover {
    color: var(--RedCrayola);
    transition: all 0.3s ease-in;
  }

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const HamburgerDiv = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; 
  width: 100%;
  height: 5rem;
  position: sticky;
  text-align: center;
  color: white;
  font-size: 3rem;
  cursor: pointer;

  &:hover {
    color: var(--RedCrayola);
    transition: all 0.3s ease-in;
  }

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }

  @media (max-width: 500px) {
    display: flex;
  }
`;

// Menu
const Menu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: space-around;
  align-items: center;
  position: relative;
  flex-direction: column;
  height: 32%;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    ${"" /* Will center menu in middle underneath Logo */}
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
  @media (max-width: 500px) {
    overflow: visible;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: all 0.3s ease-in;
    margin-top: 3rem;
    height: 37%;
  }
`;

// Menu Item
const MenuItem = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 1rem 0;
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  text-align: center;
  ${'' /* border: 1px solid red; */}
  display: block;
  position: relative;

  &:hover {
    ${'' /* color: var(--MiddleBlueGreen); */}
    color: white;
    transition: all 0.3s ease-in;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: var(--RedCrayola);
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
  }
`;

export default Navbar;
