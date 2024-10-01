// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'your_jwt_secret', 
// };

// module.exports = (passport) => {
//     passport.use(
//         new JwtStrategy(opts, async (jwt_payload, done) => {
//             try {
//                 const user = await prisma.user.findUnique({
//                     where: {
//                         id: jwt_payload.id,
//                     },
//                 });
//                 if (user) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false);
//                 }
//             } catch (err) {
//                 console.error('Error during JWT authentication:', err);
//                 return done(err, false);
//             }
//         })
//     );
// };