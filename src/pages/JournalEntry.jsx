import React, { useState, useEffect } from "react";
import TradeEntry from "../components/TradeEntry";
import PostTradeReflection from "../components/PostTradeReflection";
import DailySummary from "../components/DailySummary";
import TradingStats from "../components/TradingStats";
import DownloadOptions from "../components/DownloadOptions";

function JournalEntry() {
    const [trades, setTrades] = useState([]);
    const [journalData, setJournalData] = useState({
        postTrade: {}
    });
    const [lastSaved, setLastSaved] = useState(null);
    const [expandedSections, setExpandedSections] = useState({
        tradeEntry: true,
        postTrade: true,
        dailySummary: true,
        download: true
    });

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedTrades = localStorage.getItem('trades');
        const savedJournalData = localStorage.getItem('journalData');

        if (savedTrades) {
            setTrades(JSON.parse(savedTrades));
        }

        if (savedJournalData) {
            setJournalData(JSON.parse(savedJournalData));
        }
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('trades', JSON.stringify(trades));
        localStorage.setItem('journalData', JSON.stringify(journalData));
        setLastSaved(new Date().toLocaleTimeString());
    }, [trades, journalData]);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const updateJournalData = (field, value) => {
        setJournalData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addTrade = (trade) => {
        const newTrade = {
            ...trade,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        setTrades(prev => [...prev, newTrade]);
    };

    const updateTrade = (id, updatedTrade) => {
        setTrades(prev => prev.map(trade =>
            trade.id === id ? { ...trade, ...updatedTrade } : trade
        ));
    };

    const deleteTrade = (id) => {
        setTrades(prev => prev.filter(trade => trade.id !== id));
    };

    return (
        <div className="container">
            <div className="header">
                <div className="header-top">
                    <div className="custom-logo">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Gradients */}
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>

                            {/* Outer ring with gradient */}
                            <circle cx="25" cy="25" r="23" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />

                            {/* Inner circle */}
                            <circle cx="25" cy="25" r="15" fill="url(#innerGradient)" />

                            {/* Chart line going up */}
                            <path d="M10 30 L15 25 L20 28 L25 20 L30 22 L35 18 L40 21"
                                stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />

                            {/* NG Text */}
                            <text x="25" y="22" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" filter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))">NG</text>

                            {/* Small trading indicator dots */}
                            <circle cx="15" cy="25" r="1.5" fill="#10b981" />
                            <circle cx="25" cy="20" r="1.5" fill="#f59e0b" />
                            <circle cx="35" cy="18" r="1.5" fill="#ef4444" />
                        </svg>
                    </div>
                    <div className="header-title">
                        <h1>Trading Journal</h1>
                        <p>Track your trades, learn from your decisions, and improve your strategy</p>
                    </div>
                </div>
                {lastSaved && (
                    <div className="save-indicator">
                        💾 Last saved: {lastSaved}
                    </div>
                )}
            </div>

            <TradeEntry
                trades={trades}
                onAddTrade={addTrade}
                onUpdateTrade={updateTrade}
                onDeleteTrade={deleteTrade}
                isExpanded={expandedSections.tradeEntry}
                onToggle={() => toggleSection('tradeEntry')}
            />

            <PostTradeReflection
                data={journalData.postTrade}
                onUpdate={(data) => updateJournalData('postTrade', data)}
                isExpanded={expandedSections.postTrade}
                onToggle={() => toggleSection('postTrade')}
            />

            <div className="card">
                <div className="card-header" onClick={() => toggleSection('dailySummary')}>
                    <h2>📊 Daily Summary</h2>
                    <span className={`collapse-icon ${expandedSections.dailySummary ? 'rotated' : ''}`}>
                        ▼
                    </span>
                </div>
                {expandedSections.dailySummary && (
                    <div className="card-content">
                        <DailySummary trades={trades} />
                    </div>
                )}
            </div>

            <TradingStats
                trades={trades}
                journalData={journalData}
            />

            <div className="card">
                <div className="card-header" onClick={() => toggleSection('download')}>
                    <h2>📥 Export Your Journal</h2>
                    <span className={`collapse-icon ${expandedSections.download ? 'rotated' : ''}`}>
                        ▼
                    </span>
                </div>
                {expandedSections.download && (
                    <div className="card-content">
                        <DownloadOptions journalData={journalData} trades={trades} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default JournalEntry; 