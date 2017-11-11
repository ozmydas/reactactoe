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


class Square extends Component{

	render(){
		let { value, onPress } = this.props;
		return (
			<TouchableOpacity
				onPress={() => onPress()}
				style={styles.square}
				activeOpacity={1.0} >
				<Text style={styles.squareText}>{value}</Text>
			</TouchableOpacity>
		);
	}


} //end class


const styles = StyleSheet.create({
	square: {
		flex:1, 
		borderWidth: 0.5,
		borderColor: '#666',
		justifyContent: 'center',
		alignItems: 'center',
	},
	squareText: {
		fontSize: 80
	}
});


export default Square;