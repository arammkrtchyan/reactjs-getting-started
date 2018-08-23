import React, { Component } from 'react';


const BoilingVerdict = (props) => {
  if(props.celsius >= 100) {
      return (<p>The water would boil.</p>);
  } 

  return <p>The water would not boil.</p>;
}

const scales = {
  'c': 'Celsius',
  'f': 'Fahrenheit'
};

const TemperatureInput = (props) => {

    return (
      <fieldset>
          <legend>Enter temperature in {scales[props.scale]}:</legend>
          <input type="text"  value={props.temperature} 
              onChange={ (e) => props.onTemperatureChange(e.target.value)}/>
      </fieldset>          
    );  

}

const toCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5 / 9;
}

const toFahrenheit = (celsius) => {
  return (celsius * 9 / 5) + 32;
} 

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {

  state = {
    temperature: '',
    scale: 'c'
  };

  handleFahrenheitChange = (value) => {
    this.setState(
        {
          scale : 'f',
          temperature: value
        }
    );
  }

  handleCelsiusChange = (value) => {
    this.setState(
        {
          scale : 'c',
          temperature: value
        }
    );
  }

  render() {
    const {temperature, scale } = this.state;
    const celsiusTemperature = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheitTemperature = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput scale="c" temperature={celsiusTemperature} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheitTemperature} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={this.state.temperature} />
      </div>
    );
  }

};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

export default App;
