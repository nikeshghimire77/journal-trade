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
                </div>

                {/* Falling Stars */}
                <div className="falling-stars">
                    <div className="falling-star falling-star-1"></div>
                    <div className="falling-star falling-star-2"></div>
                    <div className="falling-star falling-star-3"></div>
                    <div className="falling-star falling-star-4"></div>
                    <div className="falling-star falling-star-5"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-logo">
                            <svg width="80" height="80" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Master Your Trading Game
                            </h1>
                            <p className="hero-subtitle">
                                Transform your trading from guesswork to precision! Track every trade, uncover hidden patterns, and build a winning strategy. Whether you're a day trader or long-term investor, turn your journal into your secret weapon for market domination.
                            </p>
                            <div className="hero-actions">
                                <div className="action-buttons">
                                    <Link to="/signup" className="btn btn-primary btn-large">
                                        <BookOpen size={20} />
                                        <span>Get Started</span>
                                    </Link>
                                    <Link to="/upload" className="btn btn-secondary btn-large">
                                        <Upload size={20} />
                                        <span>Restore Your Data</span>
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

                            {/* Mind-Blowing Animated Trading Chart */}
                            <div className="trading-chart">
                                <div className="chart-container">
                                    <div className="price-line"></div>
                                    <div className="volume-bars">
                                        <div className="volume-bar" style={{ height: '60%', animationDelay: '0s' }}></div>
                                        <div className="volume-bar" style={{ height: '80%', animationDelay: '0.1s' }}></div>
                                        <div className="volume-bar" style={{ height: '40%', animationDelay: '0.2s' }}></div>
                                        <div className="volume-bar" style={{ height: '90%', animationDelay: '0.3s' }}></div>
                                        <div className="volume-bar" style={{ height: '70%', animationDelay: '0.4s' }}></div>
                                        <div className="volume-bar" style={{ height: '50%', animationDelay: '0.5s' }}></div>
                                        <div className="volume-bar" style={{ height: '85%', animationDelay: '0.6s' }}></div>
                                        <div className="volume-bar" style={{ height: '30%', animationDelay: '0.7s' }}></div>
                                        <div className="volume-bar" style={{ height: '75%', animationDelay: '0.8s' }}></div>
                                        <div className="volume-bar" style={{ height: '45%', animationDelay: '0.9s' }}></div>
                                        <div className="volume-bar" style={{ height: '95%', animationDelay: '1s' }}></div>
                                        <div className="volume-bar" style={{ height: '65%', animationDelay: '1.1s' }}></div>
                                        <div className="volume-bar" style={{ height: '55%', animationDelay: '1.2s' }}></div>
                                        <div className="volume-bar" style={{ height: '80%', animationDelay: '1.3s' }}></div>
                                        <div className="volume-bar" style={{ height: '35%', animationDelay: '1.4s' }}></div>
                                    </div>
                                    <div className="trade-signal"></div>
                                    <div className="price-indicator">
                                        <span className="current-price">$1,247.85</span>
                                        <span className="price-change">+2.34%</span>
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