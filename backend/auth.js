const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Local Strategy for username and password authentication
passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' }, // Specify email and password fields
        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                if (!user) {
                    console.log('Incorrect email');
                    return done(null, false, { message: 'Incorrect email' });
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    console.log('Incorrect password');
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            } catch (err) {
                console.error('Error during authentication:', err);
                return done(err);
            }
        }
    )
);

// JWT Strategy for token-based authentication
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret',
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { id: jwt_payload.id } });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;