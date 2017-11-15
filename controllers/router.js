// Dependencies
//===============================
const router = require('express').Router();
const cheerio = require("cheerio");
const request = require('request');

// - fetch a profile
//     - it'll either be the ranked view or quick
//     - you can figure out which view by checking that toggle button, which one has is-active
// - if youre in ranked view, you're done. scrape the page for your stats
// - if youre in quick view,
//     - post to /profile/mode/toggle route with { mode: 'ranked' }
//     - refresh/refetch the profile page and itll be in ranked mode

 // Scrapes Overbuff for userstats when this route is hit
 router.get('/scrape', (req, res) => {
    request('https://masteroverwatch.com/profile/pc/eu/eerpS-2719', function(err, response, html) {
        const $ = cheerio.load(html);

        const mongoResults = {};
        const heroes = [];
        const lifetimeStats = $('div.data-overall').children('div:nth-child(2)');
        
        // Scrape Lifetime Stats
        mongoResults.gamesPlayed = lifetimeStats.children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text();
        mongoResults.wins = lifetimeStats.children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text();
        mongoResults.eliminations = lifetimeStats.children('div:nth-child(4)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text();
        mongoResults.deaths = lifetimeStats.children('div:nth-child(4)').children('div:nth-child(2)').children('div:nth-child(2)').children().first().text();
        mongoResults.kdr = lifetimeStats.children('div:nth-child(4)').children('div:nth-child(3)').children('div:nth-child(2)').children().first().text();
        mongoResults.accuracy = lifetimeStats.children('div:nth-child(4)').children('div:nth-child(4)').children('div:nth-child(2)').children().first().text();
        mongoResults.damage = lifetimeStats.children('div:nth-child(4)').children('div:nth-child(5)').children('div:nth-child(2)').children().first().text();
        mongoResults.healing = lifetimeStats.children('div:nth-child(4)').children('div:nth-child(7)').children('div:nth-child(2)').children().first().text();

        // Scrape Stats for each hero
        $('div.card-container').each((i, element) => {
          const heroResults = {};
          heroResults.name = $(element).children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(2)').children().first().text();
          heroResults.wins = parseFloat($(element).children('div:nth-child(1)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(3)').children('strong:nth-child(1)').children('span:nth-child(1)').text());
          heroResults.hoursPlayed = $(element).children('div:nth-child(1)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').children('span:nth-child(1)').text();
          heroResults.eliminations = parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', ''));
          heroResults.kdr = parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').text());
          heroResults.accuracy = parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('%', ''));
          heroResults.healing = parseFloat($(element).children('div:nth-child(2)').children('div:nth-child(5)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', ''));
          heroResults.damage = parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', ''));
          heroResults.objKills = parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(2)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace('/min', ''));
          heroResults.objTime = parseFloat($(element).children('div:nth-child(3)').children('div:nth-child(3)').children('div:nth-child(1)').children('div:nth-child(1)').text().replace(' seconds', ''));

          heroes.push(heroResults);
        });
        console.log(heroes);
    });
    res.send('scraped');
});

module.exports = router;