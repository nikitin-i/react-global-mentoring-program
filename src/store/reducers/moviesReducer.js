import _ from 'lodash';

import {
    GET_MOVIES,
    ADD_MOVIE,
    SEARCH_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    CHANGE_ACTIVE_GENRE,
    CHANGE_ACTIVE_SORTING,
    SET_DELETE_MOVIE,
    SET_EDIT_MOVIE
} from '../types';

const initialState = {
    movies: [],
    filteredMovies: [],
    activeGenre: 'All',
    activeSorting: {},
    deleteMovieId: '',
    editMovie: '',
    activeMovie: {}
};

const moviesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: [...payload],
                filteredMovies: [...payload]
            };

        case ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, payload],
                filteredMovies: [...state.movies, payload]
            };

        case UPDATE_MOVIE:
            const updatedMovies = _.map(state.movies, movie => movie.id !== payload.id ? movie : payload);

            return {
                ...state,
                movies: [...updatedMovies],
                filteredMovies: [...updatedMovies]
            };

        case DELETE_MOVIE:
            const filteredMoviesByID = _.filter(state.movies, movie => movie.id !== payload);

            return {
                ...state,
                filteredMovies: [
                    ...filteredMoviesByID
                ],
                movies: [
                    ...filteredMoviesByID
                ]
            };

        case SEARCH_MOVIE:
            const filteredMoviesByText = _.filter(state.movies, ({title}) => _.includes(_.lowerCase(title), _.lowerCase(payload)));

            return {
                ...state,
                filteredMovies: filteredMoviesByText
            };

        case CHANGE_ACTIVE_GENRE:
            let filteredMoviesByGenre = [];

            if (payload !== 'All') {
                filteredMoviesByGenre = _.filter(state.movies, movie => _.includes(movie.genres, payload));
            } else {
                filteredMoviesByGenre = [...state.movies];
            }

            return {
                ...state,
                activeGenre: payload,
                filteredMovies: filteredMoviesByGenre
            };

        case CHANGE_ACTIVE_SORTING:
            const { str, reverse } = payload;

            let sortedMovies = [];
            let order = reverse ? ['desc'] : ['asc'];

            if (str === 'Title') {
                sortedMovies = _.orderBy(state.movies, ['title'], order);
            } else if (str === 'Release Date') {
                sortedMovies = _.orderBy(state.movies, ['release_date'], order);
            }

            return {
                ...state,
                activeSorting: {
                    str,
                    reverse
                },
                filteredMovies: sortedMovies
            };

        case SET_DELETE_MOVIE:
            return {
                ...state,
                deleteMovieId: payload
            };

        case SET_EDIT_MOVIE:
            return {
                ...state,
                editMovie: _.find(state.movies, movie => movie.id === payload)
            };

        default:
            return state;
    }
};

export default moviesReducer;