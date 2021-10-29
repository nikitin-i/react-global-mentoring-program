import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './searchline.modules.scss';

import { searchMovie } from '../../store/actions/filterActions';
import { getMoviesAsync } from '../../store/actions/moviesActions';

import { formParamsObj } from '../../utils/utils';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ENTER_BUTTON_KEY_CODE = 13;

const SearchLine = ({searchLine, activeGenre, activeSorting, getMoviesAsync, searchMovie}) => {
    const [search, setSearch] = useState(searchLine);

    useEffect(() => {
        setSearch(searchLine);
    }, [searchLine])

    const submitSearchRequest = () => {
        getMoviesAsync(formParamsObj(search, activeGenre, activeSorting));
        searchMovie(search)
    };
    const changeSearchLine = ({target: {value}}) => setSearch(value);
    const keyDownHandler = ({keyCode}) => keyCode === ENTER_BUTTON_KEY_CODE && submitSearchRequest();

    return (
        <section className={styles['search-line']} onKeyDown={keyDownHandler}>
            <Input
                placeholder='What do you want to watch?'
                value={search}
                changeHandler={changeSearchLine}
            />
            <Button value='Search' clickHandler={submitSearchRequest}/>
        </section>
    );
};

SearchLine.propTypes = {
    activeSorting: PropTypes.object.isRequired,
    searchLine: PropTypes.string.isRequired,
    activeGenre: PropTypes.string.isRequired,
    getMoviesAsync: PropTypes.func.isRequired,
    searchMovie: PropTypes.func.isRequired,
};

const mapStateToProps = ({filters}) => ({
    activeSorting: filters.activeSorting,
    searchLine: filters.searchLine,
    activeGenre: filters.activeGenre
});

const mapDispatchToProps = {
    getMoviesAsync,
    searchMovie
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLine);