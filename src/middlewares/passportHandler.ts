import passport from "passport";
import passportJwt from "passport-jwt";
import { config } from "../config/config";
import { userService } from "../services";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_KEY
  }, async (jwtToken, done) => {
   const user = await userService.findUser(jwtToken?.email);
   if (!user) {
     return done(null, false);
   }
   return done(null, user, jwtToken);
  }
));
