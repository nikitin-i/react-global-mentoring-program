import {
    CHANGE_ACTIVE_GENRE,
    CHANGE_ACTIVE_SORTING,
    SEARCH_MOVIE,
    CLEAR_ALL_FILTERS
} from '../types';

const initialState = {
    activeGenre: 'All',
    activeSorting: {},
    searchLine: '',
};

const filterReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                searchLine: payload
            };

        case CHANGE_ACTIVE_GENRE:
            return {
                ...state,
                activeGenre: payload
            };

        case CHANGE_ACTIVE_SORTING:
            return {
                ...state,
                activeSorting: payload
            };

        case CLEAR_ALL_FILTERS:
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export default filterReducer;