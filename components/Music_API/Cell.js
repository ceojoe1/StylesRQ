'use strict';

import React, {Component} from 'react';

var Separator = require('./misc/seperator')
var img = '';

import {
	Image,
	View,
	Text,
	TouchableHighlight,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5
	},
	artistImage: {
		height: 84,
		width: 126,
		marginRight: 10
	},
	rightContainer: {
		flex: 1
	},
	name: {
		textAlign: 'center',
		fontSize: 14,
		color: 'purple'
	},
	rank: {
		textAlign: 'center',
		marginBottom: 2,
		fontWeight: '500',
		fontSize: 16
	}
});

class ArtistCell extends Component {
	
	render() {
		if(this.props.artist){
			if(typeof this.props.artist.image === "undefined"){
				console.log("Can't find image for artist"); 
			} else {
				
				this.img = this.props.artist.image[2]["#text"];
				console.log("Artist Name: " + this.props.artist.image[2]["#text"]);
			}
			
		}
		else {
			console.log("Can't find artist"); 
		}
		
		return (
			<View>
				<TouchableHighlight
					onPress={this.props.onOpenPage}
					underlayColor='transparent'>
						<View style={styles.container}>
							  <Image 
								source={{uri: this.img}}
								style={styles.artistImage}
							/>  
							
							<View style={styles.rightContainer}>
								<Text style={styles.name}>{this.props.artist.name}</Text>
							</View>
						</View>
				</TouchableHighlight>
				<Separator/>
			</View>
		);
	}
}

module.exports = ArtistCell;