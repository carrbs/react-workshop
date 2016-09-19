import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import 'normalize.css';

// Import CSS and favicon
import './App.css';

const incrementAction = { type: 'INCREMENT' };
const decrementAction = { type: 'DECREMENT' };

const initialCounterState = { count: 0 };

function adjustCountReducer(state = initialCounterState, action) {
  if (action.type === 'INCREMENT') {
      const newState = Object.assign({}, state);
      newState.count += 1;
      return newState;
  } else if ( action.type === 'DECREMENT' && state.count != 0) {
      const newState = Object.assign({}, state);
      newState.count -= 1;
      return newState;
  }
  return state;
};


export const store = createStore(adjustCountReducer);

const mapDispatchToProps = dispatch => {
    return {
        onIncrement: () => dispatch(incrementAction),
        onDecrement: () => dispatch(decrementAction)
    };
};

const mapStateToProps = state => {
    return {
        count: state.count
    };
};

const createConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
);


class Counter extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
  };

  render() {
    const { count, onIncrement, onDecrement } = this.props;
    return (
      <div className='Counter'>
        <div className='siteTitle'>
          <h1>{count}</h1>
        </div>
        <div className='controls'>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    );
  }
}

const ConnectedCounter = createConnectedComponent(Counter);

export class App extends React.Component {

  constructor(props) {
    super(props);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    if (e.which === LEFT || e.which === DOWN) {
      console.log('this.props', this.props)
      return this.props.onDecrement();
    } else if (e.which === RIGHT || e.which === UP) {
      return this.props.onIncrement();
    } else {
      return; // Do nothing
    }
  };

  render() {
    return (
      <div className='App'>
        <ConnectedCounter />
     </div>
    );
  }
}

export const ConnectedApp = createConnectedComponent(App);
