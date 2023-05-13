import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import "bootstrap/dist/css/bootstrap.min.css";

import MyInfo from "./views/MyInfo";
import App from "./App";
import MyCalendar from "./views/Calendar";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Router>
        <Routes>
            <Route exact path="/" element={<App />} />

            <Route path="/info" element={<MyInfo />} />

            <Route path="/calendar" element={<MyCalendar />} />

        </Routes>
    </Router>
);
