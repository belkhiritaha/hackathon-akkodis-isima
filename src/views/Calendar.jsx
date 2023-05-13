import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Form, Button, Container, Col, Row } from 'react-bootstrap';

import NavBar from '../UI/Navbar';
import Footer from '../UI/Footer';


function WeekList() {
    return (
        <ul className="list-group">
            <WeekDay day="Monday" activities={[{ name: 'Work', time: '10:00' }, { name: 'Work', time: '10:00' }, { name: 'Work', time: '10:00' }]} />
            <WeekDay day="Tuesday" activities={[{ name: 'Work', time: '10:00' }]} />
            <WeekDay day="Wednesday" activities={[{ name: 'Work', time: '10:00' }, { name: 'Work', time: '10:00' }]} />
            <WeekDay day="Thursday" activities={[{ name: 'Work', time: '10:00' }, { name: 'Work', time: '10:00' }]} />
            <WeekDay day="Friday" activities={[{ name: 'Work', time: '10:00' }, { name: 'Work', time: '10:00' }, { name: 'Work', time: '10:00' }]} />
        </ul>
    );
}

function WeekDay({ day, activities }) {
    return (
        <li className="list-group-item">
            <span className="text-muted">{day}</span>
            <ul className="list-group activity-list">
                {activities.map(activity => (
                    <li className="list-group-item">
                        <Row>
                            <Col xs={6} md={6}>
                                <span className="activity">{activity.name}</span>
                            </Col>
                            <Col xs={6} md={6} className='d-flex'>
                                {/* span align vertical */}
                                <span className="badge align-items-right ms-auto" style={{backgroundColor:"rgb(123,145,86,1)"}}>{activity.time}</span>
                                <button class="calendarbtn" size="sm">X</button>
                            </Col>
                        </Row>
                    </li>
                ))}
            </ul>
        </li>
    );
}







function MyCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    function handleDateChange(date) {
        setSelectedDate(date);
    }
    const calendarStyle = {
        backgroundColor: 'green',
      };
    return (
        <>
            <NavBar />
            <Container fluid>
                <Calendar value={selectedDate} onChange={handleDateChange}/>
                <h3 className="text-center mt-3">My week: </h3>
                <WeekList />
            </Container>
            <Footer />
        </>
    );
}

export default MyCalendar;