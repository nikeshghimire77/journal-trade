import React, { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Clock, Target, TrendingUp, AlertTriangle, CheckCircle, XCircle, Calculator, Calendar, DollarSign } from "lucide-react";

function TradeEntry({ trades, onAddTrade, onUpdateTrade, onDeleteTrade, isExpanded, onToggle }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        ticker: "",
        entry: "",
        position: "long",
        positionSize: "",
        riskReward: "",
        calculatedStopLoss: "",
        calculatedTarget: "",
        expectedStopLoss: "",
        expectedTarget: "",
        actualStopLoss: "",
        actualTarget: "",
        pnl: "",
        percentageChange: "",
        strategy: "",
        strategyType: "",
        marketCondition: "",
        holdTime: "",
        expectedHoldTime: "",
        actualHoldTime: "",
        tradeTags: [],
        notes: "",
        date: new Date().toISOString().split('T')[0],
    });

    // Advanced Strategy Definitions
    const strategyTypes = {
        breakout: {
            name: "Breakout Trading",
            description: "Trading breakouts from key levels",
            expectedHoldTime: "1-3 days",
            riskReward: "1:2",
            keyLevels: true,
            volumeConfirmation: true
        },
        reversal: {
            name: "Reversal Trading",
            description: "Trading trend reversals",
            expectedHoldTime: "2-5 days",
            riskReward: "1:3",
            keyLevels: true,
            momentumConfirmation: true
        },
        scalping: {
            name: "Scalping",
            description: "Quick intraday trades",
            expectedHoldTime: "Minutes to hours",
            riskReward: "1:1.5",
            keyLevels: false,
            tightStops: true
        },
        swing: {
            name: "Swing Trading",
            description: "Medium-term position trading",
            expectedHoldTime: "1-2 weeks",
            riskReward: "1:3",
            keyLevels: true,
            trendFollowing: true
        },
        momentum: {
            name: "Momentum Trading",
            description: "Following strong momentum moves",
            expectedHoldTime: "1-5 days",
            riskReward: "1:2.5",
            keyLevels: false,
            volumeMomentum: true
        },
        mean_reversion: {
            name: "Mean Reversion",
            description: "Trading back to average levels",
            expectedHoldTime: "1-3 days",
            riskReward: "1:2",
            keyLevels: true,
            statisticalLevels: true
        }
    };

    const marketConditions = [
        "Bullish", "Bearish", "Sideways", "Volatile", "Low Volume", "High Volume", "Gap Up", "Gap Down"
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
        { id: "fomo_trade", label: "FOMO Trade", icon: "😰" },
        { id: "target_hit", label: "Target Hit", icon: "🎯" },
        { id: "stop_hit", label: "Stop Hit", icon: "🛑" },
        { id: "partial_exit", label: "Partial Exit", icon: "📊" },
        { id: "trailing_stop", label: "Trailing Stop", icon: "📈" }
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
            // Use a 2% risk for better stop loss calculation
            const riskAmount = entryPrice * 0.02; // 2% risk
            const stopLoss = entryPrice - riskAmount;
            const target = entryPrice + (riskAmount * ratio);

            return {
                stopLoss: stopLoss.toFixed(4),
                target: target.toFixed(4)
            };
        } else {
            // For short: Risk = StopLoss - Entry, Reward = Entry - Target
            const riskAmount = entryPrice * 0.02; // 2% risk
            const stopLoss = entryPrice + riskAmount;
            const target = entryPrice - (riskAmount * ratio);

            return {
                stopLoss: stopLoss.toFixed(4),
                target: target.toFixed(4)
            };
        }
    };

    // Calculate expected hold time based on strategy
    const calculateExpectedHoldTime = (strategyType) => {
        if (!strategyType || !strategyTypes[strategyType]) return "";
        return strategyTypes[strategyType].expectedHoldTime;
    };

    // Calculate expected risk/reward based on strategy
    const calculateExpectedRiskReward = (strategyType) => {
        if (!strategyType || !strategyTypes[strategyType]) return "";
        return strategyTypes[strategyType].riskReward;
    };

    // Calculate P&L based on entry, exit, position size, and position type
    const calculatePnL = (entry, exit, positionSize, position) => {
        console.log('calculatePnL called with:', { entry, exit, positionSize, position });

        if (!entry || !exit || !positionSize || !position) {
            console.log('Missing required data for P&L calculation');
            return "";
        }

        const entryPrice = parseFloat(entry);
        const exitPrice = parseFloat(exit);

        // Extract shares from position size - handle the format "X shares ($Y)"
        let shares = 0;
        if (positionSize.includes('shares')) {
            const shareMatch = positionSize.match(/(\d+)\s+shares/);
            if (shareMatch) {
                shares = parseFloat(shareMatch[1]);
            }
        } else if (positionSize.includes('$')) {
            // If it's a dollar amount, calculate shares
            const dollarAmount = parseFloat(positionSize.replace(/[^0-9.]/g, ''));
            if (!isNaN(dollarAmount) && entryPrice > 0) {
                shares = Math.floor(dollarAmount / entryPrice);
            }
        } else {
            // If it's just a number, assume it's shares
            shares = parseFloat(positionSize.replace(/[^0-9.]/g, ''));
        }

        console.log('Extracted shares:', shares, 'Entry price:', entryPrice, 'Exit price:', exitPrice);

        if (isNaN(entryPrice) || isNaN(exitPrice) || isNaN(shares) || shares === 0) {
            console.log('Invalid data for P&L calculation');
            return "";
        }

        let pnl = 0;
        if (position === "long") {
            pnl = (exitPrice - entryPrice) * shares;
        } else {
            pnl = (entryPrice - exitPrice) * shares;
        }

        console.log('Calculated P&L:', pnl);
        return pnl.toFixed(4);
    };

    // Calculate percentage gain/loss
    const calculatePercentageChange = (entry, exit, position) => {
        if (!entry || !exit) return "";

        const entryPrice = parseFloat(entry);
        const exitPrice = parseFloat(exit);

        if (isNaN(entryPrice) || isNaN(exitPrice) || entryPrice === 0) return "";

        let percentage = 0;
        if (position === "long") {
            percentage = ((exitPrice - entryPrice) / entryPrice) * 100;
        } else {
            percentage = ((entryPrice - exitPrice) / entryPrice) * 100;
        }

        return percentage.toFixed(4);
    };

    // Calculate position size in dollars if shares are provided
    const calculatePositionSize = (shares, entryPrice) => {
        if (!shares || !entryPrice) return "";

        const numShares = parseFloat(shares.replace(/[^0-9.]/g, ''));
        const price = parseFloat(entryPrice);

        if (isNaN(numShares) || isNaN(price)) return "";

        return (numShares * price).toFixed(4);
    };

    // Calculate shares if position size in dollars is provided
    const calculateShares = (positionSize, entryPrice) => {
        if (!positionSize || !entryPrice) return "";

        const size = parseFloat(positionSize.replace(/[^0-9.]/g, ''));
        const price = parseFloat(entryPrice);

        if (isNaN(size) || isNaN(price) || price === 0) return "";

        return Math.floor(size / price);
    };

    // Recalculate P&L when position size, entry, or exit prices change
    const recalculatePnL = (formData) => {
        const newFormData = { ...formData };
        console.log('Recalculating P&L with:', {
            actualTarget: formData.actualTarget,
            actualStopLoss: formData.actualStopLoss,
            positionSize: formData.positionSize,
            position: formData.position,
            entry: formData.entry
        });

        if (formData.actualTarget && formData.positionSize && formData.position && formData.entry) {
            const pnl = calculatePnL(formData.entry, formData.actualTarget, formData.positionSize, formData.position);
            const percentage = calculatePercentageChange(formData.entry, formData.actualTarget, formData.position);
            console.log('Calculated P&L from target:', pnl, 'Percentage:', percentage);
            newFormData.pnl = pnl;
            newFormData.percentageChange = percentage;
        } else if (formData.actualStopLoss && formData.positionSize && formData.position && formData.entry) {
            const pnl = calculatePnL(formData.entry, formData.actualStopLoss, formData.positionSize, formData.position);
            const percentage = calculatePercentageChange(formData.entry, formData.actualStopLoss, formData.position);
            console.log('Calculated P&L from stop loss:', pnl, 'Percentage:', percentage);
            newFormData.pnl = pnl;
            newFormData.percentageChange = percentage;
        } else {
            console.log('Not enough data to calculate P&L');
        }

        return newFormData;
    };

    const handleEntryChange = (value) => {
        const newFormData = { ...formData, entry: value };
        console.log('Entry changed:', value, 'Risk/Reward:', formData.riskReward, 'Position:', formData.position);
        if (value && formData.riskReward) {
            const levels = calculateLevels(value, formData.riskReward, formData.position);
            console.log('Calculated levels:', levels);
            newFormData.calculatedStopLoss = levels.stopLoss;
            newFormData.calculatedTarget = levels.target;
            // Also populate expected fields with calculated values
            newFormData.expectedStopLoss = levels.stopLoss;
            newFormData.expectedTarget = levels.target;
        }
        setFormData(newFormData);

        // Recalculate P&L after entry price changes
        setTimeout(() => {
            const recalculatedFormData = recalculatePnL(newFormData);
            setFormData(recalculatedFormData);
        }, 100);
    };

    const handleRiskRewardChange = (value) => {
        const newFormData = { ...formData, riskReward: value };
        console.log('Risk/Reward changed:', value, 'Entry:', formData.entry, 'Position:', formData.position);
        if (formData.entry && value) {
            const levels = calculateLevels(formData.entry, value, formData.position);
            console.log('Calculated levels from R/R change:', levels);
            newFormData.calculatedStopLoss = levels.stopLoss;
            newFormData.calculatedTarget = levels.target;
            // Also populate expected fields with calculated values
            newFormData.expectedStopLoss = levels.stopLoss;
            newFormData.expectedTarget = levels.target;
        }
        setFormData(newFormData);
    };

    const handlePositionChange = (value) => {
        const newFormData = { ...formData, position: value };
        if (formData.entry && formData.riskReward) {
            const levels = calculateLevels(formData.entry, formData.riskReward, value);
            newFormData.calculatedStopLoss = levels.stopLoss;
            newFormData.calculatedTarget = levels.target;
            // Also populate expected fields with calculated values
            newFormData.expectedStopLoss = levels.stopLoss;
            newFormData.expectedTarget = levels.target;
        }
        setFormData(newFormData);
    };

    const handleStrategyTypeChange = (value) => {
        const newFormData = { ...formData, strategyType: value };
        console.log('Strategy changed:', value);
        if (value) {
            newFormData.expectedHoldTime = calculateExpectedHoldTime(value);
            newFormData.riskReward = calculateExpectedRiskReward(value);
            console.log('Auto-set risk/reward:', newFormData.riskReward);
            // Recalculate levels with new risk/reward
            if (formData.entry) {
                const levels = calculateLevels(formData.entry, newFormData.riskReward, formData.position);
                console.log('Calculated levels from strategy change:', levels);
                newFormData.calculatedStopLoss = levels.stopLoss;
                newFormData.calculatedTarget = levels.target;
                // Also populate expected fields with calculated values
                newFormData.expectedStopLoss = levels.stopLoss;
                newFormData.expectedTarget = levels.target;
            }
        }
        setFormData(newFormData);
    };

    // Auto-calculate P&L when actual target or stop loss is entered
    const handleActualTargetChange = (value) => {
        const newFormData = { ...formData, actualTarget: value };
        const updatedFormData = recalculatePnL(newFormData);
        console.log('Actual Target changed:', value, 'Updated P&L:', updatedFormData.pnl);
        setFormData(updatedFormData);
    };

    const handleActualStopLossChange = (value) => {
        const newFormData = { ...formData, actualStopLoss: value };
        const updatedFormData = recalculatePnL(newFormData);
        console.log('Actual Stop Loss changed:', value, 'Updated P&L:', updatedFormData.pnl);
        setFormData(updatedFormData);
    };

    // Handle position size input - allow free typing, auto-format on blur
    const handlePositionSizeChange = (value) => {
        // Always allow typing freely
        setFormData(prev => ({ ...prev, positionSize: value }));
    };

    // Format position size when user finishes typing (on blur)
    const handlePositionSizeBlur = () => {
        const value = formData.positionSize;

        if (!value || !formData.entry) return;

        let newPositionSize = value;

        // If it's just numbers, format as shares
        if (/^\d+$/.test(value)) {
            const dollarValue = calculatePositionSize(value, formData.entry);
            if (dollarValue) {
                newPositionSize = `${value} shares ($${dollarValue})`;
            }
        }
        // If it looks like dollars, calculate shares
        else if (value.includes('$') && !value.includes('shares')) {
            const shares = calculateShares(value, formData.entry);
            if (shares) {
                newPositionSize = `${shares} shares (${value})`;
            }
        }

        setFormData(prev => ({ ...prev, positionSize: newPositionSize }));

        // Recalculate P&L
        setTimeout(() => {
            const updatedFormData = { ...formData, positionSize: newPositionSize };
            const recalculatedFormData = recalculatePnL(updatedFormData);
            setFormData(recalculatedFormData);
        }, 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate P&L if we have actual target or stop loss
        let finalPnl = 0;
        if (formData.actualTarget && formData.positionSize && formData.entry) {
            finalPnl = calculatePnL(formData.entry, formData.actualTarget, formData.positionSize, formData.position);
        } else if (formData.actualStopLoss && formData.positionSize && formData.entry) {
            finalPnl = calculatePnL(formData.entry, formData.actualStopLoss, formData.positionSize, formData.position);
        }

        const tradeData = {
            id: editingId || Date.now(),
            ticker: formData.ticker.toUpperCase(),
            entry: parseFloat(formData.entry),
            position: formData.position,
            positionSize: formData.positionSize,
            riskReward: formData.riskReward,
            calculatedStopLoss: parseFloat(formData.calculatedStopLoss),
            calculatedTarget: parseFloat(formData.calculatedTarget),
            expectedStopLoss: formData.expectedStopLoss ? parseFloat(formData.expectedStopLoss) : null,
            expectedTarget: formData.expectedTarget ? parseFloat(formData.expectedTarget) : null,
            actualStopLoss: formData.actualStopLoss ? parseFloat(formData.actualStopLoss) : null,
            actualTarget: formData.actualTarget ? parseFloat(formData.actualTarget) : null,
            pnl: finalPnl,
            percentageChange: formData.percentageChange ? parseFloat(formData.percentageChange) : null,
            strategy: formData.strategyType,
            strategyName: formData.strategyType ? strategyTypes[formData.strategyType].name : "",
            marketCondition: formData.marketCondition,
            holdTime: formData.holdTime,
            expectedHoldTime: formData.expectedHoldTime,
            actualHoldTime: formData.actualHoldTime,
            tradeTags: formData.tradeTags,
            notes: formData.notes,
            date: formData.date,
            timestamp: new Date().toISOString()
        };

        if (editingId) {
            console.log('Updating trade with ID:', editingId, 'Data:', tradeData);
            onUpdateTrade(editingId, tradeData);
            handleCancel();

            // Show success notification for update
            setNotification({
                type: 'success',
                message: `🎯 Trade Updated! ${tradeData.ticker} at $${tradeData.entry}`,
                pnl: tradeData.pnl
            });

            // Auto-hide notification after 4 seconds
            setTimeout(() => setNotification(null), 4000);
        } else {
            onAddTrade(tradeData);
            // Keep form open for new trades, just reset the form
            setFormData({
                ticker: "",
                entry: "",
                position: "long",
                positionSize: "",
                riskReward: "",
                calculatedStopLoss: "",
                calculatedTarget: "",
                expectedStopLoss: "",
                expectedTarget: "",
                actualStopLoss: "",
                actualTarget: "",
                pnl: "",
                strategy: "",
                strategyType: "",
                marketCondition: "",
                holdTime: "",
                expectedHoldTime: "",
                actualHoldTime: "",
                tradeTags: [],
                notes: "",
                date: new Date().toISOString().split('T')[0],
            });
            setEditingId(null);
            // Keep the form visible
            setShowForm(true);

            // Show animated notification
            setNotification({
                type: 'success',
                message: `🚀 Trade Added! ${tradeData.ticker} at $${tradeData.entry}`,
                pnl: tradeData.pnl
            });

            // Auto-hide notification after 4 seconds
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleEdit = (trade) => {
        console.log('Editing trade:', trade);
        setEditingId(trade.id);
        setFormData({
            ticker: trade.ticker || "",
            entry: trade.entry?.toString() || "",
            position: trade.position || "long",
            positionSize: trade.positionSize || "",
            riskReward: trade.riskReward || "",
            calculatedStopLoss: trade.calculatedStopLoss?.toString() || "",
            calculatedTarget: trade.calculatedTarget?.toString() || "",
            expectedStopLoss: trade.expectedStopLoss?.toString() || "",
            expectedTarget: trade.expectedTarget?.toString() || "",
            actualStopLoss: trade.actualStopLoss?.toString() || "",
            actualTarget: trade.actualTarget?.toString() || "",
            pnl: trade.pnl?.toString() || "",
            percentageChange: trade.percentageChange?.toString() || "",
            strategy: trade.strategy || "",
            strategyType: trade.strategy || "",
            marketCondition: trade.marketCondition || "",
            holdTime: trade.holdTime || "",
            expectedHoldTime: trade.expectedHoldTime || "",
            actualHoldTime: trade.actualHoldTime || "",
            tradeTags: trade.tradeTags || [],
            notes: trade.notes || "",
            date: trade.date || new Date().toISOString().split('T')[0],
        });

        // Ensure the form is expanded when editing
        if (!isExpanded) {
            onToggle();
        }
    };

    const handleCancel = () => {
        console.log('Canceling edit, resetting form');
        setEditingId(null);
        setFormData({
            ticker: "",
            entry: "",
            position: "long",
            positionSize: "",
            riskReward: "",
            calculatedStopLoss: "",
            calculatedTarget: "",
            expectedStopLoss: "",
            expectedTarget: "",
            actualStopLoss: "",
            actualTarget: "",
            pnl: "",
            percentageChange: "",
            strategy: "",
            strategyType: "",
            marketCondition: "",
            holdTime: "",
            expectedHoldTime: "",
            actualHoldTime: "",
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

    // Check if form has enough data to activate portal style
    const isFormFilled = () => {
        const requiredFields = ['ticker', 'entry', 'position'];
        const optionalFields = ['actualTarget', 'actualStopLoss', 'pnl', 'notes', 'strategyType'];

        const requiredFilled = requiredFields.every(field => formData[field]);
        const optionalFilled = optionalFields.filter(field => formData[field]).length;

        return requiredFilled && optionalFilled >= 2; // At least 2 optional fields filled
    };

    // Check if a form group should show as filled
    const isFieldFilled = (fieldName) => {
        return formData[fieldName] && formData[fieldName] !== '';
    };

    return (
        <div className="card">
            <div className="card-header" onClick={onToggle}>
                <div className="header-content">
                    <Plus size={20} />
                    <span>{editingId ? 'Edit Trade' : 'Add New Trade'}</span>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {isExpanded && (
                <div className="card-content">
                    <div className="trade-entry">
                        <form onSubmit={handleSubmit} className={`trade-form ${isFormFilled() ? 'portal-style' : ''}`}>
                            <div className="form-section">
                                <h3>Basic Trade Info</h3>
                                <div className="form-row">
                                    <div className={`form-group ${isFieldFilled('ticker') ? 'filled' : ''}`}>
                                        <label>Ticker Symbol</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.ticker}
                                            onChange={(e) => setFormData(prev => ({ ...prev, ticker: e.target.value }))}
                                            placeholder="AAPL"
                                            required
                                        />
                                    </div>
                                    <div className={`form-group ${isFieldFilled('entry') ? 'filled' : ''}`}>
                                        <label>Entry Price</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="form-control"
                                            value={formData.entry}
                                            onChange={(e) => handleEntryChange(e.target.value)}
                                            placeholder="150.00 or 0.15 for penny stocks"
                                            required
                                            min="0"
                                            step="0.0001"
                                        />
                                        <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', marginTop: '4px' }}>
                                            Supports up to 4 decimal places for penny stocks
                                        </small>
                                    </div>
                                    <div className={`form-group ${isFieldFilled('position') ? 'filled' : ''}`}>
                                        <label>Position</label>
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
                            </div>

                            <div className="form-section">
                                <h3>Strategy Configuration</h3>
                                <div className="form-row">
                                    <div className={`form-group ${isFieldFilled('strategyType') ? 'filled' : ''}`}>
                                        <label>Strategy Type</label>
                                        <select
                                            className="form-control"
                                            value={formData.strategyType}
                                            onChange={(e) => handleStrategyTypeChange(e.target.value)}
                                        >
                                            <option value="">Select Strategy</option>
                                            {Object.entries(strategyTypes).map(([key, strategy]) => (
                                                <option key={key} value={key}>{strategy.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Risk/Reward Ratio</label>
                                        <select
                                            className="form-control"
                                            value={formData.riskReward}
                                            onChange={(e) => handleRiskRewardChange(e.target.value)}
                                        >
                                            <option value="">Select R/R</option>
                                            {riskRewardRatios.map(rr => (
                                                <option key={rr.value} value={rr.value}>{rr.label}</option>
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
                                </div>

                                {formData.strategyType && (
                                    <div className="strategy-info">
                                        <div className="strategy-description">
                                            <strong>{strategyTypes[formData.strategyType].name}:</strong> {strategyTypes[formData.strategyType].description}
                                        </div>
                                        <div className="strategy-params">
                                            <span>Expected Hold Time: {formData.expectedHoldTime}</span>
                                            <span>Expected R/R: {formData.riskReward}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-section">
                                <h3>Risk Management</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Calculated Stop Loss</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control calculated-field"
                                            value={formData.calculatedStopLoss}
                                            readOnly
                                            placeholder="Auto-calculated"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Expected Stop Loss (Auto-calculated)</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="form-control calculated-field"
                                            value={formData.expectedStopLoss}
                                            readOnly
                                            placeholder="Auto-calculated from entry and R/R"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Actual Stop Loss</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="form-control"
                                            value={formData.actualStopLoss}
                                            onChange={(e) => handleActualStopLossChange(e.target.value)}
                                            placeholder="Where you actually stopped"
                                            min="0"
                                            step="0.0001"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Calculated Target</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="form-control calculated-field"
                                            value={formData.calculatedTarget}
                                            readOnly
                                            placeholder="Auto-calculated"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Expected Target (Auto-calculated)</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="form-control calculated-field"
                                            value={formData.expectedTarget}
                                            readOnly
                                            placeholder="Auto-calculated from entry and R/R"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Actual Target</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="form-control"
                                            value={formData.actualTarget}
                                            onChange={(e) => handleActualTargetChange(e.target.value)}
                                            placeholder="Where you actually exited"
                                            min="0"
                                            step="0.0001"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Trade Execution</h3>
                                <div className="form-row">
                                    <div className={`form-group ${isFieldFilled('positionSize') ? 'filled' : ''}`}>
                                        <label>Position Size</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.positionSize}
                                            onChange={(e) => handlePositionSizeChange(e.target.value)}
                                            onBlur={handlePositionSizeBlur}
                                            placeholder="Enter shares (e.g., 2100) or dollars (e.g., $5000)"
                                        />
                                        <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', marginTop: '4px' }}>
                                            Type freely, will auto-format when you click away
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label>Strategy Hold Time</label>
                                        <input
                                            type="text"
                                            className="form-control calculated-field"
                                            value={formData.expectedHoldTime}
                                            readOnly
                                            placeholder="Based on strategy type"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Actual Hold Time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.actualHoldTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, actualHoldTime: e.target.value }))}
                                            placeholder="How long you held"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Net P&L (Auto-calculated)</label>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                className={`form-control calculated-field ${formData.pnl && parseFloat(formData.pnl) > 0 ? 'profit' : formData.pnl && parseFloat(formData.pnl) < 0 ? 'loss' : ''}`}
                                                value={formData.pnl ? `$${formData.pnl}` : ""}
                                                readOnly
                                                placeholder="Net profit/loss"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                style={{ padding: '8px 12px', fontSize: '12px' }}
                                                onClick={() => {
                                                    const recalculated = recalculatePnL(formData);
                                                    setFormData(recalculated);
                                                }}
                                                title="Recalculate P&L"
                                            >
                                                🔄
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>% Change (Auto-calculated)</label>
                                        <input
                                            type="text"
                                            className={`form-control calculated-field ${formData.percentageChange && parseFloat(formData.percentageChange) > 0 ? 'profit' : formData.percentageChange && parseFloat(formData.percentageChange) < 0 ? 'loss' : ''}`}
                                            value={formData.percentageChange ? `${formData.percentageChange}%` : ""}
                                            readOnly
                                            placeholder="Auto-calculated percentage"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Trade Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={formData.date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Trade Tags</h3>
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

                            <div className="form-section trade-notes-section">
                                <h3>Trade Notes</h3>
                                <textarea
                                    className="form-control"
                                    value={formData.notes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                    placeholder="What happened? What did you learn? What would you do differently?"
                                    rows="8"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    {editingId ? <Edit size={16} /> : <Plus size={16} />}
                                    {editingId ? 'Update Trade' : 'Add Trade'}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Trades List */}
            {trades.length > 0 && (
                <div className="trades-list">
                    <h3>📊 Recent Trades</h3>
                    <div className="trades-list">
                        {trades.map(trade => (
                            <div key={trade.id} className="trade-item">
                                <div className="trade-header">
                                    <div className="trade-ticker">{trade.ticker}</div>
                                    <div className={`trade-position ${trade.position}`}>
                                        {trade.position === 'long' ? '📈' : '📉'} {trade.position}
                                    </div>
                                </div>
                                <div className="trade-stats">
                                    <div className="trade-stat">
                                        <div className="trade-stat-label">Entry</div>
                                        <div className="trade-stat-value">${trade.entry}</div>
                                    </div>
                                    {trade.actualTarget && (
                                        <div className="trade-stat">
                                            <div className="trade-stat-label">Exit</div>
                                            <div className="trade-stat-value">${trade.actualTarget}</div>
                                        </div>
                                    )}
                                    {trade.pnl && (
                                        <div className="trade-stat">
                                            <div className="trade-stat-label">P&L</div>
                                            <div className={`trade-stat-value ${parseFloat(trade.pnl) > 0 ? 'profit' : 'loss'}`}>
                                                ${trade.pnl}
                                            </div>
                                        </div>
                                    )}
                                    {trade.positionSize && (
                                        <div className="trade-stat">
                                            <div className="trade-stat-label">Size</div>
                                            <div className="trade-stat-value">{trade.positionSize}</div>
                                        </div>
                                    )}
                                </div>
                                {trade.notes && (
                                    <div className="trade-notes">
                                        <div className="trade-notes-content">
                                            {trade.notes}
                                        </div>
                                    </div>
                                )}
                                <div className="trade-actions">
                                    <button
                                        className="btn-icon"
                                        onClick={() => {
                                            console.log('Edit button clicked for trade:', trade);
                                            handleEdit(trade);
                                        }}
                                        title="Edit Trade"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn-icon btn-danger"
                                        onClick={() => onDeleteTrade(trade.id)}
                                        title="Delete Trade"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Animated Notification */}
            {notification && (
                <div className={`notification notification-${notification.type}`}>
                    <div className="notification-content">
                        <CheckCircle className="notification-icon" />
                        <div className="notification-text">
                            <div className="notification-message">{notification.message}</div>
                            {notification.pnl && (
                                <div className={`notification-pnl ${parseFloat(notification.pnl) > 0 ? 'profit' : 'loss'}`}>
                                    P&L: ${notification.pnl}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="notification-progress"></div>
                </div>
            )}
        </div>
    );
}

export default TradeEntry; 