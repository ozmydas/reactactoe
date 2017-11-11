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
//import Square from '@components/square';

/* functional component */
function Square(props){
	return (
			<TouchableOpacity
				onPress={props.onPress}
				style={styles.square}
				activeOpacity={1.0} >
				<Text style={styles.squareText}>{props.value}</Text>
			</TouchableOpacity>
		);
}


/* main component */

class Board extends Component{

	constructor(props){
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			XisNext: true,
		}

		this._handleClick = this._handleClick.bind(this);
	}


	_handleClick(i){
		const squares = this.state.squares.slice();

		if(winnerJudge(squares) || squares[i]){
			return;
		}

		squares[i] = this.state.XisNext ? 'x' : 'o';
		this.setState({
			squares,
			XisNext: ! this.state.XisNext,
		});
	}


	_renderSquare(i){
		let { squares } = this.state;
		return <Square value={squares[i]} onPress={() => this._handleClick(i)} />;
	}


	render(){
		const {width, height} = Dimensions.get('window');
		const winner = winnerJudge(this.state.squares);
		let status;

		if(winner){
			status = 'Winner: ' + winner.toUpperCase();
		} else{
			status = 'Next Player: ' + (this.state.XisNext ? 'X' : 'O');
		}
		
		return (
			<View style={styles.container}>

				<View style={styles.top}>
					<Text style={[styles.status, winner && {color: 'green'} ]}>{status}</Text>
				</View>

				<View style={[styles.boardContainer, {width, height: width}]}>

					<View style={styles.boardRow}>
						{this._renderSquare(0)}
						{this._renderSquare(1)}
						{this._renderSquare(2)}
					</View>

					<View style={styles.boardRow}>
						{this._renderSquare(3)}
						{this._renderSquare(4)}
						{this._renderSquare(5)}
					</View>

					<View style={styles.boardRow}>
						{this._renderSquare(6)}
						{this._renderSquare(7)}
						{this._renderSquare(8)}
					</View>

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


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	top: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	status: {
		fontSize: 30,
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

export default Board;
