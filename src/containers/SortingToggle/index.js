import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './sortingtoggle.modules.scss';
import MovieItem from "../MoviesList/MoviesItem";

const SORT_ROW = 'Sort By:';
const SORT_ITEMS = ['Title', 'Release Date'];

const SortingToggle = ({submitHandler}) => {
    const [activeToggle, setActiveToggle] = useState('');

    const changeActiveToggle = ({target: {id}}) => {
        if (id !== activeToggle) {
            setActiveToggle(id);
            submitHandler(id);
        }
    };

    return (
        <section className={style['sort-toggle']}>
            <div className={style['sort-toggle__item']}>{SORT_ROW}</div>;
            {
                SORT_ITEMS.map(item => {
                    const classList = activeToggle === item ?
                        `${style['sort-toggle__item']} ${style['sort-toggle__item--active']}` :
                        style['sort-toggle__item'];

                    return <div id={item} className={classList} key={item} onClick={changeActiveToggle}>{item}</div>;
                })
            }
        </section>
    );
};

SortingToggle.propTypes = {
    submitHandler: PropTypes.func.isRequired
};

export default SortingToggle;