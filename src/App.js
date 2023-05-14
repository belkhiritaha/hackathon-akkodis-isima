import "./styles.css";
import Map from "./Map/Map";
import { useEffect, useState } from "react";
import NavBar from "./UI/Navbar";
import Footer from "./UI/Footer";

import { Container, Row, Col, Form, Button } from "react-bootstrap";


function NextCard(props) {
    const [isOptimized, setIsOptimized] = useState(false);

    useEffect(() => {
        let cookie = document.cookie;
        console.log(cookie);
        let optimized = cookie.split(";").find((item) => item.includes("optimised"));
        if (optimized) {
            setIsOptimized(true);
        }
    }, []);

    if (isOptimized) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="card" style={{ width: "18rem", marginBottom: "100px" }}>
                            <Map coords={props.coords} display_name={props.display_name} />
                            <div className="card-body">
                                <Row>
                                    <Col>
                                        <h5 className="card-title">This Monday - Work</h5>
                                        <img src='/images/sunny.png' alt="transportation" className="transport-icon" style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                                        <img src='/images/car.png' alt="transportation" className="transport-icon" style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                                        <span className="badge badge-primary" style={{ backgroundColor: "rgb(123,145,86,1)" }}>2g 🍃 (4.5Km)</span>
                                    </Col>
                                    <Col>
                                        <p className="card-text">Leave at 7h20</p>
                                        <span className="badge badge-primary" style={{ backgroundColor: "rgb(123,145,86,1)" }}>8h - 12h</span>
                                    </Col>
                                </Row>
    
                                <Row>
                                    <div className="" style={{}}>
                                        <span className="badge badge-primary" style={{ marginTop: "10px", backgroundColor: "rgb(123,145,86,1)" }}>🌱 Your schedule is eco-friendly</span>
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="card" style={{ width: "18rem", marginBottom: "100px" }}>
                        <Map coords={props.coords} display_name={props.display_name} />
                        <div className="card-body">
                            <Row>
                                <Col>
                                    <h5 className="card-title">This Monday - Work</h5>
                                    <img src='/images/sunny.png' alt="transportation" className="transport-icon" style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                                    <img src='/images/car.png' alt="transportation" className="transport-icon" style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                                    <span className="badge bg-danger badge-primary">2g 🍃 (5.5Km)</span>
                                </Col>
                                <Col>
                                    <p className="card-text">Leave at 7h40</p>
                                    <span className="badge badge-primary" style={{ backgroundColor: "rgb(123,145,86,1)" }}>8h - 12h</span>
                                </Col>
                            </Row>

                            <Row>
                                <div className="" style={{}}>
                                    <span className="badge bg-danger badge-primary" style={{ marginTop: "10px" }}>🚨 Your schedule is not eco-friendly</span>
                                </div>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function App() {
    const [coords, setCorrds] = useState({
        latitude: 45.77547359736413,
        longitude: 3.085100043372467
    });
    const [display_name, setName] = useState("");

    const [address, setAddress] = useState({});

    function error() {
        alert('Sorry, no position available.');
    }
    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    function getCurrentCityName(position) {
        // setCorrds({
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude
        // });

        // let url = `https://nominatim.openstreetmap.org/reverse?
        // &lat=${coords.latitude}
        // &lon=${coords.longitude}`
        let url = "http://localhost:8001/api/city?lat=" + coords.latitude + "&lon=" + coords.longitude;
        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setName(data.display_name));
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            // (position) => {
            // console.log("Lon:" + position.coords.longtitude);
            // setCorrds({
            //   latitude: position.coords.latitude,
            //   longitude: position.coords.longitude
            // });     


            // },
            getCurrentCityName,
            error,
            options

        );
    }, []);


    //separete the entred string
    function update(field) {
        return (e) => {
            const value = e.currentTarget.value;
            setAddress((address) => ({ ...address, [field]: value }));
        };
    }

    function submitHandler(e) {

        e.preventDefault();
        console.log(address);

        let url = `http://localhost:8001/api/coords?street=${address.street}&city=${address.city}&state=${address.state}&country=${address.country}&postalcode=${address.postalcode}&format=json`;

        const urlEncoded = encodeURI(url);
        console.log(urlEncoded);

        fetch(url, {
            method: "POST",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then(
                (data) => {
                    setName(data[0].display_name);
                    setCorrds({
                        latitude: data[0].lat,
                        longitude: data[0].lon
                    });
                }
                // console.log(Object.keys(data[0])

                //   setCorrds(
                //   {
                //   'latitude':data[0].lat,
                //   'longitude': data[0].lon
                // });

                // setInfo({
                //   dispaly_name: data[0].dispaly_name,
                //   icon: data[0].icon
                // })
            ).catch((error) => {
                alert("Error in your input; unable to find the position");
            });;
    }

    return (
        <div className="App">
            <NavBar />
            <Container fluid style={{ borderRadius: "7px", color: "rgb(123,145,86,1)", marginTop: "100px" }}>
                {/* <h1>Enter The address</h1>
                <section className="form-container">
                    <form>
                        <label>Street:</label>
                        <input
                            value={address.street}
                            placeholder="1234 abc street"
                            onChange={update("street")}
                            id="street"
                            type="text"
                        />
                        <label>City:</label>
                        <input
                            placeholder="1234 abc street"
                            type="text"
                            value={address.city}
                            onChange={update("city")}
                            id="city"
                        />
                        <br />
                        <label>State:</label>
                        <input
                            placeholder="CA"
                            type="text"
                            value={address.state}
                            onChange={update("state")}
                            id="state"
                        />
                        <label>Zip Code:</label>
                        <input
                            placeholder="91423"
                            type="text"
                            value={address.postalcode}
                            onChange={update("postalcode")}
                            id="postalcode"
                        />
                        <br />
                        <label>Country:</label>
                        <input
                            placeholder="USA"
                            type="text"
                            value={address.country}
                            onChange={update("country")}
                            id="country"
                        />
                        <br />

                        <button class="btn">Search</button>
                    </form>
                </section> */}

                {/* centered logo */}
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                        <img src="/images/hand.png" alt="logo" style={{ width: "100px", height: "100px", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                    </Col>
                </Row>

                <h1 style={{ color: "rgb(123,145,86,1)", marginTop: "20px" }}>Hello, Taha RatéLeBus 👋</h1>

                <h3 className="text-muted">Your next scheduled departure</h3>
                <div className="container">
                    <NextCard coords={coords} display_name={display_name} />
                </div>

                <Footer />
            </Container>
        </div>
    );
}
