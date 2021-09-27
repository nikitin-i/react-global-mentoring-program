import React, { useState } from 'react';

import styles from './moviemenu.modules.scss';

const MENU_ITEMS = ['Edit', 'Delete'];

const MovieMenu = () => {
    const [submenu, setSubmenu] = useState(false);

    const openSubmenu = () => setSubmenu(true);
    const closeSubmenu = (e) => {
        e.stopPropagation();

        setSubmenu(false);
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
                {
                    MENU_ITEMS.map(item => <p className={styles['movie-menu__item']} key={item}>{item}</p>)
                }
            </div>
        </div>
    );
};

export default MovieMenu;