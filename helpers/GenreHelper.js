const { Genres } = require('../models');


const GenreHelper = {

    getGenreIdByName: async function(name) {
        let genre = await Genres.findOne({
            where: {
                name: name
            }
        });

        return genre.id
    }
}

module.exports = GenreHelper;