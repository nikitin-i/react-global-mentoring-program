import React from 'react';
import './genre-item.css';

function GenreItem(props) {
    const classList = props.active ? 'genre-item active' : 'genre-item';

    return React.createElement(
        'li',
        {
            className: classList,
            onClick: props.clickHandler
        },
        props.value
    );
}

export default GenreItem;