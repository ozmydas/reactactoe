import React, { Component } from 'react';
import {
	Router,
	Scene,
	Actions
} from 'react-native-router-flux';

/* define required screens */
import Game from '@screens/game';

export default class RouterScene extends Component{
	
	_renderScene(){
		return Actions.create(
			<Scene key='root'>
				<Scene 
					component={Game} key='gameScreen' title='React Native Tic Tac Toe'
					hideNavBar={false} initial={true} />
			</Scene>
		);
	}

	render(){
		return (
			<Router scenes={this._renderScene()} />
		);
	}

}

