import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useEffect, useState } from "react";

function NavBar() {
    const [coins, setCoins] = useState(100);

    useEffect(() => {
        let cookie = document.cookie;
        let coins = cookie.split(";").find((item) => item.includes("coins"));
        if (coins) {
            let coinsValue = coins.split("=")[1];
            setCoins(coinsValue);
        }
    }, []);

  return (
    <Navbar  fixed="top" style={{backgroundColor:"rgb(123,145,86,1)", borderRadius: "7px"}} expand="lg" variant="dark">
      <Container >
        <Navbar.Brand href="#home" style={{ color: "white" }}>NOM DE L'APP</Navbar.Brand>
        { // coins counter to the right 
        }
        <span style={{ color: "white", fontSize: "20px" }}> {coins} 🍃</span>
      </Container>
    </Navbar>
  );
}

export default NavBar;