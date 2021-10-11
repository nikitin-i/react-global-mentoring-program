import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './moviemenu.modules.scss';

const MovieMenu = ({id, deleteHandler, editHandler}) => {
    const [submenu, setSubmenu] = useState(false);

    const openSubmenu = () => setSubmenu(true);

    const closeSubmenu = (e) => {
        e.stopPropagation();

        setSubmenu(false);
    };

    const deleteMovie = (e) => {
        closeSubmenu(e);
        deleteHandler(id);
    };
    const editMovie = (e) => {
        closeSubmenu(e);
        editHandler(id)
    };

    const classList = submenu ? `${styles['movie-menu__list']} ${styles['movie-menu__list--active']}` : styles['movie-menu__list'];

    return(
        <div className={styles['movie-menu']} onClick={openSubmenu}>
            <div className={styles['movie-menu__dots']}>
                <span className={styles['movie-menu__dot1']} />
                <span className={styles['movie-menu__dot2']} />
                <span className={styles['movie-menu__dot3']} />
            </div>
            <div className={classList}>
                <span className={styles['movie-menu__close']} onClick={closeSubmenu}>X</span>
                <p className={styles['movie-menu__item']} onClick={editMovie}>Edit</p>
                <p className={styles['movie-menu__item']} onClick={deleteMovie}>Delete</p>
            </div>
        </div>
    );
};

MovieMenu.propTypes = {
    id: PropTypes.number.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired
};

export default MovieMenu;