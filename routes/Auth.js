const https = require('https');
const passport = require('passport');
const router = require('express').Router();
const LocalStrategy = require('passport-local').Strategy;


const secrets = require('../secrets');
const Users = require('../models/Users');


router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  }));


passport
  .serializeUser((user, done) => done(null, user.id));


passport
  .deserializeUser((id, done) => Users.findById(id, done));


const createPrismUser = (username, token, prismUser, done) => {
  const User = new Users();
  User.prism.id = prismUser.Id;
  User.prism.username = username;
  User.prism.accessToken = token;
  User.prism.email = prismUser.Mail;
  User.prism.skype = prismUser.Skype;
  User.prism.phone = prismUser.Telephone;
  User.prism.room = prismUser.Dislocation;
  User.prism.name.last = prismUser.LastName;
  User.prism.name.first = prismUser.FirstName;
  User.prism.image = `https://prism.akvelon.net:8441/api/system/getphoto/${prismUser.Id}`;
  User.save((err) => {
    if (err) return done(err);
    done(err, User);
  });
}


const buildHTTPSPrismOptions = (isLoggedIn, data) => {
  return {
    port: 8441,
    hostname: 'prism.akvelon.net',
    path: `/api/system/${isLoggedIn ? 'loggedinfo' : 'signin'}`,
    headers: isLoggedIn
      ? {
        'Cookie': `PRISMCookie=${data.token}`
      }
      : {
        'Authorization': `Basic ${Buffer.from(encodeURIComponent(JSON.stringify({
          persistent: true,
          password: data.password,
          username: data.username,
        }))).toString('base64')}`,
      },
  }
};

const makePrismQuery = (isLoggedIn, data, done, cb) => {
  https.get(buildHTTPSPrismOptions(isLoggedIn, data), (res) => {
    let data = '';
    res
      .on('data', (chunk) => data += chunk)
      .on('error', done)
      .on('end', () => cb(data))
  });
};

passport.use(new LocalStrategy((username, password, done) => {
  makePrismQuery(false, {
    username,
    password,
  }, done, (data) => {
    try {
      const token = JSON.parse(data).Token;
      Users.findOne({
        'prism.username': username,
      }, (err, User) => {
        if (err) return done(err);
        if (User) {
          return done(err, User);
        } else {
          makePrismQuery(true, { token }, done, (data) => {
            try {
              const prismUser = JSON.parse(data);
              createPrismUser(username, token, prismUser, done);
            } catch (error) {
              return done(error);
            }
          });
        }
      });
    } catch (error) {
      return done(error);
    }
  })
}));


module.exports = {
  router,
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).send('Unathorized');
  },
  ensureUserIsHR: (req, res, next) => {
    if (req.user && secrets.HR_EMAILS.includes(req.user.email)) return next();
    res.status(403).send('Forbidden');
  },
  ensureUserIsAdministartor: (req, res, next) => {
    if (req.user && secrets.ADMIN_EMAILS.includes(req.user.email)) return next();
    res.status(403).send('Forbidden');
  },
};
