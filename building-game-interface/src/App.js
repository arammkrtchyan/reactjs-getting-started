import React, { Component } from 'react';
import './App.css'


let possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {

	let stars = [];

	for(let i =0; i < props.numberOfStars; i++) {
		stars.push(<i key={i} className="fa fa-star"/>);
	}

	return (
		<div className="col-5">
			{stars}
		</div>
	)
}


const Button = (props) => {
	let button;
	switch(props.answerIsCorrect) {
		case true:
			button = 
				<button className="btn btn-success" onClick={props.acceptAnswer}>
					<i className="fa fa-check"></i>
				</button>	
			break;
		case false:
			button = 
				<button className="btn btn-danger">
					<i className="fa fa-times"></i>
				</button>
			break;
		default:
			button = 
				<button className="btn btn-light" disabled={props.selectedNumbers.length === 0} 
					onClick={props.checkAnswer}>
					=
				</button>
	}
	return (
		<div className="col-2 text-center">
			{button}
			<br/>
			<br/>
			<button className="btn btn-warning btn-sm" onClick={props.redraw}
				disabled={props.redraws === 0}>
				<i className="fa fa-refresh"></i> {props.redraws}
			</button>
		</div>
	)
}

const Answer = (props) => {
	return (
		<div className="col-5">
			{
				props.selectedNumbers.map( (number, i) => 
					<span onClick={() => props.unselectedNumber(number)} key={i} className="answer-number">{number}</span>)
			}	
		</div>
	)
}

const Numbers = (props) => {

	const numberClassName = (number) => {
		if(props.usedNumbers.indexOf(number) >= 0) {
			return 'answer-number used';
		} 
		else if(props.selectedNumbers.indexOf(number) >= 0) {
			return 'answer-number selected';
		} else {
			return 'answer-number';
		}
	}

	return (
		<div className="card text-center" style={{marginTop: '20px'}}>
			<div className="card-body">{Numbers.list.map((number, i) =>  
				<span  className={numberClassName(number)} key={i}
						onClick={() => props.selectNumber(number)}>
					{number} 
				</span>
				)}
			</div>
		</div>
	)
}

Numbers.list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DoneFrame = (props) => {
	return (
		<div className="text-center">  
			<h2>{props.doneStatus}</h2>
			<button className="btn btn-secondary" onClick={props.playAgain}>Play Again</button>
		</div>
	);
};	

class Game extends React.Component {

	static randomNumber = () => 1 + Math.floor(Math.random() * 9);

	static initialState = () => ({
		selectedNumbers: [],
		numberOfStars: Game.randomNumber(),
		answerIsCorrect: null,
		usedNumbers: [],
		redraws: 5,
		doneStatus: null
	});

	state = Game.initialState();

	selectNumber = (selectedNumber) => {
		if(this.state.selectedNumbers.indexOf(selectedNumber) >= 0) return;
		if(this.state.usedNumbers.indexOf(selectedNumber) >= 0) return;
		this.setState((prevState) => ({
			selectedNumbers: prevState.selectedNumbers.concat(selectedNumber),
			answerIsCorrect: null
		}));
	}

	unselectedNumber = (unselectedNumber) => {
		this.setState((prevState) => (
			{
				selectedNumbers: prevState.selectedNumbers.filter((number) => unselectedNumber !== number),
				answerIsCorrect: null
			}
		));
	}

	checkAnswer = () => {
		this.setState((prevState) => (
			{
				answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
			}
		));
	};

	acceptAnswer = () => {
		this.setState((prevState) => (
			{
				selectedNumbers: [],
				answerIsCorrect: null,
				numberOfStars: Game.randomNumber(),
				usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers)
			}
		), this.updateDoneStatus);
	};

	redraw =() => {
		if(this.state.redraws !== 0) {
			this.setState( (prevState) => (
				{
					selectedNumbers: [],
					answerIsCorrect: null,
					numberOfStars: Game.randomNumber(),
					redraws: prevState.redraws - 1
				}
			), this.updateDoneStatus);	
		}
	};

	possibleSolutions = ({numberOfStars, usedNumbers}) => {
		const possibleNumbers = Numbers.list.filter(number => 
			usedNumbers.indexOf(number) === -1
		);
		return possibleCombinationSum(possibleNumbers, numberOfStars);

	}

	updateDoneStatus = () => {
		this.setState(prevState => {
			if(prevState.usedNumbers.length === Numbers.list.length) {
				return { doneStatus: 'Done Nice!' }
			} 
			if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
				return { doneStatus: 'Game Over.' }
			}
		});
	};

	resetGame = () => this.setState(Game.initialState());

	render() {
		const {
			selectedNumbers, 
			numberOfStars, 
			answerIsCorrect,
			usedNumbers,
			redraws,
			doneStatus
		} = this.state;
		return (
			<div className="container">
				<h3>Play Nine</h3>
				<hr />
				<div className="row">
					<Stars numberOfStars={numberOfStars} />
					<Button 
						selectedNumbers={selectedNumbers} 
						checkAnswer={this.checkAnswer} 
						answerIsCorrect={answerIsCorrect}
						acceptAnswer={this.acceptAnswer}
						redraw={this.redraw}
						redraws={redraws}
					/>
					<Answer unselectedNumber={this.unselectedNumber} selectedNumbers={selectedNumbers} />
				</div>
				{
					doneStatus ? 
						<DoneFrame doneStatus={doneStatus} playAgain={this.resetGame}/> :
						<Numbers selectNumber={this.selectNumber} selectedNumbers={selectedNumbers} 
							usedNumbers={usedNumbers}/>		
				}
				
			</div>
		)
	}

}

class Clock extends React.Component {

	state = {date: new Date()}

	render() {
		return (
			<div>
				<div>Hello World!</div>
				<span>{this.state.date.toLocaleTimeString()}</span>
			</div>
		);
	}

	componentDidMount() {
		this.timerId = setInterval(
			() => this.setState( {date: new Date()} ), 
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

}

class App extends Component {
  render() {
    return ( <Game /> );
  }
}

export default App;
