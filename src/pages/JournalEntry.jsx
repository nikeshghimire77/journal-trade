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
        tradeEntry: true, // Keep trade entry open by default
        postTrade: true, // Expand post-trade reflection
        dailySummary: true, // Expand daily summary
        download: true // Expand download options
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
        console.log('Toggling section:', section);
        setExpandedSections(prev => {
            const newState = {
                ...prev,
                [section]: !prev[section]
            };
            console.log('New expanded sections state:', newState);
            return newState;
        });
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
        // Keep all sections expanded as they were
        // Don't reset expandedSections state
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