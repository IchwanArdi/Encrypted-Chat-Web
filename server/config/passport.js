// ======== PASSPORT CONFIGURATION ========
// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Helper function (same as above)
const findOrCreateUser = async (profile, provider) => {
  try {
    let user = await User.findOne({ [`auth.${provider}.id`]: profile.id });

    if (user) {
      user.lastLoginAt = new Date();
      await user.save();
      return user;
    }

    if (profile.emails && profile.emails[0]) {
      user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        user.auth[provider] = {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0]?.value,
        };

        if (!user.authMethods.includes(provider)) {
          user.authMethods.push(provider);
        }

        user.lastLoginAt = new Date();
        await user.save();
        return user;
      }
    }

    const newUser = new User({
      email: profile.emails?.[0]?.value,
      profile: {
        displayName: profile.displayName,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        avatar: profile.photos?.[0]?.value,
      },
      auth: {
        [provider]: {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          picture: profile.photos?.[0]?.value,
        },
      },
      authMethods: [provider],
      lastLoginAt: new Date(),
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw error;
  }
};

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile, 'google');
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'name', 'emails', 'photos'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile, 'facebook');
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize/Deserialize User
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
