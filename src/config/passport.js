const ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;

const prisma = require("./prisma-client")

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
    });
    if (user) {
        return done(null, user);
    }
    return done(null, false);
})


module.exports = (passport) => {
    passport.use(jwtStrategy);
};