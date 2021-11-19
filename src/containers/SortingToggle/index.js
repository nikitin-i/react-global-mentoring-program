import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { changeActiveSorting } from '../../store/actions/filterActions';
import { getMoviesAsync } from '../../store/actions/moviesActions';
import { useCustomSearchParams } from '../../hooks/useCustomSearchParams';

import { formParamsObj } from '../../utils/utils';
import style from './sortingtoggle.modules.scss';

const SORT_ROW = 'Sort By:';
const SORT_ITEMS = ['Title', 'Release Date'];

export const SortingToggle = ({activeSorting, activeGenre, searchLine, getMoviesAsync, changeActiveSorting}) => {
    const [searchParams, updateSearchParams] = useCustomSearchParams();
    const { searchQuery } = useParams();

    useEffect(() => {
        if (searchParams.has('sortBy')) {
            const sortingObj = {
                str: searchParams.get('sortBy').replace('+', ' '),
                reverse: false
            };

            changeActiveSorting(sortingObj);

            if (!searchParams.has('genre') && !searchQuery) {
                getMoviesAsync(formParamsObj(null, null, sortingObj));
            }
        }
    }, []);

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
        updateSearchParams({sortBy: id});
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

const mapDispatchToProps = {
    getMoviesAsync,
    changeActiveSorting
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingToggle);