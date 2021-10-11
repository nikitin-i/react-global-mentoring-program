import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './sortingtoggle.modules.scss';

const SORT_ROW = 'Sort By:';
const SORT_ITEMS = ['Title', 'Release Date'];

const SortingToggle = ({submitHandler}) => {
    const [activeToggle, setActiveToggle] = useState('');
    const [reverseOrder, setReverseOrder] = useState(false);

    const changeActiveToggle = ({target: {id}}) => {
        if (id !== activeToggle) {
            setActiveToggle(id);
            submitHandler(id, false);
            setReverseOrder(false);
        } else {
            submitHandler(id, !reverseOrder);
            setReverseOrder(!reverseOrder);
        }
    };

    return (
        <section className={style['sort-toggle']}>
            <div className={style['sort-toggle__item']}>{SORT_ROW}</div>;
            {
                SORT_ITEMS.map(item => {
                    const isReverse = reverseOrder && activeToggle === item ? style['sort-toggle__item--active-revers'] : style['sort-toggle__item--active'];
                    const classList = activeToggle === item ? `${style['sort-toggle__item']} ${isReverse}` : style['sort-toggle__item'];

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