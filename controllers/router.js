// Dependencies
//===============================
const router = require('express').Router();
const cheerio = require("cheerio");
const request = require('request');

 // Scrapes Overbuff for userstats when this route is hit
 router.get('/scrape/:platform/:region/:gamertag', (req, res) => {
    request(`https://masteroverwatch.com/profile/${req.params.platform}/${req.params.region}/${req.params.gamertag}/season/7`, function(err, response, html) {
        const $ = cheerio.load(html);

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
  
          userResults.gamesPlayed = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text()));
          userResults.wins = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text()));
          userResults.eliminations = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.deaths = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.kdr = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(3)').children('div:nth-child(2)').children().first().text()));
          userResults.accuracy = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(4)').children('div:nth-child(2)').children().first().text().replace('%', '')));
          userResults.damage = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(5)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
          userResults.healing = replaceNan(parseFloat(lifetimeStats.children('div:nth-child(4)').children('div:nth-child(7)').children('div:nth-child(2)').children().first().text().replace(/,/g,'')));
  
          console.log(userResults);
          // var userEntry = new User(userResults);
        
          // userEntry.save(function(err, doc) {
          //   if (err) {
          //     console.log(err);
          //   }else {
  
          //   }
          // });
  
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
  
            console.log(heroResults);
            // var heroEntry = new Hero(heroResults);
        
            // heroEntry.save(function(err, doc) {
            //   if (err) {
            //     console.log(err);
            //   }else {
            //     console.log(heroResults);
            //   }
            // });
    });
    res.send('scraped');
});

module.exports = router;