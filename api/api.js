const express = require("express")
const app = express()

const fs = require('fs');

const mongoose = require('mongoose')
const User = require("./user.models")
const VM = require("./activities.models")

// ########### API SETUP ###########
app.listen(8001, () => {
    console.log("Server running on port 8001")
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json())
// ########### API SETUP ###########



// ########### DATABASE SETUP ###########
let db = "mongodb://127.0.0.1:27017/akkodis"

mongoose.connect('mongodb://localhost/akkodis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error(error));

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
    console.log('Database connected:', db)
})
// ########### DATABASE SETUP ###########

// create a new user
app.post("/api/users", (req, res) => {
    const user = new User({
        username: req.body.username,
        listActivities: {
            "monday": {
                "8-12": "work",
                "13-17": ""
            },
            "tuesday": {
                "8-12": "soccer",
                "13-17": ""
            },
            "wednesday": {
                "8-12": "",
                "13-17": ""
            },
            "thursday": {
                "8-12": "",
                "13-17": ""
            },
            "friday": {
                "8-12": "",
                "13-17": ""
            },
            "saturday": {
                "8-12": "work",
                "13-17": "soccer"
            },
            "sunday": {
                "8-12": "",
                "13-17": ""
            }
        },
        homeAddress: "2 bis rue saint vincent de paul, 63000, Clermont-Ferrand, France",
        workAddress: "7 rue de cataroux, 63000, Clermont-Ferrand, France",
        soccerAddress: "46 Rue des Varennes, 63170 Aubiere, France",
        homeToWork: 4.25,
        homeToSoccer: 4.6,
        workToSoccer: 0.35,
        score: 19,
        transport: ["car", "bike", "walk"],
    })
    user.save()
        .then(() => {
            res.status(201).json({
                message: "User created successfully!"
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
})

// get city
app.get("/api/city", (req, res) => {
    //  get lat and long from query params
    const lat = req.query.lat;
    const lon = req.query.lon;

    console.log("Incoming city request")
    const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2" + "&lat=" + lat + "&lon=" + lon;
    console.log(url);

    fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error })
        });
})

// get coords
app.post("/api/coords", (req, res) => {
    //  get lat and long from query params
    const city = req.query.city;
    const country = req.query.country;
    const street = req.query.street;
    const postalcode = req.query.postalcode;

    console.log(city);
    console.log(country);
    console.log(street);
    console.log(postalcode);

    console.log("Incoming coords request")

    const url = "https://nominatim.openstreetmap.org/search?format=json" + "&city=" + city + "&country=" + country + "&street=" + street + "&postalcode=" + postalcode;
    // url encode
    const urlEncoded = encodeURI(url);
    console.log(urlEncoded);

    fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        }
        )
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error })
        });
})

// get weather
app.get("/api/weather", (req, res) => {
    const url = "https://api.meteo-concept.com/api/forecast/daily?token=44ead9e236cfabe4ddc37572c77169eed8cde9502ca5fe900f48e65170a352ec&insee=13055"
    fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            // get user info
            const user = User.findOne({ username: "Taha RatéLeBus" })
                .then((user) => {
                    // get user listActivities
                    const homeToWork = 4.25;
                    const homeToSoccer = 4.6;
                    const workToSoccer = 0.35;
                    const coeffWalk = 0.25;
                    const coeffBike = 0.5;
                    const coeffCar = 1;
                    const forecast = data.forecast;
                    const week = forecast.slice(0, 7);
                    const clean_data = [];
                    const locations = ["home", "work", "soccer"];
                    const week_days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
                    const matrix = {};
                    for (let i = 0; i < week.length; i++) {
                        const day = week[i];
                        const tmin = day.tmin;
                        const tmax = day.tmax;
                        const probarain = day.probarain;
                        const sun_hours = day.sun_hours;
                        let isSunnyMorning = false;
                        let isSunnyAfternoon = false;
                        if (sun_hours > 6) {
                            isSunnyMorning = true;
                        }
                        if (probarain < 30) {
                            isSunnyAfternoon = true;
                        }
                        let hometoworkImpact = 0;
                        let hometosoccerImpact = 0;
                        let worktosoccerImpact = 0;
                        if (isSunnyMorning) {
                            hometoworkImpact = homeToWork * coeffWalk;
                            hometosoccerImpact = homeToSoccer * coeffWalk;
                            worktosoccerImpact = workToSoccer * coeffWalk;
                        }
                        else {
                            if (isSunnyAfternoon) {
                                hometoworkImpact = homeToWork * coeffBike;
                                hometosoccerImpact = homeToSoccer * coeffBike;
                                worktosoccerImpact = workToSoccer * coeffBike;
                            }
                            else {
                                hometoworkImpact = homeToWork * coeffCar;
                                hometosoccerImpact = homeToSoccer * coeffCar;
                                worktosoccerImpact = workToSoccer * coeffCar;
                            }
                        }
                        const list_to_add = [[0, hometoworkImpact, hometosoccerImpact], [homeToWork, 0, worktosoccerImpact], [homeToSoccer, workToSoccer, 0]];
                        matrix[week_days[i]] = list_to_add;
                        console.log(matrix);
                        const day_data = {
                            tmin: tmin,
                            tmax: tmax,
                            isSunnyMorning: isSunnyMorning,
                            isSunnyAfternoon: isSunnyAfternoon,
                        }
                        clean_data.push(day_data);
                    }
                    console.log(clean_data);
                    res.status(200).json(clean_data);
                }
                )
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({ error })
                }
                )
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error })
        });
})
// ########### JWT SETUP ###########

// Generate new cookie object and save it in database
