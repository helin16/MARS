var LocalStrategy   = require('passport-local').Strategy;
var CasStrategy     = require('passport-cas').Strategy;
var User            = require('../models/user');
// var ldap            = require('../services/ldapClient.js');

// var url             = require('url');

// expose this function to our app using module.exports
module.exports = function(passport, options) {

  // Serialize/Deserialize for persistent log-in sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Register a local user
  passport.use('local-register', new LocalStrategy(
    {
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, username, password, done) {

      // console.log('registering1');
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        // console.log('registering2');
        // Check if user already exits
        User.findOne({ 'username' :  username }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, false, { message: 'That username is already taken.' });
          } else {
            var newUser      = new User();
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });    
      });
    }
  ));

  // Local user sign in
  passport.use('local-login', new LocalStrategy(
    {
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
    },
    // callback with username and password from client side form
    function(req, username, password, done) {

      User.findOne({ 'username' :  username })
      .then( function(user) {
        if (!user)
          return done(null, false, { message: 'Incorrect username.' });
        if (!user.validPassword(password))
          return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
      })
      .catch( function(error) {
        return done(error);
      });
    }
  ));

  // console.log('cas callback set base '+url.format(options)+'. If this is not OK, set up a serverConfig.json file in kusema/Server');
  // // Monash authcate user sign in (and register if new)
  // passport.use('monash-login', new CasStrategy(
  //     {
  //       version: 'CAS3.0',
  //       ssoBaseURL: 'https://my.monash.edu.au/authentication/cas',
  //       serverBaseURL: url.format(options),
  //       validateURL: '/serviceValidate'
  //     },
  //     // callback with authcate username from Monash CAS server
  //     function(authcate, done) {
  //         User
  //         .findOne({ 'authcate' :  authcate.user })
  //         .then( function(user) {

  //             if (!user) {
  //                 console.log('new user');
  //                 user = new User();
  //             } else {
  //                 console.log('got user');
  //             }

  //             user
  //             .configureFromAuthcate(authcate.user)
  //             .then( function(configuredUser) {
  //                 console.log('finished ldap');
  //                 return configuredUser.save();
  //             })
  //             .then( function(savedUser) {
  //                 console.log('finished saving');
  //                 return done(null, savedUser)
  //             })
  //             .catch( function(error) {
  //                 console.error('error getting the user from LDAP and saving');
  //                 console.error(error);
  //                 console.error(error.stack);
  //                 done(error);
  //             });

  //     })
  //     .catch( function(error) {
  //         console.error(error);
  //         done(error);
  //     });
  // }));


};
