import React from 'react';
import GenreItem from './genre-item';
import './genre-list.css';

class GenreList extends React.PureComponent {
    constructor() {
        super();

        this.genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
        this.state = {
            activeGenre: 0
        };
    }

    setActiveGenre(index) {
        this.setState(() => ({
            activeGenre: index
        }));
    }

    render() {
        return (
            <ul className='genre-list'>
                {
                    this.genres.map((genre, index) => <GenreItem
                        value={genre}
                        key={genre}
                        active={index === this.state.activeGenre}
                        clickHandler={this.setActiveGenre.bind(this, index)} />)
                }
            </ul>
        );
    }
}

export default GenreList;