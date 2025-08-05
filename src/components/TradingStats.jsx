import React, { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Target, Award, Clock, BarChart3, Zap, AlertTriangle, Calendar, Filter, Download, Upload, Database, FileText, X } from "lucide-react";

function TradingStats({ trades, journalData }) {
    const [timeFilter, setTimeFilter] = useState('all');
    const [showUpload, setShowUpload] = useState(false);

    // Simple stats calculation
    const stats = useMemo(() => {
        if (trades.length === 0) return null;

        const totalPnL = trades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0);
        const winningTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) > 0);
        const winRate = (winningTrades.length / trades.length) * 100;

        return {
            totalTrades: trades.length,
            totalPnL,
            winRate
        };
    }, [trades]);

    if (!stats) {
        return (
            <div className="card">
                <div className="card-header">
                    <h2>Trading Analysis</h2>
                    <BarChart3 className="collapse-icon" size={20} />
                </div>
                <div className="card-content">
                    <div className="no-data-message">
                        <div className="no-data-icon">📈</div>
                        <h3>No Data Available</h3>
                        <p>Add some trades to see your comprehensive analysis</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2>Trading Analysis</h2>
                <BarChart3 className="collapse-icon" size={20} />
            </div>
            <div className="card-content">
                {/* Time Filter */}
                <div className="analysis-controls">
                    <div className="filter-section">
                        <label>Time Period:</label>
                        <select
                            className="form-control"
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="quarter">Last 3 Months</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>
                    <div className="export-section">
                        <button onClick={() => setShowUpload(!showUpload)} className="btn btn-secondary">
                            <Upload size={16} />
                            Upload CSV
                        </button>
                        <button onClick={() => console.log('Export clicked')} className="btn btn-primary">
                            <Download size={16} />
                            Export Analysis
                        </button>
                    </div>
                </div>

                <div className="period-info">
                    <h3>All Time Analysis</h3>
                    <p>{stats.totalTrades} trades analyzed</p>
                </div>

                {/* Key Metrics */}
                <div className="metrics-grid">
                    <div className="metric-card primary">
                        <div className="metric-icon">
                            <TrendingUp color={stats.totalPnL >= 0 ? '#10b981' : '#ef4444'} />
                        </div>
                        <div className="metric-content">
                            <div className="metric-value" style={{ color: stats.totalPnL >= 0 ? '#10b981' : '#ef4444' }}>
                                ${stats.totalPnL.toFixed(2)}
                            </div>
                            <div className="metric-label">Total P&L</div>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon">
                            <Target color={stats.winRate >= 50 ? '#10b981' : '#f59e0b'} />
                        </div>
                        <div className="metric-content">
                            <div className="metric-value" style={{ color: stats.winRate >= 50 ? '#10b981' : '#f59e0b' }}>
                                {stats.winRate.toFixed(1)}%
                            </div>
                            <div className="metric-label">Win Rate</div>
                        </div>
                    </div>
                </div>

                {/* CSV Upload Section */}
                {showUpload && (
                    <div className="upload-section">
                        <h3>Upload CSV Files for Analysis</h3>
                        <div className="upload-area">
                            <Upload size={48} />
                            <p>Drag and drop CSV files here, or</p>
                            <input
                                type="file"
                                multiple
                                accept=".csv"
                                onChange={(e) => console.log('Files selected:', e.target.files)}
                                style={{ display: 'none' }}
                                id="csv-upload"
                            />
                            <label htmlFor="csv-upload" className="btn btn-primary">
                                Choose Files
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TradingStats; 