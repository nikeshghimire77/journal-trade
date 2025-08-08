import React, { useState } from "react";
import { ChevronDown, ChevronUp, Save, CheckCircle, Clock } from "lucide-react";

function PostTradeReflection({ data, onUpdate, isExpanded, onToggle }) {
    const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved'

    const handleChange = (field, value) => {
        onUpdate({ ...data, [field]: value });
        // Auto-save with visual feedback
        setSaveStatus('saving');
        setTimeout(() => setSaveStatus('saved'), 1000);
        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    const handleSave = () => {
        setSaveStatus('saving');
        // Simulate save operation
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 500);
    };

    const emotions = [
        { emoji: "😊", value: "happy", label: "Happy" },
        { emoji: "😐", value: "neutral", label: "Neutral" },
        { emoji: "😤", value: "frustrated", label: "Frustrated" },
        { emoji: "😰", value: "anxious", label: "Anxious" },
        { emoji: "😡", value: "angry", label: "Angry" },
    ];

    return (
        <div className="card">
            <div className="card-header" onClick={onToggle}>
                <h2>Post-Trade Reflection</h2>
                {isExpanded ? <ChevronUp className="collapse-icon" /> : <ChevronDown className="collapse-icon" />}
            </div>

            {isExpanded && (
                <div className="card-content">
                    <div className="grid grid-2">
                        <div className="form-group">
                            <label>Did I follow my plan?</label>
                            <select
                                className="form-control"
                                value={data.followedPlan || ""}
                                onChange={(e) => handleChange("followedPlan", e.target.value)}
                            >
                                <option value="">Select answer</option>
                                <option value="yes">Yes</option>
                                <option value="partially">Partially</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>What did I do well?</label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.didWell || ""}
                                onChange={(e) => handleChange("didWell", e.target.value)}
                                placeholder="e.g., Stuck to stop loss"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Biggest mistake today?</label>
                        <textarea
                            className="form-control"
                            value={data.mistakes || ""}
                            onChange={(e) => handleChange("mistakes", e.target.value)}
                            placeholder="What could I have done better?"
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label>How am I feeling?</label>
                        <div className="emoji-selector">
                            {emotions.map((emotion) => (
                                <button
                                    key={emotion.value}
                                    type="button"
                                    className={`emoji-option ${data.emotion === emotion.value ? "selected" : ""}`}
                                    onClick={() => handleChange("emotion", emotion.value)}
                                >
                                    {emotion.emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tomorrow's focus</label>
                        <input
                            type="text"
                            className="form-control"
                            value={data.tomorrowPlan || ""}
                            onChange={(e) => handleChange("tomorrowPlan", e.target.value)}
                            placeholder="e.g., Focus on risk management"
                        />
                    </div>

                    <div className="reflection-actions">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            <Save size={16} />
                            Save Reflection
                        </button>
                    </div>

                    {saveStatus !== 'idle' && (
                        <div className={`save-indicator ${saveStatus}`}>
                            {saveStatus === 'saving' ? (
                                <>
                                    <Clock size={16} />
                                    💾 Auto-saving...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={16} />
                                    ✅ Reflection saved!
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostTradeReflection; 