import React, {Component} from 'react';
import _ from 'lodash';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import Button from './components/Button';
import PageHeading from './components/PageHeading';
import SearchLine from './containers/SearchLine';
import DetailsList from './containers/DetailsList';
import ColorPallete from './components/ColorPallete';
import MoviesList from './containers/MoviesList';
import GenresToggle from './containers/GenresToggle';
import SortingToggle from './containers/SortingToggle';
import MoviesCounter from './components/MoviesCounter';
import ErrorBoundary from './containers/ErrorBoundary';

import styles from './app.modules.scss';

const HOME_PAGE_HEADING = 'Find your movie';
const GET_MOVIES_URL = 'http://localhost:4000/movies?limit=30';

class App extends Component {
    state = {
        movies: [],
        filteredMovies: []
    };

    componentDidMount = () => {
        fetch(GET_MOVIES_URL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Server response error');
            })
            .then(response => this.processResponse(response))
            .catch(error => this.errorHandler(error));
    };

    searchMovies = value => console.log(`We are searching movies for you by this search request - ${value}!`);

    openAddMovieModal = () => console.log('New movie might be successfully added!');

    errorHandler = error => console.error(`We did not manage to get movies due to: ${error.message}`);

    processResponse = response => this.saveMoviesList(response);

    saveMoviesList = response => {
        const {data} = response;

        this.setState(() => ({
            movies: data,
            filteredMovies: data
        }));
    };

    filterMoviesListByGenre = genre => {
        if (genre !== 'All') {
            const {movies} = this.state;
            const filteredMovies = _.filter(movies, movie => _.includes(movie.genres, genre));

            this.setState(state => ({
                filteredMovies
            }));
        } else {
            this.setState(state => ({
                filteredMovies: state.movies
            }));
        }
    };

    filterMoviesListBySort = sort => {
        const {movies} = this.state;
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

    render = () => {
        const {filteredMovies} = this.state;

        return (
            <div className={styles['container']}>
                <div className={styles['wrapper']}>
                    <Header>
                        <div className={styles['upper-line']}>
                            <Logo />
                            <Button value='+ Add Movie' clickHandler={this.openAddMovieModal}/>
                        </div>
                        <PageHeading text={HOME_PAGE_HEADING}/>
                        <SearchLine submitHandler={this.searchMovies}/>
                    </Header>
                    <Main>
                        <ErrorBoundary>
                            <section className={styles['filter-line']}>
                                <GenresToggle changeHandler={this.filterMoviesListByGenre}/>
                                <SortingToggle submitHandler={this.filterMoviesListBySort}/>
                            </section>
                            <MoviesCounter amount={filteredMovies.length}/>
                            <MoviesList movies={filteredMovies}/>
                        </ErrorBoundary>
                    </Main>
                    <Footer>
                        <Logo />
                    </Footer>
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