import { combineReducers } from 'redux';

import moviesReducer from './moviesReducer';
import modalReducer from './modalReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    modals: modalReducer,
    filters: filterReducer
});

export default rootReducer;