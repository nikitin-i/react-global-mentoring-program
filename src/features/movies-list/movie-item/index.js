import React from 'react';

import './styles.css';

const MovieItem = ({data}) => {
    let {poster_path, title, release_date, tagline} = data;
    release_date = release_date.slice(0, 4);

    return (
        <section className='movie-item'>
            <img className='movie-item__poster' src={poster_path} />
            <div className='movie-item__info'>
                <h3 className='movie-item__title'>{title}</h3>
                <div className='movie-item__release'>{release_date}</div>
                <span className='movie-item__tagline'>{tagline}</span>
            </div>
        </section>
    );
};

export default MovieItem;