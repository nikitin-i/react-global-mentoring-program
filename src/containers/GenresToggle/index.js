import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { changeActiveGenre } from '../../store/actions/filterActions';
import { getMoviesAsync } from '../../store/actions/moviesActions';
import { useCustomSearchParams } from '../../hooks/useCustomSearchParams';

import { formParamsObj } from '../../utils/utils';
import GenresItem from './GenresItem';
import styles from './genrestoggle.modules.scss';

const GENRES_LIST = ['All', 'Drama', 'Family', 'Comedy', 'Thriller'];

const GenresToggle = ({searchLine, activeGenre, activeSorting, getMoviesAsync, changeActiveGenre}) => {
    const [searchParams, updateSearchParams] = useCustomSearchParams();
    const { searchQuery } = useParams();

    useEffect(() => {
        if (searchParams.has('genre')) {
            const genre = searchParams.get('genre');

            changeActiveGenre(genre);

            if (!searchParams.has('sortBy') && !searchQuery) {
                getMoviesAsync(formParamsObj(null, genre, null));
            }
        }
    }, []);

    const chooseActiveGenre = genre => {
        getMoviesAsync(formParamsObj(searchLine, genre, activeSorting));
        changeActiveGenre(genre);
        updateSearchParams({genre});
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