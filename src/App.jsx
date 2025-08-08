import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import JournalEntry from "./pages/JournalEntry";
import CSVUpload from "./pages/CSVUpload";
import SignUp from "./pages/SignUp";
import StrategyAnalytics from "./pages/StrategyAnalytics";

function App() {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/journal" element={<JournalEntry />} />
                        <Route path="/upload" element={<CSVUpload />} />
                        <Route path="/analytics" element={<StrategyAnalytics />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App; 