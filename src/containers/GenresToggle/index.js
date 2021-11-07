import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeActiveGenre } from '../../store/actions/filterActions';
import { getMoviesAsync } from '../../store/actions/moviesActions';

import { formParamsObj } from '../../utils/utils';
import GenresItem from './GenresItem';
import styles from './genrestoggle.modules.scss';

const GENRES_LIST = ['All', 'Drama', 'Family', 'Comedy', 'Thriller'];

const GenresToggle = ({searchLine, activeGenre, activeSorting, getMoviesAsync, changeActiveGenre}) => {
    const chooseActiveGenre = genre => {
        getMoviesAsync(formParamsObj(searchLine, genre, activeSorting));
        changeActiveGenre(genre);
    };

    return (
        <ul className={styles['genre-list']}>
            {
                GENRES_LIST.map((genre) => <GenresItem
                    value={genre}
                    key={genre}
                    active={activeGenre === genre}
                    clickHandler={chooseActiveGenre}/>)
            }
        </ul>
    );
};

GenresToggle.propTypes = {
    activeSorting: PropTypes.object.isRequired,
    searchLine: PropTypes.string.isRequired,
    activeGenre: PropTypes.string.isRequired,
    getMoviesAsync: PropTypes.func.isRequired,
    changeActiveGenre: PropTypes.func.isRequired,
};

const mapStateToProps = ({filters}) => ({
    activeSorting: filters.activeSorting,
    searchLine: filters.searchLine,
    activeGenre: filters.activeGenre
});

const mapDispatchToProps = {
    getMoviesAsync,
    changeActiveGenre
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresToggle);