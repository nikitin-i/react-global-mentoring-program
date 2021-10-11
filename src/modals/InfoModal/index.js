import React from 'react';
import PropTypes from 'prop-types';

import styles from './infomodal.modules.scss';

const InfoModal = ({render, closeHandler}) => {
    return (
        <section className={styles['info-modal']}>
            <div className={styles['info-modal__wrapper']}>
                <div className={styles['info-modal__background']} />
                <div className={styles['info-modal__content-wrapper']}>
                    <div className={styles['info-modal__close']} onClick={closeHandler}>X</div>
                    <div className={styles['info-modal__content']}>
                        {render()}
                    </div>
                </div>
            </div>
        </section>
    );
};

InfoModal.propTypes = {
    render: PropTypes.func.isRequired,
    closeHandler: PropTypes.func.isRequired
};

export default InfoModal;