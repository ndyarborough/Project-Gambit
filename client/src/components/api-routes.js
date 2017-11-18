import axios from 'axios';

class GetUserStats {

  register(pform, regn, gametg, mail, passwrd, confirmpasswrd) {
    axios.post('http://localhost:3001/api/register', {
      platform: pform,
      region: regn,
      gamerTag: gametg,
      email: mail,
      password: passwrd,
      password2: confirmpasswrd
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  scrapeWebsite(platform, region, gamertag, email, password, confirmPassword) {
    axios.get(`http://localhost:3001/api/scrape/${platform}, ${region}, ${gamertag}`, {
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