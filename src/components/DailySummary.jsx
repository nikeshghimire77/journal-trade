import React from "react";
import { TrendingUp, TrendingDown, Target, Award, Clock, BarChart3, Zap, AlertTriangle } from "lucide-react";

function DailySummary({ trades }) {
    const totalTrades = trades.length;
    const totalPnL = trades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0);
    const winningTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) > 0).length;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    // Calculate profit/loss distribution
    const profitTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) > 0);
    const lossTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) < 0);
    const totalProfit = profitTrades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0);
    const totalLoss = lossTrades.reduce((sum, trade) => sum + Math.abs(parseFloat(trade.pnl) || 0), 0);

    // Calculate position distribution
    const longTrades = trades.filter(trade => trade.position === 'long').length;
    const shortTrades = trades.filter(trade => trade.position === 'short').length;

    // Strategy analysis
    const strategyCounts = trades.reduce((acc, trade) => {
        if (trade.strategy) {
            acc[trade.strategy] = (acc[trade.strategy] || 0) + 1;
        }
        return acc;
    }, {});
    const topStrategy = Object.keys(strategyCounts).length > 0
        ? Object.entries(strategyCounts).sort(([, a], [, b]) => b - a)[0][0]
        : null;

    // Market condition analysis
    const marketConditionCounts = trades.reduce((acc, trade) => {
        if (trade.marketCondition) {
            acc[trade.marketCondition] = (acc[trade.marketCondition] || 0) + 1;
        }
        return acc;
    }, {});
    const topMarketCondition = Object.keys(marketConditionCounts).length > 0
        ? Object.entries(marketConditionCounts).sort(([, a], [, b]) => b - a)[0][0]
        : null;

    // Trade tags analysis
    const tagCounts = trades.reduce((acc, trade) => {
        if (trade.tradeTags) {
            trade.tradeTags.forEach(tag => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
        }
        return acc;
    }, {});

    const perfectSetups = tagCounts['perfect_setup'] || 0;
    const learnedSomething = tagCounts['learned_something'] || 0;
    const repeatedMistakes = tagCounts['repeated_mistake'] || 0;

    // Average risk/reward
    const tradesWithRR = trades.filter(trade => trade.riskReward && parseFloat(trade.riskReward) > 0);
    const avgRiskReward = tradesWithRR.length > 0
        ? (tradesWithRR.reduce((sum, trade) => sum + parseFloat(trade.riskReward), 0) / tradesWithRR.length).toFixed(2)
        : 0;

    return (
        <>
            <div className="summary-stats">
                <div className="stat-card">
                    <div className="stat-value" style={{ color: '#10b981' }}>
                        {totalTrades}
                    </div>
                    <div className="stat-label">Total Trades</div>
                    <div className="stat-visual">
                        <div className="trade-distribution">
                            <div className="position-bar">
                                <div className="position-segment long" style={{ width: `${(longTrades / totalTrades) * 100}%` }}></div>
                                <div className="position-segment short" style={{ width: `${(shortTrades / totalTrades) * 100}%` }}></div>
                            </div>
                            <div className="position-labels">
                                <span className="position-label long">Long: {longTrades}</span>
                                <span className="position-label short">Short: {shortTrades}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-value" style={{ color: totalPnL >= 0 ? '#10b981' : '#ef4444' }}>
                        ${totalPnL.toFixed(2)}
                    </div>
                    <div className="stat-label">Total P&L</div>
                    <div className="stat-visual">
                        <div className="pnl-breakdown">
                            <div className="pnl-bar">
                                <div className="pnl-segment profit" style={{ width: `${totalProfit > 0 ? (totalProfit / (totalProfit + totalLoss)) * 100 : 0}%` }}></div>
                                <div className="pnl-segment loss" style={{ width: `${totalLoss > 0 ? (totalLoss / (totalProfit + totalLoss)) * 100 : 0}%` }}></div>
                            </div>
                            <div className="pnl-labels">
                                <span className="pnl-label profit">+${totalProfit.toFixed(2)}</span>
                                <span className="pnl-label loss">-${totalLoss.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-value" style={{ color: winRate >= 50 ? '#10b981' : '#f59e0b' }}>
                        {winRate.toFixed(1)}%
                    </div>
                    <div className="stat-label">Win Rate</div>
                    <div className="stat-visual">
                        <div className="win-rate-circle">
                            <svg width="60" height="60" viewBox="0 0 60 60">
                                <circle
                                    cx="30"
                                    cy="30"
                                    r="25"
                                    fill="none"
                                    stroke="rgba(55, 65, 81, 0.3)"
                                    strokeWidth="4"
                                />
                                <circle
                                    cx="30"
                                    cy="30"
                                    r="25"
                                    fill="none"
                                    stroke={winRate >= 50 ? '#10b981' : '#f59e0b'}
                                    strokeWidth="4"
                                    strokeDasharray={`${(winRate / 100) * 157} 157`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 30 30)"
                                    style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                                />
                            </svg>
                            <div className="win-rate-text">{winningTrades}/{totalTrades}</div>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-value" style={{ color: avgRiskReward >= 2 ? '#10b981' : '#f59e0b' }}>
                        {avgRiskReward}:1
                    </div>
                    <div className="stat-label">Avg R/R</div>
                    <div className="stat-visual">
                        <div className="risk-reward-indicator">
                            <div className="rr-bar">
                                <div
                                    className="rr-fill"
                                    style={{
                                        width: `${Math.min((avgRiskReward / 5) * 100, 100)}%`,
                                        backgroundColor: avgRiskReward >= 2 ? '#10b981' : '#f59e0b'
                                    }}
                                ></div>
                            </div>
                            <div className="rr-label">
                                {tradesWithRR.length} trades
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {totalTrades > 0 && (
                <div className="performance-insights">
                    <h3>🎯 Performance Insights</h3>
                    <div className="insights-grid">
                        <div className="insight-card">
                            <div className="insight-icon">
                                {totalPnL >= 0 ? <TrendingUp color="#10b981" /> : <TrendingDown color="#ef4444" />}
                            </div>
                            <div className="insight-content">
                                <div className="insight-title">
                                    {totalPnL >= 0 ? 'Profitable Day' : 'Loss Day'}
                                </div>
                                <div className="insight-value">
                                    {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <div className="insight-card">
                            <div className="insight-icon">
                                <Target color={winRate >= 50 ? '#10b981' : '#f59e0b'} />
                            </div>
                            <div className="insight-content">
                                <div className="insight-title">Accuracy</div>
                                <div className="insight-value">{winRate.toFixed(1)}%</div>
                            </div>
                        </div>

                        {topStrategy && (
                            <div className="insight-card">
                                <div className="insight-icon">
                                    <BarChart3 color="#8b5cf6" />
                                </div>
                                <div className="insight-content">
                                    <div className="insight-title">Top Strategy</div>
                                    <div className="insight-value">{topStrategy}</div>
                                </div>
                            </div>
                        )}

                        {topMarketCondition && (
                            <div className="insight-card">
                                <div className="insight-icon">
                                    <Zap color="#f59e0b" />
                                </div>
                                <div className="insight-content">
                                    <div className="insight-title">Market Condition</div>
                                    <div className="insight-value">{topMarketCondition}</div>
                                </div>
                            </div>
                        )}

                        {perfectSetups > 0 && (
                            <div className="insight-card">
                                <div className="insight-icon">
                                    <Award color="#10b981" />
                                </div>
                                <div className="insight-content">
                                    <div className="insight-title">Perfect Setups</div>
                                    <div className="insight-value">{perfectSetups}</div>
                                </div>
                            </div>
                        )}

                        {learnedSomething > 0 && (
                            <div className="insight-card">
                                <div className="insight-icon">
                                    <Clock color="#06b6d4" />
                                </div>
                                <div className="insight-content">
                                    <div className="insight-title">Learning Moments</div>
                                    <div className="insight-value">{learnedSomething}</div>
                                </div>
                            </div>
                        )}

                        {repeatedMistakes > 0 && (
                            <div className="insight-card">
                                <div className="insight-icon">
                                    <AlertTriangle color="#ef4444" />
                                </div>
                                <div className="insight-content">
                                    <div className="insight-title">Repeated Mistakes</div>
                                    <div className="insight-value">{repeatedMistakes}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {totalTrades === 0 && (
                <div className="no-trades-message">
                    <div className="no-trades-icon">📈</div>
                    <div className="no-trades-text">
                        <h3>Ready to Trade!</h3>
                        <p>Add your first trade to see your daily performance metrics</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default DailySummary; 