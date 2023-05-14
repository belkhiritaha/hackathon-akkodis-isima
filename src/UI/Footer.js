import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar fixed="bottom" style={{backgroundColor:"rgb(123,145,86,1)"}}>
    <div class="navbar">
        <a href="/"><img src="/images/home.png" class="footerimg" alt="Home" /></a>
        <a href="/calendar"><img src="/images/calendar.png" class="footerimg" alt="Calendar" /></a>
        <a href="/partenaires"><img src="/images/hand.png" class="footerimg" alt="Partners" /></a>
        <a href="/chatbot"><img src="/images/chatbot.png" class="footerimg" alt="ChatBot" /></a>
        <a href="/info"><img src="/images/profile.png" class="footerimg" alt="Profile" /></a>
    </div>
    </Navbar>
  );
};

export default Footer;