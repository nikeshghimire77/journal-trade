import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Upload, BarChart3, TrendingUp, Target, Shield, Zap } from "lucide-react";

function LandingPage() {
    const features = [
        {
            icon: BookOpen,
            title: "Smart Trade Tracking",
            description: "Log every trade with AI-powered insights and automatic pattern detection",
            color: "#4f46e5"
        },
        {
            icon: Upload,
            title: "Data Backup & Restore",
            description: "Export your journal as CSV and restore it anytime, anywhere",
            color: "#10b981"
        },
        {
            icon: BarChart3,
            title: "Pattern Recognition",
            description: "Discover your winning strategies and eliminate losing patterns automatically",
            color: "#f59e0b"
        },
        {
            icon: TrendingUp,
            title: "Performance Analytics",
            description: "Track win rate, P&L, risk metrics, and optimize your trading edge",
            color: "#ef4444"
        },
        {
            icon: Target,
            title: "Risk Management",
            description: "Analyze position sizing, drawdowns, and build bulletproof risk strategies",
            color: "#8b5cf6"
        },
        {
            icon: Shield,
            title: "Military-Grade Privacy",
            description: "Your data never leaves your device - complete control and security",
            color: "#06b6d4"
        }
    ];

    const stats = [
        { label: "Unlimited Trades", value: "∞" },
        { label: "Real-time Analysis", value: "Live" },
        { label: "Pattern Recognition", value: "AI" },
        { label: "100% Private", value: "Secure" }
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                {/* Twinkling Stars */}
                <div className="stars-container">
                    <div className="star star-1"></div>
                    <div className="star star-2"></div>
                    <div className="star star-3"></div>
                    <div className="star star-4"></div>
                    <div className="star star-5"></div>
                    <div className="star star-6"></div>
                    <div className="star star-7"></div>
                    <div className="star star-8"></div>
                    <div className="star star-9"></div>
                    <div className="star star-10"></div>
                    <div className="star star-11"></div>
                    <div className="star star-12"></div>
                    <div className="star star-13"></div>
                    <div className="star star-14"></div>
                    <div className="star star-15"></div>
                    <div className="star star-16"></div>
                    <div className="star star-17"></div>
                    <div className="star star-18"></div>
                    <div className="star star-19"></div>
                    <div className="star star-20"></div>
                </div>

                {/* Falling Stars */}
                <div className="falling-stars">
                    <div className="falling-star falling-star-1"></div>
                    <div className="falling-star falling-star-2"></div>
                    <div className="falling-star falling-star-3"></div>
                    <div className="falling-star falling-star-4"></div>
                    <div className="falling-star falling-star-5"></div>
                    <div className="falling-star falling-star-6"></div>
                    <div className="falling-star falling-star-7"></div>
                    <div className="falling-star falling-star-8"></div>
                    <div className="falling-star falling-star-9"></div>
                    <div className="falling-star falling-star-10"></div>
                    <div className="falling-star falling-star-11"></div>
                    <div className="falling-star falling-star-12"></div>
                    <div className="falling-star falling-star-13"></div>
                    <div className="falling-star falling-star-14"></div>
                    <div className="falling-star falling-star-15"></div>
                    <div className="falling-star falling-star-9"></div>
                    <div className="falling-star falling-star-10"></div>
                    <div className="falling-star falling-star-11"></div>
                    <div className="falling-star falling-star-12"></div>
                    <div className="falling-star falling-star-13"></div>
                    <div className="falling-star falling-star-14"></div>
                    <div className="falling-star falling-star-15"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Master Your Trading Game
                            </h1>
                            <p className="hero-subtitle">
                                Transform your trading from guesswork to precision! Track every trade, uncover hidden patterns, and build a winning strategy. Whether you're a day trader or long-term investor, turn your journal into your secret weapon for market domination.
                            </p>
                            <div className="hero-actions">
                                <div className="cta-buttons-container">
                                    <Link to="/signup" className="primary-cta-btn">
                                        <div className="btn-bg-gradient"></div>
                                        <div className="btn-content">
                                            <div className="btn-icon-wrapper">
                                                <BookOpen size={24} />
                                                <div className="icon-ripple"></div>
                                            </div>
                                            <div className="btn-text-content">
                                                <span className="btn-main-text">Start Journal</span>
                                                <span className="btn-sub-text">Begin trading</span>
                                            </div>
                                            <div className="btn-arrow">→</div>
                                        </div>
                                        <div className="btn-shine"></div>
                                    </Link>

                                    <Link to="/upload" className="secondary-cta-btn">
                                        <div className="btn-bg-gradient"></div>
                                        <div className="btn-content">
                                            <div className="btn-icon-wrapper">
                                                <Upload size={24} />
                                                <div className="icon-ripple"></div>
                                            </div>
                                            <div className="btn-text-content">
                                                <span className="btn-main-text">Import Data</span>
                                                <span className="btn-sub-text">Upload trades</span>
                                            </div>
                                            <div className="btn-arrow">→</div>
                                        </div>
                                        <div className="btn-shine"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="hero-card">
                                <div className="card-header">
                                    <h3>📊 Daily Summary</h3>
                                </div>
                                <div className="card-content">
                                    <div className="stat-row">
                                        <div className="stat">
                                            <span className="stat-value">12</span>
                                            <span className="stat-label">Trades</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-value">+$2,450</span>
                                            <span className="stat-label">P&L</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-value">75%</span>
                                            <span className="stat-label">Win Rate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bullish Candlestick Chart */}
                            <div className="trading-chart">
                                <div className="chart-container">
                                    <div className="candlestick-chart">
                                        {/* Green Bullish Candles */}
                                        <div className="candlestick bullish" style={{ height: '40%', bottom: '30%', animationDelay: '0s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '60%', bottom: '25%', animationDelay: '0.2s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bearish" style={{ height: '30%', bottom: '45%', animationDelay: '0.4s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '80%', bottom: '15%', animationDelay: '0.6s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '70%', bottom: '20%', animationDelay: '0.8s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '50%', bottom: '30%', animationDelay: '1s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '90%', bottom: '10%', animationDelay: '1.2s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bearish" style={{ height: '20%', bottom: '50%', animationDelay: '1.4s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '85%', bottom: '12%', animationDelay: '1.6s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '75%', bottom: '18%', animationDelay: '1.8s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '95%', bottom: '8%', animationDelay: '2s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                        <div className="candlestick bullish" style={{ height: '100%', bottom: '5%', animationDelay: '2.2s' }}>
                                            <div className="candle-wick"></div>
                                            <div className="candle-body"></div>
                                        </div>
                                    </div>
                                    <div className="trend-line"></div>
                                    <div className="price-indicator">
                                        <span className="current-price">$1,247.85</span>
                                        <span className="price-change">+24.56% 🚀</span>
                                    </div>
                                    <div className="chart-grid">
                                        <div className="grid-line"></div>
                                        <div className="grid-line"></div>
                                        <div className="grid-line"></div>
                                        <div className="grid-line"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Your Trading Arsenal</h2>
                        <p>Powerful tools that turn every trader into a market master</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="feature-card">
                                    <div className="feature-icon" style={{ backgroundColor: `${feature.color}20` }}>
                                        <Icon size={24} color={feature.color} />
                                    </div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Dominate the Markets?</h2>
                        <p>Join thousands of traders who've transformed their performance with intelligent journaling. Your path to trading mastery starts here!</p>
                        <div className="cta-actions">
                            <Link to="/journal" className="btn btn-primary btn-large">
                                <Zap size={20} />
                                Start Trading Like a Pro
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage; 