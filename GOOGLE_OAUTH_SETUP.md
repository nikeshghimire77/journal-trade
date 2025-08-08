# Google OAuth Setup Guide

## Option 1: Google OAuth (Recommended)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API

### Step 2: Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: "Trading Journal"
   - User support email: Your email
   - Developer contact information: Your email

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (for production)
   - `http://localhost:8080` (for Docker)
5. Copy the Client ID

### Step 4: Update the Code
Replace `YOUR_GOOGLE_CLIENT_ID` in `src/pages/SignUp.jsx` with your actual Client ID:

```javascript
client_id: 'your-actual-client-id-here.apps.googleusercontent.com',
```

## Option 2: Simple Email/Name Input (No OAuth)

If you prefer a simpler approach without Google OAuth, you can modify the sign-up page to use a simple form:

```javascript
// In SignUp.jsx, replace the Google OAuth with:
const handleSimpleSignUp = () => {
  const userInfo = {
    email: 'user@example.com', // or get from form input
    name: 'Trading User',
    picture: null,
    signedIn: true,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  navigate('/journal');
};
```

## Option 3: Guest Access (Current Implementation)

The current implementation already includes guest access - users can start journaling immediately without any authentication.

## Benefits of Each Approach

### Google OAuth
✅ **Pros:**
- Professional and secure
- No password management
- User data persistence across devices
- Trusted by users

❌ **Cons:**
- Requires Google Cloud setup
- More complex implementation

### Simple Form
✅ **Pros:**
- Easy to implement
- No external dependencies
- Full control over user data

❌ **Cons:**
- Users need to remember credentials
- Less secure
- More friction for users

### Guest Access
✅ **Pros:**
- Zero friction
- Immediate access
- No setup required

❌ **Cons:**
- No data persistence across devices
- Limited user experience
- No personalization

## Recommendation

For a trading journal app, I recommend starting with **Guest Access** (current implementation) and optionally adding **Google OAuth** for users who want data persistence.

This gives users the best of both worlds:
- Quick start for casual users
- Professional sign-in for serious traders 