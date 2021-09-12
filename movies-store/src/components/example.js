import './example.css';

function Example(props) {
    return (
        <div className='examples'>
            <span className='examples__item'>{props.value}.</span>
            {props.children}
        </div>
    );
}

export default Example;