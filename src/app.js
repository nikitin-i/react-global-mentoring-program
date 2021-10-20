import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

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

import { closeAllModals, deleteMovieAsync } from './store/actions';
import { moviesContext } from './context/moviesContext';

import styles from './app.modules.scss';
import checkmark from './assets/images/checkmark.png';

const HOME_PAGE_HEADING = 'Find your movie';
const ADD_MOVIE_CONGRATS_MODAL_HEADING = 'Congratulations!';
const ADD_MOVIE_CONGRATS_MODAL_TEXT = 'The movie has been added to database successfully!';
const DELETE_MOVIE_CONFIRMATION_MODAL_HEADING = 'Delete movie';
const DELETE_MOVIE_CONFIRMATION_MODAL_TEXT = 'Are you sure you want to delete this movie?';
const MOVIES_SERVER_URL = 'http://localhost:4000/movies';

const App = (props) => {
    const initialState = {
        movies: [],
        filteredMovies: [],
        deleteMovieId: '',
        editMovie: '',
        activeMovie: {},
        isAddMovieCongratsModalOpen: false,
        isDeleteMovieConfirmModalOpen: false,
        isAddMovieModalOpen: false,
        isEditMovieModalOpen: false
    };

    let [state, setState] = useState(initialState);

    const openDeleteMovieConfirmationModal = id => setState({
        ...state,
        isDeleteMovieConfirmModalOpen: true,
        deleteMovieId: id
    });

    const openAddMovieModal = () => setState({
        ...state,
        isAddMovieModalOpen: true
    });

    const openEditMovieModal = id => setState({
        ...state,
        isEditMovieModalOpen: true,
        editMovie: state.movies.find(movie => movie.id === id)
    });

    const closeModal = () => {
        props.closeAllModals();
    };

    const addMovieItem = movie => {
        fetch(MOVIES_SERVER_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Movie has not been added');
            })
            .then(response => addMovieItemSuccessHandler(response))
            .catch(error => errorHandler(error));
    };

    const editMovieItem = movie => {
        fetch(MOVIES_SERVER_URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Movie has not been edited');
            })
            .then(response => editMovieItemSuccessHandler(response))
            .catch(error => errorHandler(error));
    };

    const errorHandler = error => console.error(`We did not manage to process it due to: ${error.message}`);

    const deleteMovieItemHandler = () => {
        const { deleteMovieAsync, closeAllModals } = props;

        deleteMovieAsync(props.deleteMovieId);
        closeAllModals();
    };

    const addMovieItemSuccessHandler = movie => {
        updateMoviesList(movie, 'add');
    };

    const editMovieItemSuccessHandler = movie => {
        updateMoviesList(movie, 'edit');
    };

    const updateMoviesList = (data, mode) => {
        switch(mode) {
            case 'add':
                setState({
                    ...state,
                    isAddMovieModalOpen: false,
                    isAddMovieCongratsModalOpen: true,
                    movies: [...state.movies, data],
                    filteredMovies: [...state.movies, data]
                });

                break;

            case 'delete':
                const filteredMovies = state.movies.filter(movie => movie.id !== data);

                setState({
                    ...state,
                    isDeleteMovieConfirmModalOpen: false,
                    movies: filteredMovies,
                    filteredMovies,
                    deleteMovieId: ''
                });

                break;

            case 'edit':
                const mappedMovies = state.movies.map(movie => {
                    if (movie.id === data.id) {
                        return data;
                    }

                    return movie;
                });

                setState({
                    ...state,
                    isEditMovieModalOpen: false,
                    movies: mappedMovies,
                    filteredMovies: mappedMovies
                });

                break;

            case 'update':
                setState({
                    ...state,
                    movies: data.data,
                    filteredMovies: data.data
                });

                break;
        }

    };

    const filterMoviesListByGenre = genre => {
        if (genre !== 'All') {
            const filteredMovies = _.filter(state.movies, movie => _.includes(movie.genres, genre));

            setState({
                ...state,
                filteredMovies
            });
        } else {
            setState({
                ...state,
                filteredMovies: state.movies
            });
        }
    };

    const filterMoviesListBySort = (sort, reverse) => {
        let filteredMovies = [];
        let order = reverse ? ['desc'] : ['asc'];

        if (sort === 'Title') {
            filteredMovies = _.orderBy(state.movies, ['title'], order);
        } else if (sort === 'Release Date') {
            filteredMovies = _.orderBy(state.movies, ['release_date'], order);
        }

        setState({
            ...state,
            filteredMovies
        });
    };

    const searchMovies = value => setState({
        ...state,
        filteredMovies: state.movies.filter(({title}) => title.toLowerCase().includes(value.toLowerCase()))
    });

    const showMovieDetails = id => setState({
        ...state,
        activeMovie: state.movies.find(movie => movie.id === id)
    });

    const hideMovieDetails = () => setState({
        ...state,
        activeMovie: {}
    });

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
                    state.activeMovie.id ? (
                        <Header>
                            <div className={styles['upper-line']}>
                                <Logo />
                                <Button value='X' clickHandler={hideMovieDetails}/>
                            </div>
                            <MovieDetails movie={state.activeMovie} />
                        </Header>
                    ) : (
                        <Header>
                            <div className={styles['upper-line']}>
                                <Logo />
                                <Button value='+ Add Movie' clickHandler={openAddMovieModal}/>
                            </div>
                            <div className={styles['heading']}>
                                <MainHeading text={HOME_PAGE_HEADING}/>
                            </div>
                            <SearchLine submitHandler={searchMovies}/>
                        </Header>
                    )
                }
                <moviesContext.Provider value={state.filteredMovies}>
                    <Main>
                        <ErrorBoundary>
                            <section className={styles['filter-line']}>
                                <GenresToggle changeHandler={filterMoviesListByGenre}/>
                                <SortingToggle submitHandler={filterMoviesListBySort}/>
                            </section>
                            <MoviesCounter />
                            <MoviesList
                                deleteHandler={openDeleteMovieConfirmationModal}
                                editHandler={openEditMovieModal}
                                clickHandler={showMovieDetails} />
                        </ErrorBoundary>
                    </Main>
                </moviesContext.Provider>
                <Footer>
                    <Logo />
                </Footer>
                {props.isAddMovieCongratsModalOpen && <InfoModal render={renderMovieAddedCongrats} closeHandler={closeModal} />}
                {props.isDeleteMovieConfirmModalOpen && <InfoModal render={renderMovieDeleteConfirmation} closeHandler={closeModal} />}
                {props.isAddMovieModalOpen && <MovieItemModal mode='add' closeHandler={closeModal} submitHandler={addMovieItem} />}
                {props.isEditMovieModalOpen && <MovieItemModal mode='edit' closeHandler={closeModal} submitHandler={editMovieItem} movie={props.editMovie} />}
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

const mapStateToProps = ({movies, modals}) => ({
    editMovie: movies.editMovie,
    deleteMovieId: movies.deleteMovieId,
    isAddMovieCongratsModalOpen: modals.isAddMovieCongratsModalOpen,
    isDeleteMovieConfirmModalOpen: modals.isDeleteMovieConfirmModalOpen,
    isAddMovieModalOpen: modals.isAddMovieModalOpen,
    isEditMovieModalOpen: modals.isEditMovieModalOpen
});

const mapDispatchToProps = (dispatch) => ({
    closeAllModals: () => dispatch(closeAllModals()),
    deleteMovieAsync: (id) => dispatch(deleteMovieAsync(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);