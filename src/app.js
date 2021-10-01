import React, {Component} from 'react';
import _ from 'lodash';

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
import GenresToggle from './containers/GenresToggle';
import SortingToggle from './containers/SortingToggle';
import MoviesCounter from './components/MoviesCounter';
import ErrorBoundary from './containers/ErrorBoundary';

import InfoModal from './modals/InfoModal';
import MovieItemModal from './modals/MovieItemModal';

import styles from './app.modules.scss';
import checkmark from './assets/images/checkmark.png';

const HOME_PAGE_HEADING = 'Find your movie';
const ADD_MOVIE_CONGRATS_MODAL_HEADING = 'Congratulations!';
const ADD_MOVIE_CONGRATS_MODAL_TEXT = 'The movie has been added to database successfully!';
const DELETE_MOVIE_CONFIRMATION_MODAL_HEADING = 'Delete movie';
const DELETE_MOVIE_CONFIRMATION_MODAL_TEXT = 'Are you sure you want to delete this movie?';
const MOVIES_SERVER_URL = 'http://localhost:4000/movies';

class App extends Component {
    state = {
        movies: [],
        filteredMovies: [],
        deleteMovieId: '',
        editMovie: '',
        isAddMovieCongratsModalOpen: false,
        isDeleteMovieConfirmModalOpen: false,
        isAddMovieModalOpen: false,
        isEditMovieModalOpen: false
    };

    componentDidMount() {
        this.getAllMovies();
    }

    openAddMovieCongratsModal = () => this.setState(() => ({
        isAddMovieCongratsModalOpen: true
    }));

    closeAddMovieCongratsModal = () => this.setState(() => ({
        isAddMovieCongratsModalOpen: false
    }));

    openDeleteMovieConfirmationModal = id => this.setState(() => ({
        isDeleteMovieConfirmModalOpen: true,
        deleteMovieId: id
    }));

    closeDeleteMovieConfirmationModal = () => this.setState(() => ({
        isDeleteMovieConfirmModalOpen: false
    }));

    openAddMovieModal = () => this.setState(() => ({
        isAddMovieModalOpen: true
    }));

    closeAddMovieModal = () => this.setState(() => ({
        isAddMovieModalOpen: false
    }));

    openEditMovieModal = id => this.setState(state => ({
        isEditMovieModalOpen: true,
        editMovie: state.movies.filter(movie => movie.id === id)[0]
    }));

    closeEditMovieModal = () => this.setState(() => ({
        isEditMovieModalOpen: false
    }));

    getAllMovies = () => {
        fetch(`${MOVIES_SERVER_URL}?limit=30`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Server response error');
            })
            .then(response => this.updateMoviesList(response, 'update'))
            .catch(error => this.errorHandler(error));
    };

    addMovieItem = movie => {
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
            .then(response => this.addMovieItemSuccessHandler(response))
            .catch(error => this.errorHandler(error));
    };

    editMovieItem = movie => {
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
            .then(response => this.editMovieItemSuccessHandler(response))
            .catch(error => this.errorHandler(error));
    };

    deleteMovieItem = id => {
        fetch(`${MOVIES_SERVER_URL}/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    return this.deleteMovieItemSuccessHandler();
                }

                throw new Error('Movie has not been deleted');
            })
            .catch(error => this.errorHandler(error));
    };

    errorHandler = error => console.error(`We did not manage to process it due to: ${error.message}`);

    deleteMovieItemHandler = () => {
        this.closeDeleteMovieConfirmationModal();
        this.deleteMovieItem(this.state.deleteMovieId);
    };

    addMovieItemSuccessHandler = movie => {
        this.closeAddMovieModal();
        this.openAddMovieCongratsModal();
        this.updateMoviesList(movie, 'add');
    };

    editMovieItemSuccessHandler = movie => {
        this.closeEditMovieModal();
        this.updateMoviesList(movie, 'edit');
    };

    deleteMovieItemSuccessHandler = () => {
        this.closeDeleteMovieConfirmationModal();
        this.updateMoviesList(this.state.deleteMovieId, 'delete');

        this.setState(() => ({
            deleteMovieId: ''
        }));
    };

    updateMoviesList = (data, mode) => {
        switch(mode) {
            case 'add':
                this.setState(state => ({
                    movies: [...state.movies, data],
                    filteredMovies: [...state.movies, data]
                }));

                break;

            case 'delete':
                const filteredMovies = this.state.movies.filter(movie => movie.id !== data);

                this.setState(() => ({
                    movies: filteredMovies,
                    filteredMovies
                }));

                break;

            case 'edit':
                const mappedMovies = this.state.movies.map(movie => {
                    if (movie.id === data.id) {
                        return data;
                    }

                    return movie;
                });

                this.setState(() => ({
                    movies: mappedMovies,
                    filteredMovies: mappedMovies
                }));

                break;

            case 'update':
                this.setState(() => ({
                    movies: data.data,
                    filteredMovies: data.data
                }));

                break;
        }

    };

    filterMoviesListByGenre = genre => {
        if (genre !== 'All') {
            const { movies } = this.state;
            const filteredMovies = _.filter(movies, movie => _.includes(movie.genres, genre));

            this.setState(() => ({
                filteredMovies
            }));
        } else {
            this.setState(state => ({
                filteredMovies: state.movies
            }));
        }
    };

    filterMoviesListBySort = sort => {
        const { movies } = this.state;
        let filteredMovies = [];

        if (sort === 'Title') {
            filteredMovies = _.sortBy(movies, ['title']);
        } else if (sort === 'Release Date') {
            filteredMovies = _.sortBy(movies, ['release_date']);
        }

        this.setState(() => ({
            filteredMovies
        }));
    };

    searchMovies = value => this.setState(state => ({
        filteredMovies: state.movies.filter(({title}) => title.toLowerCase().includes(value.toLowerCase()))
    }));

    renderMovieAddedCongrats = () => (
        <>
            <img className={styles['modal-icon']} src={checkmark} alt='modal icon'/>
            <MainHeading text={ADD_MOVIE_CONGRATS_MODAL_HEADING} />
            <p className={styles['modal-text']}>
                {ADD_MOVIE_CONGRATS_MODAL_TEXT}
            </p>
        </>
    );

    renderMovieDeleteConfirmation = () => (
        <>
            <MainHeading text={DELETE_MOVIE_CONFIRMATION_MODAL_HEADING} />
            <p className={styles['modal-text']}>
                {DELETE_MOVIE_CONFIRMATION_MODAL_TEXT}
            </p>
            <div className={styles['modal-button']}>
                <Button clickHandler={this.deleteMovieItemHandler} value='Confirm' />
            </div>
        </>
    );

    render = () => {
        const {
            filteredMovies,
            isAddMovieCongratsModalOpen,
            isDeleteMovieConfirmModalOpen,
            isAddMovieModalOpen,
            isEditMovieModalOpen,
            editMovie
        } = this.state;

        return (
            <div className={styles['container']}>
                <div className={styles['wrapper']}>
                    <Header>
                        <div className={styles['upper-line']}>
                            <Logo />
                            <Button value='+ Add Movie' clickHandler={this.openAddMovieModal}/>
                        </div>
                        <div className={styles['heading']}>
                            <MainHeading text={HOME_PAGE_HEADING}/>
                        </div>
                        <SearchLine submitHandler={this.searchMovies}/>
                    </Header>
                    <Main>
                        <ErrorBoundary>
                            <section className={styles['filter-line']}>
                                <GenresToggle changeHandler={this.filterMoviesListByGenre}/>
                                <SortingToggle submitHandler={this.filterMoviesListBySort}/>
                            </section>
                            <MoviesCounter amount={filteredMovies.length}/>
                            <MoviesList
                                movies={filteredMovies}
                                deleteHandler={this.openDeleteMovieConfirmationModal}
                                editHandler={this.openEditMovieModal} />
                        </ErrorBoundary>
                    </Main>
                    <Footer>
                        <Logo />
                    </Footer>
                    {isAddMovieCongratsModalOpen && <InfoModal render={this.renderMovieAddedCongrats} closeHandler={this.closeAddMovieCongratsModal} />}
                    {isDeleteMovieConfirmModalOpen && <InfoModal render={this.renderMovieDeleteConfirmation} closeHandler={this.closeDeleteMovieConfirmationModal} />}
                    {isAddMovieModalOpen && <MovieItemModal mode='add' closeHandler={this.closeAddMovieModal} submitHandler={this.addMovieItem} />}
                    {isEditMovieModalOpen && <MovieItemModal mode='edit' closeHandler={this.closeEditMovieModal} submitHandler={this.editMovieItem} movie={editMovie} />}
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
}

export default App;