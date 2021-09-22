import React, {Component} from 'react';
import _ from 'lodash';

import MoviesList from './features/movies-list';
import GenreToggle from './features/genre-toggle';
import MoviesCounter from './features/movies-counter';

import './app.css';

const GET_MOVIES_URL = 'http://localhost:4000/movies?limit=15';

class App extends Component {
    state = {
        movies: [],
        filteredMovies: [],
        genres: ['All'],
        activeGenre: 'All'
    };

    componentDidMount() {
        fetch(GET_MOVIES_URL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Server response error');
            })
            .then(response => this.processResponse(response))
            .catch(error => this.errorHandler(error));
    }

    changeGenre = (genre) => {
        this.setState(state => ({
            activeGenre: genre
        }));

        this.filterMoviesList(genre);
    };

    processResponse(response) {
        this.extractAllGenres(response);
        this.saveMoviesList(response);
    }

    errorHandler(error) {
        console.error('We did not manage to get movies due to:', error.message);
    }

    extractAllGenres(response) {
        const {data} = response;
        const genres = _.uniq(_.flatten(_.map(data, movie => movie.genres)));

        this.setState((state) => ({
            genres: _.concat(state.genres, genres)
        }));
    }

    saveMoviesList(response) {
        const {data} = response;

        this.setState(() => ({
            movies: data,
            filteredMovies: data
        }));
    }

    filterMoviesList(genre) {
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
    }

    render() {
        const {genres, activeGenre, filteredMovies} = this.state;

        return (
            <div className='container'>
                <GenreToggle genres={genres} activeGenre={activeGenre} changeGenre={this.changeGenre}/>
                <MoviesCounter amount={filteredMovies.length}/>
                <MoviesList movies={filteredMovies}/>
            </div>
        );
    }
}

export default App;