import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './searchline.modules.scss';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SearchLine = ({submitHandler}) => {
    const [search, setSearch] = useState('');

    const submitSearchRequest = () => submitHandler(search);
    const changeSearchLine = ({target: {value}}) => setSearch(value);

    return (
        <section className={styles['search-line']}>
            <Input placeholder='What do you want to watch?' value={search} changeHandler={changeSearchLine}/>
            <Button value='Search' clickHandler={submitSearchRequest}/>
        </section>
    );
};

SearchLine.propTypes = {
    submitHandler: PropTypes.func.isRequired
};

export default SearchLine;