import modalReducer from '../modalReducer';
import { openAddMovieModal, openEditMovieModal, openDeleteMovieModal, openCongratsMovieModal, closeAllModals } from '../../actions/modalActions';

const initialState = {
    isAddMovieCongratsModalOpen: false,
    isDeleteMovieConfirmModalOpen: false,
    isAddMovieModalOpen: false,
    isEditMovieModalOpen: false
};

describe('Modal Reducer', () => {
    it('should return the initial state', () => {
        expect(modalReducer(undefined, initialState)).toEqual(initialState);
    });

    it('should handle OPEN_ADD_MOVIE_MODAL', () => {
        const isAddMovieModalOpen = true;

        expect(modalReducer(initialState, openAddMovieModal(isAddMovieModalOpen))).toEqual({...initialState, isAddMovieModalOpen});
    });

    it('should handle OPEN_EDIT_MOVIE_MODAL', () => {
        const isEditMovieModalOpen = true;

        expect(modalReducer(initialState, openEditMovieModal(isEditMovieModalOpen))).toEqual({...initialState, isEditMovieModalOpen});
    });

    it('should handle OPEN_DELETE_MOVIE_MODAL', () => {
        const isDeleteMovieConfirmModalOpen = true;

        expect(modalReducer(initialState, openDeleteMovieModal(isDeleteMovieConfirmModalOpen))).toEqual({...initialState, isDeleteMovieConfirmModalOpen});
    });

    it('should handle OPEN_CONGRATS_MOVIE_MODAL', () => {
        const isAddMovieCongratsModalOpen = true;

        expect(modalReducer(initialState, openCongratsMovieModal(isAddMovieCongratsModalOpen))).toEqual({...initialState, isAddMovieCongratsModalOpen});
    });

    it('should handle CLOSE_ALL_MODALS', () => {
        expect(modalReducer(initialState, closeAllModals())).toEqual(initialState);
    });
});