import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import NavBar from '../UI/Navbar';
import Footer from '../UI/Footer';

const MyInfo = () => {
    const [address, setAddress] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [sports, setSports] = useState('');

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleVehicleChange = (event) => {
        setVehicle(event.target.value);
    };

    const handleSportsChange = (event) => {
        setSports(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Address: ${address}, Vehicle: ${vehicle}, Sports: ${sports}`);
        // Here you can submit the data to a server or store it in the local state
    };

    return (
        <>
            <NavBar />
            <Container fluid>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formVehicle">
                        <Form.Label>Vehicle</Form.Label>
                        <Form.Control
                            as="select"
                            value={vehicle}
                            onChange={handleVehicleChange}
                        >
                            <option value="">Select a vehicle</option>
                            <option value="car">Car</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="bicycle">Bicycle</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formSports">
                        <Form.Label>How much are you into sports?</Form.Label>
                        <Form.Control
                            as="select"
                            value={sports}
                            onChange={handleSportsChange}
                        >
                            <option value="">Select an option</option>
                            <option value="not much">Not much</option>
                            <option value="moderately">Moderately</option>
                            <option value="a lot">A lot</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
};

export default MyInfo;
