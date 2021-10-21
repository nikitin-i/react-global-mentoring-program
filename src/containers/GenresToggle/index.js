import React from 'react';
import { connect } from 'react-redux';

import { changeActiveGenre } from '../../store/actions';
import GenresItem from './GenresItem';
import styles from './genrestoggle.modules.scss';

const GENRES_LIST = ['All', 'Drama', 'Family', 'Comedy', 'Thriller'];

const GenresToggle = ({activeGenre, changeActiveGenre}) => {
    const chooseActiveGenre = genre => {
        changeActiveGenre(genre);
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

const mapStateToProps = ({movies}) => ({
    activeGenre: movies.activeGenre
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveGenre: (str) => dispatch(changeActiveGenre(str))
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresToggle);