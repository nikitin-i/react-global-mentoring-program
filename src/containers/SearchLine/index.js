import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './searchline.modules.scss';

import { searchMovie } from '../../store/actions';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ENTER_BUTTON_KEY_CODE = 13;

const SearchLine = ({searchLine, searchMovie}) => {
    const [search, setSearch] = useState(searchLine);

    useEffect(() => {
        setSearch(searchLine);
    }, [searchLine])

    const submitSearchRequest = () => {
        searchMovie(search);
    };
    const changeSearchLine = ({target: {value}}) => setSearch(value);
    const keyDownHandler = ({keyCode}) => keyCode === ENTER_BUTTON_KEY_CODE && searchMovie(search);

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

const mapStateToProps = ({movies}) => ({
    searchLine: movies.searchLine
});

const mapDispatchToProps = (dispatch) => ({
    searchMovie: str => dispatch(searchMovie(str))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchLine);