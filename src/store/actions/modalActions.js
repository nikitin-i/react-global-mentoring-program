import {
    OPEN_ADD_MOVIE_MODAL,
    OPEN_EDIT_MOVIE_MODAL,
    OPEN_DELETE_MOVIE_MODAL,
    OPEN_CONGRATS_MOVIE_MODAL,
    CLOSE_ALL_MODALS
} from '../types';

export const openAddMovieModal = () => ({
    type: OPEN_ADD_MOVIE_MODAL,
    payload: true
});

export const openEditMovieModal = () => ({
    type: OPEN_EDIT_MOVIE_MODAL,
    payload: true
});

export const openDeleteMovieModal = () => ({
    type: OPEN_DELETE_MOVIE_MODAL,
    payload: true
});

export const openCongratsMovieModal = () => ({
    type: OPEN_CONGRATS_MOVIE_MODAL,
    payload: true
});

export const closeAllModals = () => ({
    type: CLOSE_ALL_MODALS
});