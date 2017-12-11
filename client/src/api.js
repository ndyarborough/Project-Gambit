import axios from 'axios';

const registerUser = (pform, regn, gametg, mail, passwrd, confirmpasswrd) => {
    console.log('registerUser')
    axios.get(`http://localhost:3001/api/check/${pform}/${regn}/${gametg}`, {
    })
        .then(function (response) {
            console.log(response);
            axios.post('http://localhost:3001/api/register', {
                platform: pform,
                region: regn,
                gamerTag: gametg,
                email: mail,
                password: passwrd,
                confirmpassword: confirmpasswrd
            }).then(function (res) {
                console.log(res);
            }).catch(function (ERR) {
                console.log(ERR);
            })
        })
        .catch(function (error) {
            console.log(error);
            alert('GamerTag not found. Please Try Again');
        });
}

const login = (mail, passwrd) => {
    console.log('login')
    axios.post('http://localhost:3001/api/login', {
        email: mail,
        password: passwrd
    }).then(function (res) {
        axios.get(`http://localhost:3001/api/updatestats/${mail}`, {
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }).catch(function (err) {
        console.log(err);
    })



    // axios.get(`http://localhost:3001/api/updatestats/${mail}`, {
    // })
    //     .then(function (response) {
    //         console.log(response)
    //         axios.post('http://localhost:3001/api/login', {
    //             email: mail,
    //             password: passwrd
    //         }).then(function (res) {
    //             console.log(res);
    //         }).catch(function (err) {
    //             console.log(err);
    //         })
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

const getUserStats = (email) => {
    console.log('getUserStats')
    axios.get(`/api/getuserstats/${email}`)
        .then(res => {
            // console.log(res)
            const obj = {
                gamertag: res.data.gamerTag,
                platform: res.data.platform,
                icon: res.data.icon,
                skillRating: res.data.skillRating,
                tier: res.data.tier,
                lifetimeStats: {
                    gamesPlayed: res.data.gamesPlayed,
                    wins: res.data.wins,
                    kdr: res.data.kdr,
                    healing: res.data.healing,
                    damage: res.data.healing,
                    eliminations: res.data.eliminations,
                }
            };
            return obj;
        })
        .catch(err => console.log(err));
}

const getHeroStats = (userEmail) => {
    console.log('getHeroStats')
    axios.get(`/api/getherostats/${userEmail}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
}


export { registerUser, login, getUserStats, getHeroStats };