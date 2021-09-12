import './button.css';

function Button(props) {
    return (
        <button className="button" onClick={props.clickHandler}>
            {props.value}
        </button>
    );
}

export default Button;