import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import Button from './components/Button';
import MainHeading from './components/MainHeading';
import SearchLine from './containers/SearchLine';
import DetailsList from './containers/DetailsList';
import ColorPallete from './components/ColorPallete';
import MoviesList from './containers/MoviesList';
import MovieDetails from './containers/MoviesList/MovieDetails';
import GenresToggle from './containers/GenresToggle';
import SortingToggle from './containers/SortingToggle';
import MoviesCounter from './components/MoviesCounter';
import ErrorBoundary from './containers/ErrorBoundary';

import InfoModal from './modals/InfoModal';
import MovieItemModal from './modals/MovieItemModal';

import { openAddMovieModal, openCongratsMovieModal, closeAllModals } from './store/actions/modalActions';
import { getMoviesAsync, addMovieAsync, deleteMovieAsync, updateMovieAsync } from './store/actions/moviesActions';
import { clearAllFilters } from './store/actions/filterActions';

import styles from './app.modules.scss';
import checkmark from './assets/images/checkmark.png';

const HOME_PAGE_HEADING = 'Find your movie';
const ADD_MOVIE_CONGRATS_MODAL_HEADING = 'Congratulations!';
const ADD_MOVIE_CONGRATS_MODAL_TEXT = 'The movie has been added to database successfully!';
const DELETE_MOVIE_CONFIRMATION_MODAL_HEADING = 'Delete movie';
const DELETE_MOVIE_CONFIRMATION_MODAL_TEXT = 'Are you sure you want to delete this movie?';

const App = (props) => {
    let [activeMovie, setActiveMovie] = useState({});

    const closeModal = () => {
        const { closeAllModals } = props;

        closeAllModals();
    };

    const addMovieItemHandler = movie => {
        const { addMovieAsync, openCongratsMovieModal, closeAllModals } = props;

        addMovieAsync(movie);
        closeAllModals();
        openCongratsMovieModal();
    };

    const editMovieItemHandler = movie => {
        const { updateMovieAsync, closeAllModals } = props;

        updateMovieAsync(movie);
        closeAllModals();
    };

    const deleteMovieItemHandler = () => {
        const { deleteMovieAsync, closeAllModals, deleteMovieId } = props;

        deleteMovieAsync(deleteMovieId);
        closeAllModals();
    };

    const logoClickHandler = () => {
        const { getMoviesAsync, clearAllFilters } = props;

        getMoviesAsync();
        clearAllFilters();
    };

    const showMovieDetails = id => setActiveMovie(props.filteredMovies.find(movie => movie.id === id));

    const hideMovieDetails = () => setActiveMovie({});

    const renderMovieAddedCongrats = () => (
        <>
            <img className={styles['modal-icon']} src={checkmark} alt='modal icon'/>
            <MainHeading text={ADD_MOVIE_CONGRATS_MODAL_HEADING} />
            <p className={styles['modal-text']}>
                {ADD_MOVIE_CONGRATS_MODAL_TEXT}
            </p>
        </>
    );

    const renderMovieDeleteConfirmation = () => (
        <>
            <MainHeading text={DELETE_MOVIE_CONFIRMATION_MODAL_HEADING} />
            <p className={styles['modal-text']}>
                {DELETE_MOVIE_CONFIRMATION_MODAL_TEXT}
            </p>
            <div className={styles['modal-button']}>
                <Button clickHandler={deleteMovieItemHandler} value='Confirm' />
            </div>
        </>
    );

    return (
        <div className={styles['container']}>
            <div className={styles['wrapper']}>
                {
                    activeMovie.id ? (
                        <Header>
                            <div className={styles['upper-line']}>
                                <Logo clickHandler={logoClickHandler} />
                                <Button value='X' clickHandler={hideMovieDetails}/>
                            </div>
                            <MovieDetails movie={activeMovie} />
                        </Header>
                    ) : (
                        <Header>
                            <div className={styles['upper-line']}>
                                <Logo clickHandler={logoClickHandler} />
                                <Button value='+ Add Movie' clickHandler={props.openAddMovieModal} />
                            </div>
                            <div className={styles['heading']}>
                                <MainHeading text={HOME_PAGE_HEADING}/>
                            </div>
                            <SearchLine />
                        </Header>
                    )
                }
                <Main>
                    <ErrorBoundary>
                        <section className={styles['filter-line']}>
                            <GenresToggle />
                            <SortingToggle />
                        </section>
                        <MoviesCounter length={props.filteredMovies.length}/>
                        <MoviesList clickHandler={showMovieDetails} />
                    </ErrorBoundary>
                </Main>
                <Footer>
                    <Logo />
                </Footer>
                {props.isAddMovieCongratsModalOpen && <InfoModal render={renderMovieAddedCongrats} closeHandler={closeModal} />}
                {props.isDeleteMovieConfirmModalOpen && <InfoModal render={renderMovieDeleteConfirmation} closeHandler={closeModal} />}
                {props.isAddMovieModalOpen && <MovieItemModal mode='add' closeHandler={closeModal} submitHandler={addMovieItemHandler} />}
                {props.isEditMovieModalOpen && <MovieItemModal mode='edit' closeHandler={closeModal} submitHandler={editMovieItemHandler} movie={props.editMovie} />}
            </div>
            <aside className={styles['sidebar']}>
                <Sidebar>
                    <DetailsList />
                    <ColorPallete />
                </Sidebar>
            </aside>
        </div>
    );
}

App.propTypes = {
    filteredMovies: PropTypes.array.isRequired,
    editMovie: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    deleteMovieId: PropTypes.string.isRequired,
    isAddMovieCongratsModalOpen: PropTypes.bool.isRequired,
    isDeleteMovieConfirmModalOpen: PropTypes.bool.isRequired,
    isAddMovieModalOpen: PropTypes.bool.isRequired,
    isEditMovieModalOpen: PropTypes.bool.isRequired,
    openAddMovieModal: PropTypes.func.isRequired,
    openCongratsMovieModal: PropTypes.func.isRequired,
    closeAllModals: PropTypes.func.isRequired,
    addMovieAsync: PropTypes.func.isRequired,
    updateMovieAsync: PropTypes.func.isRequired,
    deleteMovieAsync: PropTypes.func.isRequired,
    getMoviesAsync: PropTypes.func.isRequired,
    clearAllFilters: PropTypes.func.isRequired
};

const mapStateToProps = ({movies, modals}) => ({
    filteredMovies: movies.filteredMovies,
    editMovie: movies.editMovie,
    deleteMovieId: movies.deleteMovieId,
    isAddMovieCongratsModalOpen: modals.isAddMovieCongratsModalOpen,
    isDeleteMovieConfirmModalOpen: modals.isDeleteMovieConfirmModalOpen,
    isAddMovieModalOpen: modals.isAddMovieModalOpen,
    isEditMovieModalOpen: modals.isEditMovieModalOpen
});

const mapDispatchToProps = (dispatch) => ({
    openAddMovieModal: () => dispatch(openAddMovieModal()),
    openCongratsMovieModal: () => dispatch(openCongratsMovieModal()),
    closeAllModals: () => dispatch(closeAllModals()),
    addMovieAsync: (movie) => dispatch(addMovieAsync(movie)),
    updateMovieAsync: (movie) => dispatch(updateMovieAsync(movie)),
    deleteMovieAsync: (id) => dispatch(deleteMovieAsync(id)),
    getMoviesAsync: () => dispatch(getMoviesAsync()),
    clearAllFilters: () => dispatch(clearAllFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);