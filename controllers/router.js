// Dependencies
//===============================
const express = require('express');
const app = express();
const router = express.Router();
const cheerio = require("cheerio");
const request = require('request');
const Hero = require('../models/hero.js');
const User = require('../models/user.js'); 

// Scrapes Overbuff for userstats when this route is hit
router.route('/scrape/:platform/:region/:gamertag').get(function(req, res) {
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

router.route('/register').post(function(req, res) {
  res.json(req.body);
  var userEntry = new User(req.body);
  
  userEntry.save(function(err, doc) {
    if (err) {
      console.log(err);
    }else {
      console.log(doc);
    }
  });
})

router.route('/login/:email/:password').get(function(req, res) {
  User.findOne({
    'email': req.params.email
  }).exec(function(err, doc) {
    request(`https://masteroverwatch.com/profile/${doc.platform}/${doc.region}/${doc.gamerTag}/season/7`, function(err, response, html) {
      
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
      }).exec(function(erro, docu) {
        if (erro) {
          console.log(erro);
        }else { 
          //console.log(docu);
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

        var heroEntry = new Hero(heroResults);
    
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
    })
  })
})

module.exports = router;