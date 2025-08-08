import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Upload, BarChart3, Settings } from "lucide-react";

function Navigation() {
    const location = useLocation();

    const navItems = [
        {
            path: "/",
            label: "Home",
            icon: BookOpen,
            description: "Landing page"
        },
        {
            path: "/journal",
            label: "Journal",
            icon: BookOpen,
            description: "Add and manage your trades"
        },
        {
            path: "/analytics",
            label: "Analytics",
            icon: BarChart3,
            description: "Strategy performance analysis"
        },
        {
            path: "/upload",
            label: "Upload",
            icon: Upload,
            description: "Backup & restore journal data"
        }
    ];

    return (
        <nav className="navigation">
            <div className="nav-holographic-container">
                <div className="nav-scan-lines"></div>
                <div className="nav-grid-background"></div>
                <div className="nav-energy-field"></div>
                
                <div className="nav-brand">
                    <div className="brand-logo">
                        <div className="logo-orbit"></div>
                        <div className="logo-core">NG</div>
                        <div className="logo-pulse"></div>
                    </div>
                    <span className="brand-text">Trading Terminal</span>
                </div>

                <div className="nav-items-container">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-holo-item ${isActive ? 'active' : ''}`}
                            >
                                <div className="holo-item-glow"></div>
                                <div className="holo-item-content">
                                    <div className="holo-icon-container">
                                        <div className="icon-hologram">
                                            <Icon size={18} />
                                            <div className="icon-scan"></div>
                                        </div>
                                        <div className="icon-particles">
                                            <div className="particle"></div>
                                            <div className="particle"></div>
                                            <div className="particle"></div>
                                        </div>
                                    </div>
                                    <div className="holo-text">
                                        <span className="holo-label">{item.label}</span>
                                        <span className="holo-status">
                                            {isActive ? 'ACTIVE' : 'STANDBY'}
                                        </span>
                                    </div>
                                </div>
                                <div className="holo-item-border"></div>
                                <div className="connection-line"></div>
                            </Link>
                        );
                    })}
                </div>

                <div className="nav-status-panel">
                    <div className="status-indicator active"></div>
                    <span className="status-text">SYSTEM ONLINE</span>
                    <div className="power-level">
                        <div className="power-bar"></div>
                        <div className="power-bar"></div>
                        <div className="power-bar"></div>
                        <div className="power-bar"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation; 