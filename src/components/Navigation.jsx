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
                   path: "/upload",
                   label: "Upload",
                   icon: Upload,
                   description: "Backup & restore journal data"
               }
    ];

    return (
        <nav className="navigation">
            <div className="nav-container">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <div className="nav-icon">
                                <Icon size={20} />
                            </div>
                            <div className="nav-content">
                                <div className="nav-label">{item.label}</div>
                                <div className="nav-description">{item.description}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default Navigation; 