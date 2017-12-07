// Dependencies
//===============================
const express = require('express');
const app = express();
const router = express.Router();
const cheerio = require("cheerio");
const request = require('request');
const jwt = require('jwt-simple');
const passport = require("../config/passport-route.js");
const Hero = require('../models/hero.js');
const User = require('../models/user.js');
const Room = require('../models/room.js');

const JWT_SECRET = 'projectgambit';

//Checks to see if users gamertag exist on masteroverwatch
router.route('/check/:platform/:region/:gamertag').get(function(req, res) {
  request(`https://masteroverwatch.com/profile/${req.params.platform}/${req.params.region}/${req.params.gamertag}`, function(err, response, html) {
    if (err) {
      console.log(err);
    }else if (response.statusCode == 404) {
      console.log('statusCode:', response && response.statusCode);
    }else {
      res.send('Account Found!');
    }
  })
});

//Registers Users and scrapes their heroes, then inputs them into the db
router.route('/register').post(function(req, res) {
  
  req.check('email', 'Invalid Email Address').isEmail();
  req.check('password', 'Password is Invalid').isLength({min: 4}).equals(req.body.confirmpassword)
  
  var errors = req.validationErrors();

  if (errors) {
    res.send(errors);
  }else {
    var userEntry = new User(req.body);
  
    userEntry.password = userEntry.generateHash(req.body.password);

    userEntry.save(function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        console.log(doc);
        request(`https://masteroverwatch.com/profile/${doc.platform}/${doc.region}/${doc.gamerTag}`, function(err, response, html) {
          const $ = cheerio.load(html);

           // if ($('ul.player-navigation-extras').children('li.navigation-toggle').children('div:nth-child(1)').children('a').attr('class') == 'toggle-button btn btn-default is-active') {
        //   console.log('its active')
        //   app.post('http://masteroverwatch.com/profile/mode/toggle', {
        //     mode: 'ranked'
        //   }).then(function(req, res) {
        //     console.log(posted);
        //   })
        // }else {
        //   console.log('worked');
        // }

          function replaceNan(data) {
            if (isNaN(data)) {
              return 0;
            }else {
              return data;
            }
          };

          // Scrape Lifetime Stats
          const userResults = {}; 

          const lifetimeStats = $('div.data-overall').children('div:nth-child(2)');

          userResults.gamesPlayed = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.wins = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.eliminations = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.deaths = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.kdr = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(3)').children('div:nth-child(2)').children().first().text()));
          userResults.accuracy = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(4)').children('div:nth-child(2)').children().first().text().replace('%', '')));
          userResults.damage = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(5)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.healing = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(7)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.level = $('div.header-avatar').children('span').text();
          userResults.skillRating = parseFloat($('div.header-stat').children('strong').text().replace(/,/g,''));

          User.findOneAndUpdate({
            '_id': doc._id
          }, {
            'gamesPlayed': userResults.gamesPlayed,
            'wins': userResults.wins,
            'eliminations': userResults.eliminations,
            'deaths': userResults.deaths,
            'kdr': userResults.kdr,
            'accuracy': userResults.accuracy,
            'damage': userResults.damage,
            'healing': userResults.healing,
            'level': userResults.level,
            'skillRating': userResults.skillRating
          }).exec(function(erro, docu) {
            if (erro) {
              console.log(erro);
            }else { 
              //no response
            }
          });

          // Scrape Stats for each hero
          const heroResults = {};

          $('div.card-container').each((i, element) => {
            heroResults.name = $(element).children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text();
            heroResults.wins = replaceNan(parseFloat($(element).children('div:nth-child(1)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(3)').children('strong:nth-child(1)').children('span:nth-child(1)').text()));
            heroResults.hoursPlayed = $(element).children('div:nth-child(1)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').children('span:nth-child(1)').text();
            heroResults.eliminations = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
            heroResults.kdr = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').text()));
            heroResults.accuracy = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('%', '')));
            heroResults.healing = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(5)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
            heroResults.damage = replaceNan(parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
            heroResults.objKills = replaceNan(parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
            heroResults.objTime = replaceNan(parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace(' seconds', '')));

            const heroEntry = new Hero(heroResults);
      
            heroEntry.save(function(error, docum) {
              if (error) {
                console.log(error);
              }else {
                Hero.findOneAndUpdate(
                  {'_id':docum._id}, 
                  {'User': doc._id}
                ).exec(function(errors, docume) {
                  if (errors) {
                    console.log(errors);
                  }else {
                    //no response
                  }
                })
                //no response
              }
            });
          });          
        });
      }
    })
  }
  res.send('Registered')
});

//Updates heroes and lifetime stats before every login
router.route('/updatestats/:email').get(function(req, res) {
  User.findOne({
    'email': req.params.email
  }).exec(function(err, doc) {
    request(`https://masteroverwatch.com/profile/${doc.platform}/${doc.region}/${doc.gamerTag}`, function(err, response, html) {
      const $ = cheerio.load(html);

      // if ($('ul.player-navigation-extras').children('li.navigation-toggle').children('div:nth-child(1)').children('a').attr('class') == 'toggle-button btn btn-default is-active') {
      //   console.log('its active')
      //   app.post('http://masteroverwatch.com/profile/mode/toggle', {
      //     mode: 'ranked'
      //   }).then(function(req, res) {
      //     console.log(posted);
      //   })
      // }else {
      //   console.log('worked');
      // }

      function replaceNan(data) {
        if (isNaN(data)) {
          return 0;
        }else {
          return data;
        }
      }


      // Scrape Lifetime Stats
      const userResults = {}; 

      const lifetimeStats = $('div.data-overall').children('div:nth-child(2)');

      userResults.gamesPlayed = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
      userResults.wins = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
      userResults.eliminations = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
      userResults.deaths = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
      userResults.kdr = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(3)').children('div:nth-child(2)').children().first().text()));
      userResults.accuracy = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(4)').children('div:nth-child(2)').children().first().text().replace('%', '')));
      userResults.damage = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(5)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
      userResults.healing = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(7)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
      userResults.level = $('div.header-avatar').children('span').text();
      userResults.skillRating = parseFloat($('div.header-stat').children('strong').text().replace(/,/g,''));

      User.findOneAndUpdate({
        '_id': doc._id
      }, {
        'gamesPlayed': userResults.gamesPlayed,
        'wins': userResults.wins,
        'eliminations': userResults.eliminations,
        'deaths': userResults.deaths,
        'kdr': userResults.kdr,
        'accuracy': userResults.accuracy,
        'damage': userResults.damage,
        'healing': userResults.healing,
        'level': userResults.level,
        'skillRating': userResults.skillRating
      }).exec(function(erro, docu) {
        if (erro) {
          console.log(erro);
        }else {
          //no response 
        }
      });

      // Scrape Stats for each hero
      const heroResults = {};

      $('div.card-container').map((i, element) => {
        heroResults.name = $(element).children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text();
        heroResults.wins = replaceNan(parseFloat($(element).children('div:nth-child(1)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(3)').children('strong:nth-child(1)').children('span:nth-child(1)').text()));
        heroResults.hoursPlayed = $(element).children('div:nth-child(1)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').children('span:nth-child(1)').text();
        heroResults.eliminations = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
        heroResults.kdr = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').text()));
        heroResults.accuracy = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('%', '')));
        heroResults.healing = replaceNan(parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(5)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
        heroResults.damage = replaceNan(parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
        heroResults.objKills = replaceNan(parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', '')));
        heroResults.objTime = replaceNan(parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace(' seconds', '')));

        Hero.findOneAndUpdate(
          {
            'name': heroResults.name, 'User': doc._id
          }, 
          {
            'wins': heroResults.wins,
            'hoursPlayed': heroResults.hoursPlayed,
            'eliminations': heroResults.eliminations,
            'kdr': heroResults.kdr,
            'accuracy': heroResults.accuracy,
            'healing': heroResults.healing,
            'damage': heroResults.damage,
            'objKills': heroResults.objKills,
            'objTime': heroResults.objTime
        }).exec(function(errors, docume) {
          if (errors) {
            console.log(errors);
          }else {
            //no response
          }
        })       
      })
    })
    res.send('Updated Stats')
  })
});

//Logs user into site
router.route('/login').post(passport.authenticate('local'), function(req, res) {

  const token = jwt.encode(req.user._id, JWT_SECRET);
    
  User.findOneAndUpdate({'_id': req.user._id}, {'online': true}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }else {
      res.json({token: token});
    }
  })
});

//Logs out user
router.route('/logout/:token').post(function(req, res) {
  const decoded = jwt.decode(req.params.token, JWT_SECRET);

  if (decoded) {
    User.findOneAndUpdate({'_id': decoded}, {'online': false}).exec(function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        Room.findOneAndRemove({'occupants': doc._id}).exec(function(err, doc) {
          if (err) {
            console.log(err);
          }else {
            res.send('Logged out')
          }
        })
      }
    })
  }else {
    res.send('Invalid token');
  }
});

// Route for getting some data about our user to be used client side
router.route('/user_data/:token').get(function(req, res) {
  console.log(req.params.token);

  const decoded = jwt.decode(req.params.token, JWT_SECRET);

  if (decoded) {
    User.findOne({'_id': decoded}).exec(function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        res.json(doc);
      }
    })
  }else {
    res.send('Invalid token');
  }
});

//Route for getting User stats and sending them client side
router.route('/getuser/:token').get(function(req, res) {
  const decoded = jwt.decode(req.params.token, JWT_SECRET);

  if (decoded) {
    User.findOne({'_id': decoded}).exec(function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        res.json(doc);
      }
    })
  }else {
    res.send('Invalid token');
  }
});

//Route for getting Heroes stats and sending them client side
router.route('/getherostats/:token').get(function(req, res) {
  const decoded = jwt.decode(req.params.token, JWT_SECRET);
  
  if (decoded) {
    Hero.find({'User': decoded}).exec(function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        res.json(doc);
      }
    })
  }else {
    res.send('Invalid token');
  }
});

//Add a route for hero select and search for room without that hero
router.route('/selectHero/:hero/:token').post(function(req, res) {
  const decoded = jwt.decode(req.params.token, JWT_SECRET);

  if (decoded) {
    User.findOneAndUpdate({'_id': decoded}, {'selectedHero': req.params.hero}).exec(function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        res.send('Hero selected');
      }
    })
  }else {
    res.send('Invalid token');
  }
})

//Matchmaking route
router.route('/match/:token').post(function(req, res) {
  const decoded = jwt.decode(req.params.token, JWT_SECRET);

  if (decoded) {
    User.findOne({'_id': decoded}).exec(function(err, doc) {

      Room.find({'platform': doc.platform, occupants: { $nin: {'selectedHero': doc.selectedHero}}}).count(function(err, count) {
        
        if (err) {
          console.log(err);
        }
        else if (!err && count === 0) {
          var firstRoom = new Room();

          firstRoom.inUse = true;
          firstRoom.platform = req.user.platform;
          firstRoom.occupants.push(req.user.id);

          firstRoom.save(function(err, doc) {
            if (err) {
              console.log(err);
            }else {
              console.log(doc);
            }
          })
          res.json('added')
        }
        else {
          //Dev Notes -- Add platform to rooms model so users can find a room within their platform
          Room.find({'platform': req.user.platform, occupants: { $nin: {'selectedHero': doc.selectedHero}}}).populate('occupants').exec(function(err, doc) {
            if (err) {
              console.log(err);
            }else {

              let numOfRooms = 1;

              for (var i = 0; i < doc.length; i++) {
                console.log(doc.length);
                console.log(numOfRooms);

                const lowScore = doc[i].occupants[0].skillRating - 1000;
                const highScore = doc[i].occupants[0].skillRating + 1000;

                console.log(lowScore);
                console.log(highScore);

                if (req.user.skillRating >= lowScore && req.user.skillRating <= highScore && doc[i].occupants.length < 6) {
                  console.log('adding me');

                  Room.findOneAndUpdate({
                    '_id': doc[i]._id
                  }, {
                    $push: {occupants: req.user.id}
                  }).exec(function(err, doc) {
                    if (err) {
                      console.log(err);
                    }else {
                      res.json(doc);
                    }
                  })

                  return;

                }else if (numOfRooms === doc.length) {
                  console.log('my room');

                  const roomEntry = new Room();

                  roomEntry.inUse = true;
                  roomEntry.platform = req.user.platform;
                  roomEntry.occupants.push(req.user.id);

                  roomEntry.save(function(err, doc) {
                    if (err) {
                      console.log(err);
                    }else {
                      res.json(doc);
                    }
                  })

                  return;

                }else {
                  console.log('else');
                  numOfRooms++;
                }
              }
            }
          })
        }
      })
    })

    
  }
});

//Sample code for adding a few users to a room
router.route('/addtoroom').post(function(req, res) {
  Room.findOneAndUpdate(
    {
      '_id': 'room id goes here'
    },
    {
      $push: {occupants: {$each: ['ID of users goes here']}}
    })
  .exec(function(err, doc) {
    res.json(doc);
  })
});

//Get Room including all users in that room
router.route('/getRoom').get(function(req, res) {
  Room.find({}).populate('occupants').exec(function(err, doc) {
    if (err) {
      console.log(err);
    }else {
      res.json(doc);
    }
  })
});

module.exports = router, passport, app;