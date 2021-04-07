const { default: axios } = require('axios');

const getImage = async (destination) => {
    const { data } = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${destination}`
    );
    const newImage = data.results[0].urls.small;
    return newImage;
}

module.exports = { getImage };