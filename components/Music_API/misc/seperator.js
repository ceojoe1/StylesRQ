'use strict';

import  {
	StyleSheet,
	View
} from 'react-native';
import React, {Component} from 'react';

const styles = StyleSheet.create({
	separator: {
		height: 1,
		width:500,
		backgroundColor: '#E3E3E3',
		flex: 1
	}
});

class Separator extends Component {
	render() {
		return (
			<View style={styles.separator}/>
		);
	}
}

module.exports = Separator;