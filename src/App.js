import React, { useState } from 'react';
import './App.css';

function GoalEvaluation() {
    const [target, setTarget] = useState('');
    const [evaluation, setEvaluation] = useState('');
    const [aiEvaluation, setAiEvaluation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setAiEvaluation('');

        try {
            const response = await fetch('http://localhost:3001/evaluate-goal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ target, evaluation }),
            });

            const data = await response.json();

            if (response.ok) {
                setAiEvaluation(data.aiEvaluation);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to get AI evaluation');
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className="goal-evaluation-container">
            <h1 className="title">AI Goal Evaluation</h1>
            <form onSubmit={handleSubmit} className="evaluation-form">
                <div className="input-group">
                    <label className="input-label">
                        Target or Goal:
                        <input
                            type="text"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            required
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="input-group">
                    <label className="input-label">
                        Evaluation:
                        <textarea
                            value={evaluation}
                            onChange={(e) => setEvaluation(e.target.value)}
                            required
                            className="textarea-field"
                        />
                    </label>
                </div>
                <div className="button-container">
                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? 'Evaluating...' : 'Evaluate'}
                    </button>
                </div>
            </form>

            {error && <p className="error-message">{error}</p>}
            {aiEvaluation && (
                <div className="ai-evaluation-container">
                    <h3>AI Evaluation:</h3>
                    <p>{aiEvaluation}</p>
                </div>
            )}
        </div>
    );
}

export default GoalEvaluation;
