import React, { Component } from 'react';
import './App.css';


const Card = (props) => {
  return (
      <div className="card">
          <img width="75" src={props.avatar_url} alt=""/>
          <div className="info">
            <div className="name-info">{props.name}</div>
            <div>{props.company}</div>
          </div>
      </div>
  );
};

const CardList = (props) => {

  return (
      <div>
        {props.cards.map((card)=> 
          <Card  key={card.id} {...card}/>
        )}
        
      </div>
  );

};

class From extends React.Component {

  state = {userName: ''};

  handleSubmit = (event) => {
      event.preventDefault();
      fetch(`https://api.github.com/users/${this.state.userName}`)
        .then(res => res.json())
        .then(
            (result) => {
              this.props.onSubmit(result); 
              this.setState({userName: ''});
            }
        );
      
  }

  handleUserNameChange = (event) => {
    this.setState({
        userName: event.target.value
    });
  }

  render() {
      return (
          <form onSubmit={this.handleSubmit}>
            <input type="text" 
            value={this.state.userName}  
            onChange={this.handleUserNameChange}
            placeholder="Gihub username" 
            required/>
            <button type="submit">Add Card</button>
          </form>
      )
  }

}

class App extends Component {

  state = {
    cards: []
  }

  addNewCard = (cardInfo) => {
    this.setState((prevState) => {
        return {
          cards: prevState.cards.concat(cardInfo)
        }
    });
  }

  render() {
    return (
      <div>
        <From onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>  
    );
  }
}

export default App;
