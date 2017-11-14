// Dependencies
//===============================
const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require('request');

// get route -> index
router.get("/", function(req, res) {
  res.send("Overwatch Home Page!");
});

 // Scrapes Overbuff for userstats when this route is hit
 router.get('/scrape', function(req, res) {
    request('https://www.overbuff.com/players/xbl/Roadhogs%20Hooks', function(err, response, html) {
        const $ = cheerio.load(html);

        const mongoResults = {};
        // Scrape Lifetime Stats
        $('div.four').each((i, element) => {
            mongoResults.wins = $(this).children().last().children().first().children('tbody:nth-child(1)').children('tr:nth-child(1)').children('td:nth-child(2)').text();
        })

        // Scrape Stats for each hero
        $('div.player-hero').each(function(i, element) {
            // mongoResults.name = $(this).children('div.grouping').children('div.group').children('div.name').children('a').text();
            // mongoResults.wins = $(this).children('div.grouping').children('div.special').children('div:nth-child(3)').children('div.value').children('span').text();
            // mongoResults.eliminations = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(1)').children('div.value').text();
            // mongoResults.deaths = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(5)').children('div.value').text();
            // mongoResults.damage = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(4)').children('div.value').text();
            // mongoResults.objkill = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(2)').children('div.value').text();
            // mongoResults.objtime = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(3)').children('div.value').text();

            // const entry = new Article(mongoResults);
            
            // entry.save(function(err, doc) {
            // 	if (err) {
            // 		console.log(err);
            // 	}else {
            // 	}
            // });
        });
        console.log(mongoResults);
    });
    res.send('scraped');
});	

module.exports = router;