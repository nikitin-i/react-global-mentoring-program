import { createSelector } from 'reselect';

const selectFilteredMovies = movies => movies.filteredMovies;
const selectEditMovie = movies => movies.editMovie;
const selectMovieDetails = movies => movies.movieDetails;
const selectDeleteMovieId = movies => movies.deleteMovieId;

const selectMovieCongratsModal = modals => modals.isAddMovieCongratsModalOpen;
const selectDeleteMovieModal = modals => modals.isDeleteMovieConfirmModalOpen;
const selectAddMovieModal = modals => modals.isAddMovieModalOpen;
const selectEditMovieModal = modals => modals.isEditMovieModalOpen;

const selectSearchLine = filters => filters.searchLine;
const selectActiveSorting = filters => filters.activeSorting;
const selectActiveGenre = filters => filters.activeGenre;

const selectMoviesCounter = createSelector(selectFilteredMovies, movies => movies.length);
const selectMovieDetailsFormatted = createSelector(selectMovieDetails, movie => {
    if (!Object.keys(movie).length) {
        return {};
    }
    const { genres, release_date, runtime } = movie;

    const genresList = genres.join(' & ');
    const year = release_date.slice(0, 4);
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    const duration = `${hours}h ${minutes}min`;

    return {
        ...movie,
        genresList,
        year,
        duration
    };
});

export {
    selectFilteredMovies,
    selectEditMovie,
    selectMovieDetails,
    selectDeleteMovieId,
    selectMovieCongratsModal,
    selectDeleteMovieModal,
    selectAddMovieModal,
    selectEditMovieModal,
    selectSearchLine,
    selectActiveSorting,
    selectActiveGenre,
    selectMoviesCounter,
    selectMovieDetailsFormatted
};
