import React from 'react';
import { connect } from 'react-redux';

import { changeActiveSorting } from '../../store/actions';
import style from './sortingtoggle.modules.scss';

const SORT_ROW = 'Sort By:';
const SORT_ITEMS = ['Title', 'Release Date'];

const SortingToggle = ({activeSorting, changeActiveSorting}) => {
    const changeActiveToggle = ({target: {id}}) => {
        if (id !== activeSorting.str) {
            changeActiveSorting(id, false);
        } else {
            changeActiveSorting(id, !activeSorting.reverse);
        }
    };

    return (
        <section className={style['sort-toggle']}>
            <div className={style['sort-toggle__item']}>{SORT_ROW}</div>;
            {
                SORT_ITEMS.map(item => {
                    const isReverse = activeSorting.reverse && activeSorting.str === item ? style['sort-toggle__item--active-revers'] : style['sort-toggle__item--active'];
                    const classList = activeSorting.str === item ? `${style['sort-toggle__item']} ${isReverse}` : style['sort-toggle__item'];

                    return <div id={item} className={classList} key={item} onClick={changeActiveToggle}>{item}</div>;
                })
            }
        </section>
    );
};

const mapStateToProps = ({movies}) => ({
    activeSorting: movies.activeSorting
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveSorting: (str, reverse) => dispatch(changeActiveSorting(str, reverse))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingToggle);