import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Button extends React.Component {

  handleClick = () => {
      this.props.onclickFunction(this.props.incrementValue);
  }

  render() {
    return (
        <button onClick={this.handleClick}>
          + {this.props.incrementValue}
        </button>
    );
  }

}

const Result = (props) => {
  return (
     <div>{props.counter}</div>
  );
};


class App extends Component {

  state = {
    counter: 0
  };

  incrementCounter  = (incrementValue) => {
      this.setState( (prevState) => {
          return {
            counter: prevState.counter + incrementValue
          }
      });
  }

  render() {
    return (
      <div>
        <Button incrementValue={1} onclickFunction={this.incrementCounter}/>
        <Button incrementValue={5} onclickFunction={this.incrementCounter}/>
        <Button incrementValue={10} onclickFunction={this.incrementCounter}/>
        <Result counter={this.state.counter}/>
      </div>
    );
  }

}

export default App;
