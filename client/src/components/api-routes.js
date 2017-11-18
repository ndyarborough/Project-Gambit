import axios from 'axios';


class GetUserStats {

  scrapeWebsite(pform, regn, gametg, mail, passwrd, confirmpasswrd) {
    axios.get(`http://localhost:3001/api/scrape/${pform}/${regn}/${gametg}`, {
    })
    .then(function (response) {
        console.log(response);
        axios.post('http://localhost:3001/api/register', {
          platform: pform,
          region: regn,
          gamerTag: gametg,
          email: mail,
          password: passwrd,
          password2: confirmpasswrd
        }).then(function(res) {
          console.log(res);
        }).catch(function(error) {
          console.log(error);
        })
    })
    .catch(function (error) {
      console.log(error);
      alert('GamerTag not found. Please Try Again');
    });
  }

  login(mail, passwrd) {
    axios.get(`http://localhost:3001/api/login/${mail}/${passwrd}`, {
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    })
  }
}

export default GetUserStats;