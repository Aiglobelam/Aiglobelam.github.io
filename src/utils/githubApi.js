const axios = require('axios');

const BASE_URL = 'https://api.github.com';

// tODO if I get rate limited get hold of these tokens from github.
const githubApiId = '';
const githubApiClientSecret = '';
//const params = `client_id=${githubApiId}&client_secret=${githubApiClientSecret}`;
const params = ``;

function getProfile (username) {
    //const uri = `${BASE_URL}/users/${username}/${params}`;
    const uri = `${BASE_URL}/users/${username}`;
    console.log('GET PROFILE URI: ', uri);
    return axios.get(uri)
        .then((userResponse) => {
            return userResponse.data;
        });
}

// List public repositories for the specified user.
// GET /users/:username/repos
function getRepos (username) {
    // const uri = `${BASE_URL}/users/${username}/repos?${params}&per_page=100`;
    const uri = `${BASE_URL}/users/${username}/repos`;
    console.log('List public repositories for the specified user: GET /users/:username/repos: ', uri);
    return axios.get(uri)
        .then(userResponseRepos => {
            return userResponseRepos.data;
        });
}

function getStarCount (repos) {
    const counterInitialValue = 0;
    return repos.reduce((counter, repo) => {
        return counter + repo.stargazers_count;
    }, counterInitialValue);
}

function calculateScore (profile, repos) {
    const { followers } = profile; 
    const totalStars = getStarCount(repos);
    return (followers * 3) + totalStars;
}

function handleError (error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([getProfile(player), getRepos(player)])
    .then(response => {
        const profile = response[0];
        const repos = response[1];
        return {
            profile,
            score: calculateScore(profile, repos),
        }
    });
}

function sortPlayers(players) {
    return players.sort((a,b) => {
        return b.score - a.score;
    })
}

// This is not an ES6 export!
module.exports = {
    
    battle: function (players) {
        const userDataPromises = players.map(getUserData); // Apply function getUserData to all players. map gives back an array, of promises
        return axios.all(userDataPromises)
        .then(sortPlayers)
        .catch(handleError);
    },

    fetchPopularReposBasedOnLanguage: (programmingLanguage) => {
        const uri = `${BASE_URL}/search/repositories?q=stars:>1+language:${programmingLanguage}&sort=stars&order=desc&ytpe=Repositories`;
        console.log('GETURI: ', uri);
        const encodedUri = window.encodeURI(uri);
        return axios.get(encodedUri)
        .then(resp => {
            return resp.data.items;
        });
    }
}