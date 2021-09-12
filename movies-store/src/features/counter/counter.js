import React from 'react';
import './counter.css';
import Button from '../../components/button';

class Counter extends React.Component {
    constructor() {
        super();

        this.state = {
            value: 0
        };
    }

    increaseCounter() {
        this.setState(state => ({
            value: state.value + 1
        }));
    }

    decreaseCounter() {
        this.setState(state => ({
            value: state.value === 0 ? 0 : state.value - 1
        }));
    }

    render() {
        return (
            <div className='counter'>
                <p className='counter__value'>{this.state.value}</p>
                <div className='counter__buttons-group'>
                    <Button value='Add' clickHandler={this.increaseCounter.bind(this)} />
                    <Button value='Subtract' clickHandler={this.decreaseCounter.bind(this)} />
                </div>
            </div>
        );
    }
}

export default Counter;