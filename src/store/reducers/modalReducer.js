import {
    OPEN_ADD_MOVIE_MODAL,
    OPEN_EDIT_MOVIE_MODAL,
    OPEN_DELETE_MOVIE_MODAL,
    OPEN_CONGRATS_MOVIE_MODAL,
    CLOSE_ALL_MODALS
} from '../types';

const initialState = {
    isAddMovieCongratsModalOpen: false,
    isDeleteMovieConfirmModalOpen: false,
    isAddMovieModalOpen: false,
    isEditMovieModalOpen: false
};

const modalReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case OPEN_ADD_MOVIE_MODAL:
            return {
                ...state,
                isAddMovieModalOpen: payload
            };

        case OPEN_EDIT_MOVIE_MODAL:
            return {
                ...state,
                isEditMovieModalOpen: payload
            };

        case OPEN_DELETE_MOVIE_MODAL:
            return {
                ...state,
                isDeleteMovieConfirmModalOpen: payload
            };

        case OPEN_CONGRATS_MOVIE_MODAL:
            return {
                ...state,
                isAddMovieCongratsModalOpen: payload
            };

        case CLOSE_ALL_MODALS:
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export default modalReducer;