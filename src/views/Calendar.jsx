import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Form, Button, Container, Col, Row } from 'react-bootstrap';

import NavBar from '../UI/Navbar';
import Footer from '../UI/Footer';

function MyCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    return (
        <>
            <NavBar />
            <Container fluid>
                <Calendar value={selectedDate} onChange={handleDateChange} />
                <h3 className="text-center mt-3">My week: </h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="text-muted">Monday</span>
                        <ul className="list-group activity-list">
                            <li className="list-group-item">
                                <Row>
                                    <Col xs={6} md={6}>
                                        <span className="activity">Work</span>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <span className="badge bg-primary align-right">10:00</span>
                                    </Col>
                                </Row>
                            </li>
                            <li className="list-group-item">
                                <Row>
                                    <Col xs={6} md={6}>
                                        <span className="activity">Work</span>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <span className="badge bg-primary align-right">10:00</span>
                                    </Col>
                                </Row>
                            </li>
                            <li className="list-group-item">
                                <Row>
                                    <Col xs={6} md={6}>
                                        <span className="activity">Work</span>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <span className="badge bg-primary align-right">10:00</span>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </li>
                    <li className="list-group-item">Tuesday</li>
                    <li className="list-group-item">Wednesday</li>
                    <li className="list-group-item">Thursday</li>
                    <li className="list-group-item">Friday</li>
                    <li className="list-group-item">Saturday</li>
                    <li className="list-group-item">Sunday</li>
                </ul>
            </Container>
            <Footer />
        </>
    );
}

export default MyCalendar;