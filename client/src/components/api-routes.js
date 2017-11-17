import axios from 'axios';

class GetUserStats {

  scrapeWebsite(platform, region, gamertag) {
    axios.get(`http://localhost:3001/scrape/${platform}/${region}/${gamertag}`, {
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
}

export default GetUserStats;