import {
    SEARCH_MOVIE,
    CHANGE_ACTIVE_GENRE,
    CHANGE_ACTIVE_SORTING,
    CLEAR_ALL_FILTERS
} from '../types';

export const searchMovie = (str) => ({
    type: SEARCH_MOVIE,
    payload: str
});

export const changeActiveGenre = (str) => ({
    type: CHANGE_ACTIVE_GENRE,
    payload: str
});

export const changeActiveSorting = (obj) => ({
    type: CHANGE_ACTIVE_SORTING,
    payload: obj
});

export const clearAllFilters = () => ({
    type: CLEAR_ALL_FILTERS
});
