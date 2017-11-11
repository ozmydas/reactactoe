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
	let color = props.value == 'x' ? 'blue' : 'red';
	return (
			<TouchableOpacity
				onPress={props.onPress}
				style={styles.square}
				activeOpacity={1.0} >
				<Text style={[styles.squareText, {color}]}>{props.value}</Text>
			</TouchableOpacity>
		);
}


/* main component */

class Board extends Component{

	_renderSquare(i){
		let { squares, onPress } = this.props;
		return <Square value={squares[i]} onPress={() => this.props.onPress(i)} />;
	}


	render(){
		const {width, height} = Dimensions.get('window');

		return (
			<View style={styles.container}>

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
