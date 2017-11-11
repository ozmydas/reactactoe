import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ToastAndroid,
	ScrollView,
	StyleSheet,
	Dimensions,
} from 'react-native';

/* required components */
import Board from './board';


class Game extends Component{

	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			XisNext: false,
			stepNumber: 0,
		}

		this._handleClick = this._handleClick.bind(this);
		this._jumpTo = this._jumpTo.bind(this);
	}


	_jumpTo(stepNumber){
		this.setState({
			stepNumber,
			XisNext: (stepNumber % 2) !== 0,
		})
	}


	_handleClick(i){
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if(winnerJudge(squares) || squares[i]){
			return;
		}

		squares[i] = this.state.XisNext ? 'x' : 'o';
		this.setState({
			history: history.concat([{
				squares
			}]),
			XisNext: ! this.state.XisNext,
			stepNumber: history.length,
		});
	}


	render(){
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = winnerJudge(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ? 'Go to move #' + move : 'Go to game start';

			return(
				<TouchableOpacity
					onPress={() => this._jumpTo(move)}
					key={move} >
					<Text style={styles.historyRow}>{desc}</Text>
				</TouchableOpacity>
			);
		})

		let status;
		let draw;
		if(winner){
			status = 'Winner: ' + winner.toUpperCase();
			draw = false;
		} else if(this.state.stepNumber >= 9 && ! winner){
			status = 'Game Draw';
			draw = true;
		} else{
			status = 'Player Turn: ' + (this.state.XisNext ? 'X' : 'O');
			draw = false;
		}


		return (
			<View style={styles.container}>

				<View style={styles.gameBoard}>
					<Board squares={current.squares} onPress={(i) => this._handleClick(i)} />
				</View>

				<View style={styles.gameInfo}>
					<View style={{alignItems: 'center'}}><Text style={[styles.status, winner && {color: 'green'}, draw && {color: 'orange'} ]}>{status}</Text></View>
					<ScrollView style={{backgroundColor: '#666'}}>{moves}</ScrollView>
				</View>

			</View>
		);
	}

} //end class



function winnerJudge(squares){
	const lines = [
		[0, 1, 2],
		[0, 4, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[3, 4, 5],
		[6, 7, 8],
	];

	for(let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gameBoard: {
		width: width,
		height: width,
	},
	gameInfo: {
		flex: 1,
	},
	historyRow: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		color: '#ddd',
	},
	top: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	status: {
		fontSize: 30,
		paddingVertical: 6
	},
	boardContainer:{
		backgroundColor: '#fff',
	},
	boardRow: {
		flex: 1,
		flexDirection: 'row'
	},
	square: {
		flex:1, 
		borderWidth: 0.5,
		borderColor: '#666',
		justifyContent: 'center'
	},
	squareText: {
		fontSize: 100,
		textAlign: 'center',
		marginTop: -20,
	}
});

export default Game;
