import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import "bootstrap/dist/css/bootstrap.min.css";

import MyInfo from "./views/MyInfo";
import App from "./App";
import MyCalendar from "./views/Calendar";
import BlockList from "./views/BlockList";
import ChatBot from "./views/ChatBot";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Router>
        <Routes>
            <Route exact path="/" element={<App />} />

            <Route path="/info" element={<MyInfo />} />

            <Route path="/calendar" element={<MyCalendar />} />

            <Route path="/partenaires" element={<BlockList />} />

            <Route path="/chatbot" element={<ChatBot />} />

        </Routes>
    </Router>
);
