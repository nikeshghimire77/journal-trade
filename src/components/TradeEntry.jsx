import React, { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Clock, Target, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

function TradeEntry({ trades, onAddTrade, onUpdateTrade, onDeleteTrade, isExpanded, onToggle }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        ticker: "",
        entry: "",
        position: "long",
        positionSize: "",
        riskReward: "",
        calculatedStopLoss: "",
        calculatedTarget: "",
        pnl: "",
        strategy: "",
        marketCondition: "",
        holdTime: "",
        tradeTags: [],
        notes: "",
        date: new Date().toISOString().split('T')[0],
    });

    const strategies = [
        "Breakout", "Pullback", "Momentum", "Reversal",
        "Gap Fill", "Support/Resistance", "News Driven", "Technical"
    ];

    const marketConditions = [
        "Bullish", "Bearish", "Sideways", "Volatile", "Low Volume"
    ];

    // Predefined Risk/Reward ratios
    const riskRewardRatios = [
        { value: "1:1", label: "1:1 (Equal Risk/Reward)", ratio: 1 },
        { value: "1:1.5", label: "1:1.5 (Conservative)", ratio: 1.5 },
        { value: "1:2", label: "1:2 (Standard)", ratio: 2 },
        { value: "1:2.5", label: "1:2.5 (Good)", ratio: 2.5 },
        { value: "1:3", label: "1:3 (Excellent)", ratio: 3 },
        { value: "1:4", label: "1:4 (High Reward)", ratio: 4 },
        { value: "1:5", label: "1:5 (Very High Reward)", ratio: 5 }
    ];

    const tradeTags = [
        { id: "perfect_setup", label: "Perfect Setup", icon: "✅" },
        { id: "good_execution", label: "Good Execution", icon: "🎯" },
        { id: "poor_entry", label: "Poor Entry", icon: "⚠️" },
        { id: "great_exit", label: "Great Exit", icon: "🚀" },
        { id: "learned_something", label: "Learned Something", icon: "📚" },
        { id: "repeated_mistake", label: "Repeated Mistake", icon: "🔄" },
        { id: "new_strategy", label: "New Strategy", icon: "🆕" },
        { id: "fomo_trade", label: "FOMO Trade", icon: "😰" }
    ];

    // Calculate stop loss and target based on entry price and risk/reward ratio
    const calculateLevels = (entry, riskRewardValue, position) => {
        if (!entry || !riskRewardValue || parseFloat(entry) <= 0) {
            return { stopLoss: "", target: "" };
        }

        const entryPrice = parseFloat(entry);
        const selectedRatio = riskRewardRatios.find(rr => rr.value === riskRewardValue);

        if (!selectedRatio) {
            return { stopLoss: "", target: "" };
        }

        const ratio = selectedRatio.ratio;

        if (position === "long") {
            // For long: Risk = Entry - StopLoss, Reward = Target - Entry
            // R/R = (Target - Entry) / (Entry - StopLoss)
            // Let's assume a 1% risk (Entry - StopLoss = Entry * 0.01)
            const riskAmount = entryPrice * 0.01; // 1% risk
            const stopLoss = entryPrice - riskAmount;
            const target = entryPrice + (riskAmount * ratio);

            return {
                stopLoss: stopLoss.toFixed(2),
                target: target.toFixed(2)
            };
        } else {
            // For short: Risk = StopLoss - Entry, Reward = Entry - Target
            // R/R = (Entry - Target) / (StopLoss - Entry)
            const riskAmount = entryPrice * 0.01; // 1% risk
            const stopLoss = entryPrice + riskAmount;
            const target = entryPrice - (riskAmount * ratio);

            return {
                stopLoss: stopLoss.toFixed(2),
                target: target.toFixed(2)
            };
        }
    };

    const handleEntryChange = (value) => {
        const newFormData = { ...formData, entry: value };
        if (value && formData.riskReward) {
            const levels = calculateLevels(value, formData.riskReward, formData.position);
            newFormData.calculatedStopLoss = levels.stopLoss;
            newFormData.calculatedTarget = levels.target;
        }
        setFormData(newFormData);
    };

    const handleRiskRewardChange = (value) => {
        const newFormData = { ...formData, riskReward: value };
        if (formData.entry && value) {
            const levels = calculateLevels(formData.entry, value, formData.position);
            newFormData.calculatedStopLoss = levels.stopLoss;
            newFormData.calculatedTarget = levels.target;
        }
        setFormData(newFormData);
    };

    const handlePositionChange = (value) => {
        const newFormData = { ...formData, position: value };
        if (formData.entry && formData.riskReward) {
            const levels = calculateLevels(formData.entry, formData.riskReward, value);
            newFormData.calculatedStopLoss = levels.stopLoss;
            newFormData.calculatedTarget = levels.target;
        }
        setFormData(newFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const tradeData = {
            ...formData,
            stopLoss: formData.calculatedStopLoss,
            exit: formData.calculatedTarget
        };

        if (editingId) {
            onUpdateTrade(editingId, tradeData);
            setEditingId(null);
        } else {
            onAddTrade(tradeData);
        }

        setFormData({
            ticker: "",
            entry: "",
            position: "long",
            positionSize: "",
            riskReward: "",
            calculatedStopLoss: "",
            calculatedTarget: "",
            pnl: "",
            strategy: "",
            marketCondition: "",
            holdTime: "",
            tradeTags: [],
            notes: "",
            date: new Date().toISOString().split('T')[0],
        });
        setShowForm(false);
    };

    const handleEdit = (trade) => {
        setEditingId(trade.id);
        setFormData({
            ticker: trade.ticker,
            entry: trade.entry,
            position: trade.position,
            positionSize: trade.positionSize || "",
            riskReward: trade.riskReward || "",
            calculatedStopLoss: trade.stopLoss || "",
            calculatedTarget: trade.exit || "",
            pnl: trade.pnl,
            strategy: trade.strategy || "",
            marketCondition: trade.marketCondition || "",
            holdTime: trade.holdTime || "",
            tradeTags: trade.tradeTags || [],
            notes: trade.notes || "",
            date: trade.date || new Date().toISOString().split('T')[0],
        });
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({
            ticker: "",
            entry: "",
            position: "long",
            positionSize: "",
            riskReward: "",
            calculatedStopLoss: "",
            calculatedTarget: "",
            pnl: "",
            strategy: "",
            marketCondition: "",
            holdTime: "",
            tradeTags: [],
            notes: "",
            date: new Date().toISOString().split('T')[0],
        });
    };

    const handleTagToggle = (tagId) => {
        setFormData(prev => ({
            ...prev,
            tradeTags: prev.tradeTags.includes(tagId)
                ? prev.tradeTags.filter(id => id !== tagId)
                : [...prev.tradeTags, tagId]
        }));
    };

    return (
        <div className="card">
            <div className="card-header" onClick={onToggle}>
                <h2>Trade Log</h2>
                {isExpanded ? <ChevronUp className="collapse-icon" /> : <ChevronDown className="collapse-icon" />}
            </div>

            {isExpanded && (
                <div className="card-content">
                    {/* Quick Add Form */}
                    <div className="quick-add-section">
                        <div className="quick-add-header">
                            <h3>Quick Add Trade</h3>
                            {!showForm && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShowForm(true)}
                                >
                                    <Plus size={16} />
                                    Add Trade
                                </button>
                            )}
                        </div>

                        {showForm && (
                            <form onSubmit={handleSubmit} className="quick-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={formData.date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ticker *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.ticker}
                                            onChange={(e) => setFormData(prev => ({ ...prev, ticker: e.target.value.toUpperCase() }))}
                                            placeholder="AAPL"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Position *</label>
                                        <select
                                            className="form-control"
                                            value={formData.position}
                                            onChange={(e) => handlePositionChange(e.target.value)}
                                        >
                                            <option value="long">Long</option>
                                            <option value="short">Short</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Entry Price *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={formData.entry}
                                            onChange={(e) => handleEntryChange(e.target.value)}
                                            placeholder="150.25"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Position Size (Shares) *</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.positionSize}
                                            onChange={(e) => setFormData(prev => ({ ...prev, positionSize: e.target.value }))}
                                            placeholder="100"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Risk/Reward Ratio *</label>
                                        <select
                                            className="form-control"
                                            value={formData.riskReward}
                                            onChange={(e) => handleRiskRewardChange(e.target.value)}
                                            required
                                        >
                                            <option value="">Select R/R Ratio</option>
                                            {riskRewardRatios.map(rr => (
                                                <option key={rr.value} value={rr.value}>{rr.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Calculated Stop Loss</label>
                                        <input
                                            type="text"
                                            className="form-control calculated-field"
                                            value={formData.calculatedStopLoss}
                                            readOnly
                                            placeholder="Auto-calculated (1% risk)"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Calculated Target</label>
                                        <input
                                            type="text"
                                            className="form-control calculated-field"
                                            value={formData.calculatedTarget}
                                            readOnly
                                            placeholder="Auto-calculated (R/R × risk)"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Actual P&L</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={formData.pnl}
                                            onChange={(e) => setFormData(prev => ({ ...prev, pnl: e.target.value }))}
                                            placeholder="+25.50"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Strategy</label>
                                        <select
                                            className="form-control"
                                            value={formData.strategy}
                                            onChange={(e) => setFormData(prev => ({ ...prev, strategy: e.target.value }))}
                                        >
                                            <option value="">Select Strategy</option>
                                            {strategies.map(strategy => (
                                                <option key={strategy} value={strategy}>{strategy}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Market Condition</label>
                                        <select
                                            className="form-control"
                                            value={formData.marketCondition}
                                            onChange={(e) => setFormData(prev => ({ ...prev, marketCondition: e.target.value }))}
                                        >
                                            <option value="">Select Condition</option>
                                            {marketConditions.map(condition => (
                                                <option key={condition} value={condition}>{condition}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Hold Time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.holdTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, holdTime: e.target.value }))}
                                            placeholder="2h 30m"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Trade Tags</label>
                                    <div className="trade-tags">
                                        {tradeTags.map(tag => (
                                            <button
                                                key={tag.id}
                                                type="button"
                                                className={`trade-tag ${formData.tradeTags.includes(tag.id) ? 'active' : ''}`}
                                                onClick={() => handleTagToggle(tag.id)}
                                            >
                                                <span className="tag-icon">{tag.icon}</span>
                                                <span className="tag-label">{tag.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Notes (Optional)</label>
                                    <textarea
                                        className="form-control"
                                        value={formData.notes}
                                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                        placeholder="What went well? What could be improved?"
                                        rows="3"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary">
                                        {editingId ? 'Update Trade' : 'Add Trade'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Trades List */}
                    <div className="trades-list">
                        <h3>Today's Trades ({trades.length})</h3>
                        {trades.length === 0 ? (
                            <p className="no-trades">No trades logged yet. Add your first trade above!</p>
                        ) : (
                            <div className="trades-grid">
                                {trades.map((trade) => (
                                    <div key={trade.id} className="trade-card">
                                        <div className="trade-header">
                                            <div className="trade-main">
                                                <span className="trade-ticker">{trade.ticker}</span>
                                                <span className={`trade-position ${trade.position}`}>
                                                    {trade.position.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="trade-actions">
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => handleEdit(trade)}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="btn-icon btn-danger"
                                                    onClick={() => onDeleteTrade(trade.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="trade-details">
                                            <div className="trade-detail">
                                                <span className="trade-detail-label">Date</span>
                                                <span className="trade-detail-value">
                                                    {trade.date ? new Date(trade.date).toLocaleDateString() : 'Today'}
                                                </span>
                                            </div>
                                            <div className="trade-detail">
                                                <span className="trade-detail-label">Entry</span>
                                                <span className="trade-detail-value">${trade.entry}</span>
                                            </div>
                                            <div className="trade-detail">
                                                <span className="trade-detail-label">Shares</span>
                                                <span className="trade-detail-value">{trade.positionSize || 'N/A'}</span>
                                            </div>
                                            {trade.stopLoss && (
                                                <div className="trade-detail">
                                                    <span className="trade-detail-label">Stop Loss</span>
                                                    <span className="trade-detail-value">${trade.stopLoss}</span>
                                                </div>
                                            )}
                                            {trade.exit && (
                                                <div className="trade-detail">
                                                    <span className="trade-detail-label">Target</span>
                                                    <span className="trade-detail-value">${trade.exit}</span>
                                                </div>
                                            )}
                                            <div className="trade-detail">
                                                <span className="trade-detail-label">P&L</span>
                                                <span className={`trade-detail-value ${parseFloat(trade.pnl) >= 0 ? 'profit' : 'loss'}`}>
                                                    ${trade.pnl}
                                                </span>
                                            </div>
                                            {trade.riskReward && (
                                                <div className="trade-detail">
                                                    <span className="trade-detail-label">R/R</span>
                                                    <span className="trade-detail-value">{trade.riskReward}</span>
                                                </div>
                                            )}
                                            {trade.strategy && (
                                                <div className="trade-detail">
                                                    <span className="trade-detail-label">Strategy</span>
                                                    <span className="trade-detail-value">{trade.strategy}</span>
                                                </div>
                                            )}
                                            {trade.marketCondition && (
                                                <div className="trade-detail">
                                                    <span className="trade-detail-label">Market</span>
                                                    <span className="trade-detail-value">{trade.marketCondition}</span>
                                                </div>
                                            )}
                                            {trade.holdTime && (
                                                <div className="trade-detail">
                                                    <span className="trade-detail-label">Hold Time</span>
                                                    <span className="trade-detail-value">{trade.holdTime}</span>
                                                </div>
                                            )}
                                        </div>

                                        {trade.tradeTags && trade.tradeTags.length > 0 && (
                                            <div className="trade-tags-display">
                                                {trade.tradeTags.map(tagId => {
                                                    const tag = tradeTags.find(t => t.id === tagId);
                                                    return tag ? (
                                                        <span key={tagId} className="trade-tag-display">
                                                            {tag.icon} {tag.label}
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}

                                        {trade.notes && (
                                            <div className="trade-notes">
                                                <span className="notes-label">Notes:</span>
                                                <span className="notes-value">{trade.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TradeEntry; 