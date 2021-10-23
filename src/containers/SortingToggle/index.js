import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeActiveSorting } from '../../store/actions/filterActions';
import { getMoviesAsync } from '../../store/actions/moviesActions';

import { formParamsObj } from '../../utils/utils';
import style from './sortingtoggle.modules.scss';

const SORT_ROW = 'Sort By:';
const SORT_ITEMS = ['Title', 'Release Date'];

const SortingToggle = ({activeSorting, activeGenre, searchLine, getMoviesAsync, changeActiveSorting}) => {
    const changeActiveToggle = ({target: {id}}) => {
        const sortingObj = {
            str: id
        };

        if (id !== activeSorting.str) {
            sortingObj.reverse = false;
        } else {
            sortingObj.reverse = !activeSorting.reverse;
        }

        getMoviesAsync(formParamsObj(searchLine, activeGenre, sortingObj));
        changeActiveSorting(sortingObj);
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

SortingToggle.propTypes = {
    activeSorting: PropTypes.object.isRequired,
    searchLine: PropTypes.string.isRequired,
    activeGenre: PropTypes.string.isRequired,
    getMoviesAsync: PropTypes.func.isRequired,
    changeActiveSorting: PropTypes.func.isRequired,
};

const mapStateToProps = ({filters}) => ({
    activeSorting: filters.activeSorting,
    searchLine: filters.searchLine,
    activeGenre: filters.activeGenre
});

const mapDispatchToProps = (dispatch) => ({
    getMoviesAsync: params => dispatch(getMoviesAsync(params)),
    changeActiveSorting: obj => dispatch(changeActiveSorting(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingToggle);