const BASE_URL = 'https://api.github.com';

// tODO if I get rate limited get hold of these tokens from github.
const githubApiId = '';
const githubApiClientSecret = '';
//const params = `client_id=${githubApiId}&client_secret=${githubApiClientSecret}`;
const params = ``;

// function getProfile (username) {
//     //const uri = `${BASE_URL}/users/${username}/${params}`;
//     const uri = `${BASE_URL}/users/${username}`;
//     console.log('getProfile: ', uri);
//     return axios.get(uri).then(({ data }) => data);
// }
async function getProfile (username) {
    const uri = `${BASE_URL}/users/${username}`;
    console.log('nativeOrPollyfilled fetch and  async await getProfile: ', uri);
    const response = await fetch(uri);
    //.json() is an async function so we need to await it
    const responseAsJson = await response.json();
    console.log('getProfile responseAsJson.data', responseAsJson.data);
    return responseAsJson;
}

// List public repositories for the specified user.
// GET /users/:username/repos
async function getRepos (username) {
    // const uri = `${BASE_URL}/users/${username}/repos?${params}&per_page=100`;
    const uri = `${BASE_URL}/users/${username}/repos`;
    console.log('nativeOrPollyfilled fetch and async await => getRepos: ', uri);
    const resp = await fetch(uri).then(({ data }) => data);
    // resp.json() returns a Promise
    return resp.json();
}

function getStarCount (repos) {
    const counterInitialValue = 0;
    return repos.reduce((counter, repo) => counter + repo.stargazers_count, counterInitialValue);
}

function calculateScore (profile, repos) {
    const { followers } = profile; 
    return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
    console.warn(error);
    return null;
}

// function getUserData(player) {
//     return Promise.all([getProfile(player), getRepos(player)])
//     .then(response => {
//         const profile = response[0];
//         const repos = response[1];
//         return {
//             profile,
//             score: calculateScore(profile, repos),
//         }
//     });
// }
async function getUserData(player) {
    console.log('async await getUserData');
    const [profile, repos] = await Promise.all([getProfile(player), getRepos(player)]);
    return {
        profile,
        score: calculateScore(profile, repos),
    };
}

function sortPlayers(players) {
    return players.sort((a,b) => b.score - a.score)
}

// export function battle(players) {
//     const userDataPromises = players.map(getUserData); // Apply function getUserData to all players. map gives back an array, of promises
//     return axios.all(userDataPromises)
//     .then(sortPlayers)
//     .catch(handleError);
// };
export async function battle(players) {
    console.log('async await battle(players)');
    const userDataPromises = players.map(getUserData); // Apply function getUserData to all players. map gives back an array, of promises
    const results = await Promise.all(userDataPromises).catch(handleError);
    return results === null
        ? results
        : sortPlayers(results);
};

// export const fetchPopularReposBasedOnLanguage = (programmingLanguage) => {
//     const uri = `${BASE_URL}/search/repositories?q=stars:>1+language:${programmingLanguage}&sort=stars&order=desc&ytpe=Repositories`;
//     console.log('GETURI: ', uri);
//     const encodedUri = window.encodeURI(uri);
//     return axios.get(encodedUri).then(resp => resp.data.items);
// };
export const fetchPopularReposBasedOnLanguage = async (programmingLanguage) => {
    
    const uri = `${BASE_URL}/search/repositories?q=stars:>1+language:${programmingLanguage}&sort=stars&order=desc&ytpe=Repositories`;
    
    console.log('nativeOrPollyfilled fetch and async await fetchPopularReposBasedOnLanguage GETURI: ', uri);
    
    const encodedUri = window.encodeURI(uri);
    
    const githubResponse = await fetch(encodedUri).catch(handleError);

    // .json() is async so lets await it
    const popRepoz = await githubResponse.json();

    return popRepoz.items;
};