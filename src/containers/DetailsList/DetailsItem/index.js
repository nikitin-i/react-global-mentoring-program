import React from 'react';
import PropTypes from 'prop-types';

import style from './detailsitem.modules.scss';

const DetailsItem = ({data: {id, title, description}}) => {
    return (
        <li className={style['details-item']}>
            <span className={style['details-item__number']}>{id}</span>
            <div className={style['details-item__info']}>
                <p className={style['details-item__title']}>{title}</p>
                {description && <p className={style['details-item__description']}>{description}</p>}
            </div>
        </li>
    );
};

DetailsItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    })
};

export default DetailsItem;