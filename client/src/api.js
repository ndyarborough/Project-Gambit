import axios from 'axios';

const createNewUser = (pform, regn, gametg, mail, passwrd, confirmpasswrd) => {
    // Checks to see if the player profile exists
    axios.get(`http://localhost:3001/api/check/${pform}/${regn}/${gametg}`, {
    })
    .then(response => {
    	console.log('Successfully Registered!')
    // Register user statistics the db
      axios.post('http://localhost:3001/api/register', {
        platform: pform,
        region: regn,
        gamerTag: gametg,
        email: mail,
        password: passwrd,
        confirmpassword: confirmpasswrd
      })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      })
    })
    .catch(function (error) {
      console.log(error);
      alert('GamerTag not found. Please Try Again');
    });
}

const login = (mail, passwrd) => {
	// First, Update Account Statistics
    axios.get(`http://localhost:3001/api/updatestats/${mail}`, {
    })
    .then(function(response) {
    // Then attempt a user login
      axios.post('http://localhost:3001/api/login', {
        email: mail,
        password: passwrd
      })
      .then(function(res) {
        console.log(res);
        // Sets up a validation token on the frontend
        localStorage.setItem('token', res.data.token);
      })
      .catch(function(err) {
      	console.log('There was a problem logging you in...')
        console.log(err);
      })
    })
    .catch(function(error) {
    	console.log('There was an issue updating your profile...')
    	console.log(error);
    })
}


export { createNewUser, login };