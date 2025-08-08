import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, BarChart3, PieChart, Activity, Calendar, DollarSign, Percent, Zap } from 'lucide-react';

const StrategyAnalytics = () => {
    const [selectedStrategy, setSelectedStrategy] = useState('all');
    const [timeframe, setTimeframe] = useState('30d');
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        // Load trades from localStorage
        const savedTrades = JSON.parse(localStorage.getItem('trades') || '[]');
        setTrades(savedTrades);
    }, []);

    // Strategy definitions
    const strategies = {
        all: 'All Strategies',
        breakout: 'Breakout Trading',
        reversal: 'Reversal Trading',
        scalping: 'Scalping',
        swing: 'Swing Trading',
        momentum: 'Momentum Trading',
        mean_reversion: 'Mean Reversion'
    };

    // Filter trades by strategy and timeframe
    const filteredTrades = trades.filter(trade => {
        const tradeDate = new Date(trade.date);
        const now = new Date();
        const daysDiff = (now - tradeDate) / (1000 * 60 * 60 * 24);

        const timeframeMatch =
            (timeframe === '7d' && daysDiff <= 7) ||
            (timeframe === '30d' && daysDiff <= 30) ||
            (timeframe === '90d' && daysDiff <= 90) ||
            (timeframe === '1y' && daysDiff <= 365) ||
            timeframe === 'all';

        const strategyMatch = selectedStrategy === 'all' || trade.strategy === selectedStrategy;

        return timeframeMatch && strategyMatch;
    });

    // Calculate performance metrics
    const calculateMetrics = () => {
        if (filteredTrades.length === 0) return {};

        const totalTrades = filteredTrades.length;
        const winningTrades = filteredTrades.filter(t => t.profit > 0);
        const losingTrades = filteredTrades.filter(t => t.profit < 0);

        const totalProfit = filteredTrades.reduce((sum, t) => sum + t.profit, 0);
        const totalLoss = losingTrades.reduce((sum, t) => sum + Math.abs(t.profit), 0);
        const totalGain = winningTrades.reduce((sum, t) => sum + t.profit, 0);

        const winRate = (winningTrades.length / totalTrades) * 100;
        const avgWin = winningTrades.length > 0 ? totalGain / winningTrades.length : 0;
        const avgLoss = losingTrades.length > 0 ? totalLoss / losingTrades.length : 0;
        const profitFactor = totalLoss > 0 ? totalGain / totalLoss : 0;
        const riskRewardRatio = avgLoss > 0 ? avgWin / avgLoss : 0;

        // Calculate max drawdown
        let peak = 0;
        let maxDrawdown = 0;
        let runningTotal = 0;

        filteredTrades.forEach(trade => {
            runningTotal += trade.profit;
            if (runningTotal > peak) peak = runningTotal;
            const drawdown = peak - runningTotal;
            if (drawdown > maxDrawdown) maxDrawdown = drawdown;
        });

        return {
            totalTrades,
            winningTrades: winningTrades.length,
            losingTrades: losingTrades.length,
            totalProfit,
            totalLoss,
            totalGain,
            winRate,
            avgWin,
            avgLoss,
            profitFactor,
            riskRewardRatio,
            maxDrawdown
        };
    };

    const metrics = calculateMetrics();

    // Strategy performance breakdown
    const strategyPerformance = () => {
        const strategyStats = {};

        Object.keys(strategies).forEach(strategy => {
            if (strategy === 'all') return;

            const strategyTrades = filteredTrades.filter(t => t.strategy === strategy);
            if (strategyTrades.length === 0) return;

            const wins = strategyTrades.filter(t => t.profit > 0).length;
            const total = strategyTrades.length;
            const profit = strategyTrades.reduce((sum, t) => sum + t.profit, 0);

            strategyStats[strategy] = {
                trades: total,
                wins,
                winRate: (wins / total) * 100,
                profit
            };
        });

        return strategyStats;
    };

    const strategyStats = strategyPerformance();

    return (
        <div className="strategy-analytics">
            <div className="analytics-header">
                <h1>Strategy Performance Analytics</h1>
                <p>Advanced backtesting and performance analysis for your trading strategies</p>
            </div>

            {/* Filters */}
            <div className="analytics-filters">
                <div className="filter-group">
                    <label>Strategy:</label>
                    <select value={selectedStrategy} onChange={(e) => setSelectedStrategy(e.target.value)}>
                        {Object.entries(strategies).map(([key, name]) => (
                            <option key={key} value={key}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Timeframe:</label>
                    <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                        <option value="1y">Last Year</option>
                        <option value="all">All Time</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card primary">
                    <div className="metric-icon">
                        <DollarSign size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-value">{metrics.totalProfit ? `$${metrics.totalProfit.toFixed(2)}` : '$0.00'}</div>
                        <div className="metric-label">Total P&L</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <Percent size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-value">{metrics.winRate ? `${metrics.winRate.toFixed(1)}%` : '0%'}</div>
                        <div className="metric-label">Win Rate</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <BarChart3 size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-value">{metrics.profitFactor ? metrics.profitFactor.toFixed(2) : '0.00'}</div>
                        <div className="metric-label">Profit Factor</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <Target size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-value">{metrics.riskRewardRatio ? metrics.riskRewardRatio.toFixed(2) : '0.00'}</div>
                        <div className="metric-label">Risk/Reward</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <Activity size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-value">{metrics.totalTrades || 0}</div>
                        <div className="metric-label">Total Trades</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <TrendingDown size={24} />
                    </div>
                    <div className="metric-content">
                        <div className="metric-value">{metrics.maxDrawdown ? `$${metrics.maxDrawdown.toFixed(2)}` : '$0.00'}</div>
                        <div className="metric-label">Max Drawdown</div>
                    </div>
                </div>
            </div>

            {/* Strategy Performance Breakdown */}
            <div className="strategy-breakdown">
                <h3>Strategy Performance</h3>
                <div className="strategy-grid">
                    {Object.entries(strategyStats).map(([strategy, stats]) => (
                        <div key={strategy} className="strategy-card">
                            <div className="strategy-header">
                                <h4>{strategies[strategy]}</h4>
                                <span className={`strategy-profit ${stats.profit >= 0 ? 'positive' : 'negative'}`}>
                                    ${stats.profit.toFixed(2)}
                                </span>
                            </div>
                            <div className="strategy-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Trades:</span>
                                    <span className="stat-value">{stats.trades}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Win Rate:</span>
                                    <span className="stat-value">{stats.winRate.toFixed(1)}%</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Wins:</span>
                                    <span className="stat-value">{stats.wins}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Chart */}
            <div className="performance-chart">
                <h3>Performance Over Time</h3>
                <div className="chart-container">
                    <div className="performance-line">
                        {/* This would be a real chart component */}
                        <div className="chart-placeholder">
                            <BarChart3 size={48} />
                            <p>Performance chart will be implemented here</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trade Analysis */}
            <div className="trade-analysis">
                <h3>Recent Trades Analysis</h3>
                <div className="trades-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Symbol</th>
                                <th>Strategy</th>
                                <th>Position</th>
                                <th>P&L</th>
                                <th>Win/Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrades.slice(0, 10).map((trade, index) => (
                                <tr key={index}>
                                    <td>{new Date(trade.date).toLocaleDateString()}</td>
                                    <td>{trade.symbol}</td>
                                    <td>{trade.strategy || 'Unknown'}</td>
                                    <td className={`position ${trade.position}`}>{trade.position}</td>
                                    <td className={`pnl ${trade.profit >= 0 ? 'positive' : 'negative'}`}>
                                        ${trade.profit.toFixed(2)}
                                    </td>
                                    <td className={`result ${trade.profit >= 0 ? 'win' : 'loss'}`}>
                                        {trade.profit >= 0 ? 'Win' : 'Loss'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StrategyAnalytics; 