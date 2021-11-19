import filterReducer from '../filterReducer';
import { changeActiveGenre, changeActiveSorting, searchMovie, clearAllFilters } from '../../actions/filterActions';

const initialState = {
    activeGenre: 'All',
    activeSorting: {},
    searchLine: '',
};

describe('Filter Reducer', () => {
    it('should return the initial state', () => {
        expect(filterReducer(undefined, initialState)).toEqual(initialState);
    });

    it('should handle CHANGE_ACTIVE_GENRE', () => {
        const genre = 'Comedy';

        expect(filterReducer(initialState, changeActiveGenre(genre))).toEqual({...initialState, activeGenre: genre});
    });

    it('should handle CHANGE_ACTIVE_SORTING', () => {
        const sorting = {
            str: 'Title',
            reverse: false
        };

        expect(filterReducer(initialState, changeActiveSorting(sorting))).toEqual({...initialState, activeSorting: sorting});
    });

    it('should handle SEARCH_MOVIE', () => {
        const searchMovieRequest = 'test query';

        expect(filterReducer(initialState, searchMovie(searchMovieRequest))).toEqual({...initialState, searchLine: searchMovieRequest});
    });

    it('should handle CLEAR_ALL_FILTERS', () => {
        expect(filterReducer(initialState, clearAllFilters())).toEqual(initialState);
    });
});