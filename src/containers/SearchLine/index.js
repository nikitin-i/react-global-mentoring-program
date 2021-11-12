import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './searchline.modules.scss';

import { searchMovie } from '../../store/actions/filterActions';
import { getMoviesAsync } from '../../store/actions/moviesActions';

import { formParamsObj } from '../../utils/utils';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useCustomSearchParams } from '../../hooks/useCustomSearchParams';

const ENTER_BUTTON_KEY_CODE = 13;

const SearchLine = ({searchLine, activeGenre, activeSorting, getMoviesAsync, searchMovie}) => {
    const [searchParams] = useCustomSearchParams();
    const { searchQuery } = useParams();
    const [search, setSearch] = useState(searchLine);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSearch(searchLine);
    }, [searchLine]);

    useEffect(() => {
        if (searchQuery) {
            const genre = searchParams.get('genre') || null;
            const sortBy = searchParams.has('sortBy') ?
                {
                    str: searchParams.get('sortBy').replace('+', ' '),
                    reverse: false
                } :
                null;

            getMoviesAsync(formParamsObj(searchQuery, genre, sortBy));
            searchMovie(searchQuery);
        }
    }, [])

    const submitSearchRequest = () => {
        getMoviesAsync(formParamsObj(search, activeGenre, activeSorting));
        searchMovie(search);

        navigate(`/search/${search}${location.search ? location.search : ''}`);
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