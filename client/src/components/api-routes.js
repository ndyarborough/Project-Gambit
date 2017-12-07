import axios from 'axios';

class GetUserStats {

  scrapeWebsite(token, regn, gametg, mail, passwrd, confirmpasswrd) {
    axios.get(`http://localhost:3001/api/user_data/${token}`, {
    }).then(function(res) {
      console.log(res);
    })
    // axios.get(`http://localhost:3001/api/check/${pform}/${regn}/${gametg}`, {
    // })
    // .then(function (response) {
    //   console.log(response);
    //   axios.post('http://localhost:3001/api/register', {
    //     platform: pform,
    //     region: regn,
    //     gamerTag: gametg,
    //     email: mail,
    //     password: passwrd,
    //     confirmpassword: confirmpasswrd
    //   }).then(function(res) {
    //     console.log(res);
    //   }).catch(function(error) {
    //     console.log(error);
    //   })
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   alert('GamerTag not found. Please Try Again');
    // });
  }

  login(mail, passwrd) {
    axios.get(`http://localhost:3001/api/updatestats/${mail}`, {
    })
    .then(function(response) {
      console.log(response);
      axios.post('http://localhost:3001/api/login', {
        email: mail,
        password: passwrd
      }).then(function(res) {
        //console.log(res);
        console.log(res);
        localStorage.setItem('token', res.data.token);
      }).catch(function(err) {
        console.log(err);
      })
    })
    .catch(function(error) {
      console.log(error);
    })
  }
}

export default GetUserStats;