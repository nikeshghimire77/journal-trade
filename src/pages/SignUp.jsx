import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Upload, TrendingUp } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize Google OAuth
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        };

        loadGoogleScript();
    }, []);

    const handleGoogleSignIn = () => {
        // Google OAuth flow
        window.google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID', // You'll need to get this from Google Cloud Console
            callback: handleCredentialResponse
        });

        window.google.accounts.id.prompt();
    };

    const handleCredentialResponse = (response) => {
        // Handle the Google sign-in response
        console.log('Google Sign-In successful:', response);

        // Store user info in localStorage (or your preferred storage)
        const userInfo = {
            email: response.email,
            name: response.name,
            picture: response.picture,
            signedIn: true,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // Redirect to journal
        navigate('/journal');
    };

    const handleGuestAccess = () => {
        // Allow users to use the app without signing up
        const guestInfo = {
            email: 'guest@tradingjournal.com',
            name: 'Guest User',
            picture: null,
            signedIn: false,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('userInfo', JSON.stringify(guestInfo));
        navigate('/journal');
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <div className="signup-header">
                    <div className="custom-logo">
                        <svg width="50" height="50" viewBox="0 0 50 50">
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <circle cx="25" cy="25" r="20" fill="url(#logoGradient)" />
                            <path d="M15 20 L25 30 L35 15" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
                            <text x="25" y="22" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" filter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))">NG</text>
                            <circle cx="15" cy="25" r="1.5" fill="#10b981" />
                            <circle cx="35" cy="25" r="1.5" fill="#10b981" />
                        </svg>
                    </div>
                    <h1>Welcome to Trading Journal</h1>
                    <p>Start your trading journey with precision and insight</p>
                </div>

                <div className="signup-options">
                    <div className="signup-card">
                        <h3>Sign in with Google</h3>
                        <p>Secure, fast, and no passwords to remember</p>
                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleGoogleSignIn}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    <div className="signup-divider">
                        <span>or</span>
                    </div>

                    <div className="signup-card">
                        <h3>Try as Guest</h3>
                        <p>Start journaling immediately - no account required</p>
                        <button
                            className="btn btn-secondary btn-large"
                            onClick={handleGuestAccess}
                        >
                            <BookOpen size={20} />
                            Start Journaling Now
                        </button>
                    </div>
                </div>

                <div className="signup-features">
                    <div className="feature">
                        <TrendingUp size={24} />
                        <h4>Track Performance</h4>
                        <p>Monitor your trading patterns and improve your strategy</p>
                    </div>
                    <div className="feature">
                        <BookOpen size={24} />
                        <h4>Daily Reflections</h4>
                        <p>Record your thoughts and learn from every trade</p>
                    </div>
                    <div className="feature">
                        <Upload size={24} />
                        <h4>Data Backup</h4>
                        <p>Export and import your journal data anytime</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp; 