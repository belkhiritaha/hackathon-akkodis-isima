import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import NavBar from '../UI/Navbar';
import Footer from '../UI/Footer';

const MyInfo = () => {
    const [address, setAddress] = useState('');
    const [vehicle, setVehicle] = useState([]);
    const [sports, setSports] = useState("Not at all");

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
                {/* center profile picture */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="profile-img text-center mt-5">
                            <img src="/images/profile.png" alt="user" className="user-image" style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "30px" }} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                            <h3 className='text-center'>Taha RatéLeBus</h3>
                    </div>
                </div>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAddress">
                        <Form.Label className='text-muted'>Home Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="2 bis Rue Saint-Vincent de Paul, 63000 Clermont-Ferrand (la planQ)"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                        <Form.Label className='text-muted'>Work Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="9 All. Alan Turing, 63170 Aubière"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                        <Form.Label className='text-muted'>Soccer Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="46 Rue des Varennes, 63170 Aubière"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </Form.Group>

                    <div className='row'>
                        <div className='col-md-12'>
                            <span className='text-center text-muted'>Add more addresses</span>
                            <button className='btn btn-primary btn-block' style={{width: "10%"}}>+</button>
                        </div>
                    </div>

                    <hr />
                    <Form.Group controlId="formVehicle">
                        <Form.Label className='text-muted'>Vehicle</Form.Label>
                        <Form.Check
                            type="checkbox"
                            label="Car"
                            value="car"
                            onChange={handleVehicleChange}
                            checked={true}
                            />
                        <Form.Check
                            type="checkbox"
                            label="Bike"
                            value="bike"
                            onChange={handleVehicleChange}
                            checked={true}
                            />
                        <Form.Check
                            type="checkbox"
                            label="Scooter"
                            value="scooter"
                            onChange={handleVehicleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formSports">
                        <Form.Label className='text-muted' style={{ width: "100%" }}>Do you mind walking?</Form.Label>
                        <Form.Control
                            as="select"
                            value={sports}
                            onChange={handleSportsChange}
                        >
                            <option value="not at all">Not at all</option>
                            <option value="i prefer not to">I prefer not to</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginBottom: "100px" }}>
                        Submit
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
};

export default MyInfo;
