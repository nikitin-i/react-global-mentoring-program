import logo from './logo.svg';
import './App.css';
import Example from './components/example';
import Counter from './features/counter/counter';
import SearchForm from './features/search-form/search-form';
import GenreList from './features/genre-toggle/genre-list';

function App() {
    return (
        <div className='container'>
            <header className='header'>
                <img src={logo} className='logo' alt='logo' />
            </header>
            <Example value='1'>
                <Counter />
            </Example>
            <Example value='2'>
                <SearchForm />
            </Example>
            <Example value='3'>
                <GenreList />
            </Example>
        </div>
    );
}

export default App;
