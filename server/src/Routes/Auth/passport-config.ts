import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import googleAuthCredentials from './googleAuthCredentials.json';

const app = express();

//Session key generator

import crypto from 'crypto';

// Generate a secure random string of a specified length
function generateSessionKey(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

const sessionSecretKey = generateSessionKey();
console.log('Generated Session Secret Key:', sessionSecretKey);


// Initialize Passport and Session
app.use(session({
    secret: sessionSecretKey,
    resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth configuration
const GOOGLE_CLIENT_ID = googleAuthCredentials.web.client_id;
const GOOGLE_CLIENT_SECRET = googleAuthCredentials.web.client_secret;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        // Here you can save or fetch user data from the profile object
        return done(null, profile);
    }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    // Serialize user data to session
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // Fetch user data from session
    done(null, user);
});
