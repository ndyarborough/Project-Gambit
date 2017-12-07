// Dependencies
//===============================
const express = require('express');
const app = express();
const router = express.Router();
const cheerio = require("cheerio");
const request = require('request');
const passport = require("passport");
const Hero = require('../models/hero.js');
const User = require('../models/user.js');
const Room = require('../models/room.js')

//Checks to see if users gamertag exist on masteroverwatch
router.route('/check/:platform/:region/:gamertag').get(function (req, res) {
  request(`https://masteroverwatch.com/profile/${req.params.platform}/${req.params.region}/${req.params.gamertag}`, function (err, response, html) {
    if (err) {
      console.log(err);
    } else if (response.statusCode == 404) {
      console.log('statusCode:', response && response.statusCode);
    } else {
      res.send('Account Found!');
    }
  })
});

//Registers Users and scrapes their heroes, then inputs them into the db
router.route('/register').post(function (req, res) {

  req.check('email', 'Invalid Email Address').isEmail();
  req.check('password', 'Password is Invalid').isLength({ min: 4 }).equals(req.body.confirmpassword)

  var errors = req.validationErrors();

  if (errors) {
    //req.session.errors = errors;
    console.log(errors)
  } else {
    var userEntry = new User(req.body);

    userEntry.password = userEntry.generateHash(req.body.password);

    userEntry.save(function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        request(`https://masteroverwatch.com/profile/${doc.platform}/${doc.region}/${doc.gamerTag}/season/7`, function (err, response, html) {
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
            } else {
              return data;
            }
          };

          // Scrape Lifetime Stats
          const userResults = {};

          const lifetimeStats = $('div.data-overall').children('div:nth-child(2)');

          userResults.gamesPlayed = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
          userResults.wins = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
          userResults.eliminations = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
          userResults.deaths = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
          userResults.kdr = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(3)').children('div:nth-child(2)').children().first().text()));
          userResults.accuracy = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(4)').children('div:nth-child(2)').children().first().text().replace('%', '')));
          userResults.damage = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(5)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
          userResults.healing = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(7)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
          userResults.level = $('div.header-avatar').children('span').text();
          userResults.skillRating = parseFloat($('div.header-stat').children('strong').text().replace(/,/g, ''));

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
            }).exec(function (erro, docu) {
              if (erro) {
                console.log(erro);
              } else {
                //no response
              }
            });

          // Scrape Stats for each hero
          const heroArray = []
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

            heroEntry.save(function (error, docum) {
              if (error) {
                console.log(error);
              } else {
                Hero.findOneAndUpdate(
                  { '_id': docum._id },
                  { 'User': doc._id }
                ).exec(function (errors, docume) {
                  if (errors) {
                    console.log(errors);
                  } else {
                    console.log('hohoho')
                    console.log(docume)
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
router.route('/updatestats/:email').get(function (req, res) {
  User.findOne({
    'email': req.params.email
  }).exec(function (err, doc) {
    request(`https://masteroverwatch.com/profile/${doc.platform}/${doc.region}/${doc.gamerTag}/season/7`, function (err, response, html) {
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
        } else {
          return data;
        }
      }


      // Scrape Lifetime Stats
      const userResults = {};

      const lifetimeStats = $('div.data-overall').children('div:nth-child(2)');

      userResults.gamesPlayed = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
      userResults.wins = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
      userResults.eliminations = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
      userResults.deaths = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
      userResults.kdr = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(3)').children('div:nth-child(2)').children().first().text()));
      userResults.accuracy = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(4)').children('div:nth-child(2)').children().first().text().replace('%', '')));
      userResults.damage = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(5)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));
      userResults.healing = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(7)').children('div:nth-child(2)').children().first().text().replace(/,/g, '')));

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
          'healing': userResults.healing
        }).exec(function (erro, docu) {
          if (erro) {
            console.log(erro);
          } else {
          }
        });

      // Scrape Stats for each hero
      const heroResults = {};

      $('div.card-container').map((i, element) => {
        heroResults.email = req.params.email;
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

        Hero.findOneAndUpdate({
            'name': heroResults.name, 'User': doc._id
          }, {
            'email': req.params.email,
            'wins': heroResults.wins,
            'hoursPlayed': heroResults.hoursPlayed,
            'eliminations': heroResults.eliminations,
            'kdr': heroResults.kdr,
            'accuracy': heroResults.accuracy,
            'healing': heroResults.healing,
            'damage': heroResults.damage,
            'objKills': heroResults.objKills,
            'objTime': heroResults.objTime
          }).exec(function (errors, docume) {
            if (errors) {
              console.log(errors);
            } else {
              console.log(docume)
            }
          })
      })
    })
    res.send('Updated Stats')
  })
});

//Logs user into site
router.route('/login').post(passport.authenticate("local"), function (req, res) {
  // res.json(req.user);
  // console.log(req.session.cookie);
  // console.log(req.session);
});

//Logs out user
router.route('/logout').post(function (req, res) {
  req.logout();
  res.json('logged out')
})

// Route for getting some data about our user to be used client side
router.route("/user_data").get(function (req, res) {
  if (!req.user) {
    res.json({});
  }
  else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

//Route for getting User stats and sending them client side
router.route('/getuserstats/:email').get(function (req, res) {

  User.findOne({ 'email': req.params.email }).exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  })
});

//Route for getting Heroes stats and sending them client side
router.route('/getherostats/:email').get(function (req, res) {
  Hero.find({ 'email': req.params.email }).exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  })
});

router.route('/match').post(function (req, res) {
  console.log(req.user.skillRating);

  Room.find({}).count(function (err, count) {
    if (err) {
      console.log(err);
    }
    else if (!err && count === 0) {
      var roomEntry = new Room();

      roomEntry.inUse = true;
      roomEntry.occupants.push(req.user.id);

      roomEntry.save(function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      })
      res.json('added')
    }
    else {
      Room.find({}).populate('occupants').exec(function (err, doc) {
        if (err) {
          console.log(err);
        } else {

          for (var i = 0; i < doc.length; i++) {

            const lowScore = doc[i].occupants[0].skillRating - 1000;
            const highScore = doc[i].occupants[0].skillRating + 1000;

            console.log(lowScore);
            console.log(highScore);

            if (req.user.skillRating >= lowScore && req.user.skillRating <= highScore) {
              console.log('adding me')
              Room.findOneAndUpdate({
                '_id': doc[i]._id
              }, {
                  $push: { occupants: req.user.id }
                })
            } else {
              console.log('my room')
              var roomEntry = new Room();

              roomEntry.inUse = true;

              roomEntry.occupants.push(req.user.id);

              roomEntry.save(function (err, doc) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(doc);
                }
              })
              res.json('added')
            }
          }
        }
      })
    }
  })
});

router.route('/addtoroom').post(function (req, res) {
  Room.findOneAndUpdate(
    {
      '_id': '5a220fbcf34a00c9843c1b1f'
    },
    {
      $push: { occupants: { $each: ['5a22f34fca7c8e8f2860ef3f', '5a22f33dca7c8e8f2860ef25', '5a22f32fca7c8e8f2860ef0b', '5a22f19e741b6272f4254963'] } }
    })
    .exec(function (err, doc) {
      res.json(doc);
    })
})

router.route('/getRoom').get(function (req, res) {
  console.log(req.user);
  Room.find({}).populate('occupants').exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  })
});

module.exports = router;