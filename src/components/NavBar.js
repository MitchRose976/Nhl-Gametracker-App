import React, { useState } from "react";
import styled from "styled-components";
import { HiArrowRight } from "react-icons/hi";

const Navbar = () => {
  // State to control hamburger menu
  const [isOpen, setisOpen] = useState(false);

  // Style to spin arrow 180deg
  const style = {
    transform: isOpen ? 'rotate(180deg)' : '', 
    transition: 'transform 0.5s ease', // smooth transition
   }

  return (
    <Nav isOpen={isOpen}>
      <LogoDiv onClick={() => setisOpen(!isOpen)}>
          <HiArrowRight style={style}/>
      </LogoDiv>
      <Menu isOpen={isOpen}>
        <MenuItem href="#about">Live Scores</MenuItem>
        <MenuItem href="#projects">Stats</MenuItem>
        <MenuItem href="#contact">Standings</MenuItem>
      </Menu>
    </Nav>
  );
};

// Nav
const Nav = styled.div`
  text-align: center;
  background-color: transparent;
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ isOpen }) => (isOpen ? "9rem" : "4rem")};
  transition: ${({ isOpen }) => (isOpen ? "width 0.5s" : "width 0.5s")};
  height: 200vh;
  border-right: ${({ isOpen }) => (isOpen ? "1px solid var(--RedCrayola)" : "1px solid white")};
  background-color: var(--EerieBlack);
  
  @media (max-width: 768px) {
    ${'' /* padding-right: 3rem !important; */}
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

  @media (max-width: 280px) {
    ${'' /* font-size: 1.2rem; */}
  }
`;

// Menu
const Menu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: space-around;
  align-items: center;
  position: relative;
  flex-direction: column;
  height: 30%;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    ${"" /* Will center menu in middle underneath Logo */}
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;

// Menu Item
const MenuItem = styled.a`
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
