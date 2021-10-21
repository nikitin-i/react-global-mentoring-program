import _ from 'lodash';

import { filterMovies } from '../../utils/utils';

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
    searchLine: '',
    deleteMovieId: '',
    editMovie: '',
    activeMovie: {}
};

const moviesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_MOVIES:
            return {
                ...initialState,
                movies: [...payload],
                filteredMovies: [...payload]
            };

        case ADD_MOVIE:
            return {
                ...initialState,
                movies: [...state.movies, payload],
                filteredMovies: [...state.movies, payload]
            };

        case UPDATE_MOVIE:
            const updatedMovies = _.map(state.movies, movie => movie.id !== payload.id ? movie : payload);

            return {
                ...initialState,
                movies: [...updatedMovies],
                filteredMovies: [...updatedMovies]
            };

        case DELETE_MOVIE:
            const filteredMoviesByID = _.filter(state.movies, movie => movie.id !== payload);

            return {
                ...initialState,
                filteredMovies: [
                    ...filteredMoviesByID
                ],
                movies: [
                    ...filteredMoviesByID
                ]
            };

        case SEARCH_MOVIE:
            return {
                ...state,
                searchLine: payload,
                filteredMovies: filterMovies(state.movies, payload, state.activeGenre, state.activeSorting)
            };

        case CHANGE_ACTIVE_GENRE:
            return {
                ...state,
                activeGenre: payload,
                filteredMovies: payload !== 'All' ?
                    filterMovies(state.movies, state.searchLine, payload, state.activeSorting) :
                    [...state.movies]
            };

        case CHANGE_ACTIVE_SORTING:
            const { str, reverse } = payload;

            return {
                ...state,
                activeSorting: {
                    str,
                    reverse
                },
                filteredMovies: filterMovies(state.movies, state.searchLine, state.activeGenre, payload)
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