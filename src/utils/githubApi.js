const axios = require('axios');

const BASE_URL = 'https://api.github.com/search/repositories';

// This is not an ES6 export!
module.exports = {
    fetchPopularReposBasedOnLanguage: (programmingLanguage) => {
        const uri = `${BASE_URL}?q=stars:>1+language:${programmingLanguage}&sort=stars&order=desc&ytpe=Repositories`;
        console.log('GETURI: ', uri);
        const encodedUri = window.encodeURI(uri);
        return axios.get(encodedUri)
        .then(resp => {
            return resp.data.items;
        });
    }
}