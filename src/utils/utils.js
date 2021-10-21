import _ from 'lodash';

function filterMovies(movies, search, genre, sort) {
    let filteredMovies = [...movies];

    if (search) {
        filteredMovies = _.filter(filteredMovies, ({title}) => _.includes(_.lowerCase(title), _.lowerCase(search)));
    }

    if (genre && genre !== 'All') {
        filteredMovies = _.filter(filteredMovies, movie => _.includes(movie.genres, genre));
    }

    if (!_.isEmpty(sort)) {
        const { str, reverse } = sort;
        const order = reverse ? ['desc'] : ['asc'];

        if (str === 'Title') {
            filteredMovies = _.orderBy(filteredMovies, ['title'], order);
        } else if (str === 'Release Date') {
            filteredMovies = _.orderBy(filteredMovies, ['release_date'], order);
        }
    }

    return filteredMovies;
}

export {
    filterMovies
};
