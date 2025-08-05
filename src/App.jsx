import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import JournalEntry from "./pages/JournalEntry";
import CSVUpload from "./pages/CSVUpload";

function App() {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/journal" element={<JournalEntry />} />
                        <Route path="/upload" element={<CSVUpload />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App; 