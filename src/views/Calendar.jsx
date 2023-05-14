import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Form, Button, Container, Col, Row } from 'react-bootstrap';

// import loader
import Spinner from 'react-bootstrap/Spinner';

import NavBar from '../UI/Navbar';
import Footer from '../UI/Footer';
import { createPath } from 'react-router-dom';


function WeekList() {
    return (
        <ul className="list-group">
            <WeekDay day="Monday" activities={[{ name: 'Work', time: '8h - 12h', weather: "sunny", transport: "car" }]} />
            <WeekDay day="Tuesday" activities={[{ name: 'Soccer', time: '8h - 12h', weather: "rainy", transport: "car" }]} />
            <WeekDay day="Saturday" activities={[{ name: 'Work', time: '8h - 12h', weather: "sunny", transport: "car" }, { name: 'Soccer', time: '13h - 17h', weather: "rainy", transport: "car" }]} />
        </ul>
    );
}

function OptimizedWeekList() {
    return (
        <ul className="list-group">
            <WeekDay day="Monday" activities={[{ name: 'Work', time: '8h - 12h', weather: "sunny", transport: "walk" }]} />
            <WeekDay day="Tuesday" activities={[{ name: 'Soccer', time: '8h - 12h', weather: "rainy", transport: "walk" }]} />
            <WeekDay day="Friday" activities={[{ name: 'Soccer', time: '8h - 12h', weather: "rainy", transport: "car" }]} />
            <WeekDay day="Saturday" activities={[{ name: 'Work', time: '8h - 12h', weather: "sunny", transport: "bike" }]}/>
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
                            <Col xs={4} md={4}>
                                <span className="activity">{activity.name}</span>
                            </Col>
                            <Col xs={8} md={8} className='d-flex'>
                                {/* span align vertical */}
                                <div className="d-flex align-items-center">

                                    {
                                        activity.weather === "sunny" ?
                                            <img src="/images/sunny.png" alt="sunny" className="weather-icon" style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                                            :
                                            <img src="/images/rainy.png" alt="rainy" className="weather-icon" style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                                    }
                                    {
                                            <img src={`/images/${activity.transport}.png`} alt="transportation" className="transport-icon" style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                                    }
                                    <span className="badge align-items-right ms-auto" style={{backgroundColor:"rgb(123,145,86,1)", marginLeft: "10px"}}>
                                        {activity.time}
                                    </span>
                                    <button class="calendarbtn" size="sm" style={{ width: "30px", height: "30px", marginLeft: "10px" }}>+</button>
                                </div>
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
    const [isLoading, setisLoading] = useState(false);
    const [optimised, setOptimised] = useState(false);

    useEffect(() => {
        // check if cookie exists
        if (document.cookie) {
            const optimisedCookie = document.cookie.split('; ').find(row => row.startsWith('optimised'));
            if (optimisedCookie) {
                setOptimised(true);
            }
        }
    }, []);

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    function handleOptimise() {
        // set loaded true for 1 second
        setisLoading(true);
        setTimeout(() => {
            setisLoading(false);
            setOptimised(true);
            // set cookies
            const coinsCookie = document.cookie.split('; ').find(row => row.startsWith('coins'));
            if (coinsCookie) {
                const coins = parseInt(coinsCookie.split('=')[1]);
                document.cookie = `coins=${coins + 10};max-age=3600`;
                console.log(document.cookie);
                // add optimised cookie
                const optimisedCookie = "optimised=true;max-age=3600";
                document.cookie = optimisedCookie + ";" + document.cookie;
                console.log(document.cookie);
            } else {
                document.cookie = "coins=10;max-age=3600";
            }
        }, 2000);
    }

    const calendarStyle = {
        backgroundColor: 'green',
    };
    
    if (isLoading) {
        return (
            <>
                <NavBar />
                <Container fluid className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" style={{marginTop: "100%"}}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>

                <Footer />
            </>
        );
    }

    if (optimised) {
        return (
            <>
                <NavBar />
                <Container fluid style={{marginTop: "20%", marginBottom: "20%"}}>
                    <Calendar value={selectedDate} onChange={handleDateChange}/>
                    <h3 className="text-center mt-3">My week: </h3>
                    <OptimizedWeekList />

                    <div className="d-flex justify-content-center">
                        <div className="border border-success rounded p-3 mt-3" style={{width: "50%"}}>
                            <span className="text-success">You're only emitting 7 grams of CO2 this week!</span>
                        </div>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }
          


    return (
        <>
            <NavBar />
            <Container fluid>
                <Calendar value={selectedDate} onChange={handleDateChange}/>
                <h3 className="text-center mt-3">My week: </h3>
                <WeekList />

                <div className="d-flex justify-content-center">
                    <div className="border border-danger rounded p-3 mt-3" style={{width: "50%"}}>
                        <span className="text-danger">You're emitting 12 grams of CO2 this week!</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Button className="mt-3" variant="primary" type="submit" style={{width: "50%", marginBottom: "25%"}} onClick={handleOptimise}>
                        Optimise my CO2 emissions
                    </Button>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default MyCalendar;