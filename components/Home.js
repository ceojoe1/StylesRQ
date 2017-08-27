import React, {Component} from 'react'
import {Button } from 'react-native'
import {TouchableOpacity, StyleSheet, View, Text, Image, Alert, BackHandler } from 'react-native'
import {NavigationActions} from 'react-navigation';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    /*
     * Remove the listener when the page is destroyed so normal functionality is maintained.
     */
    componentWillUnMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
     /**
     * The function that is called when the hardware back button is pressed. Navigates the user back
     * to the home page.
     */
    handleBackButton(){
        const {params} = this.props.navigation.state;
        const user = params.user
        {this.props.navigation.dispatch(NavigationActions
            .reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Login', params: {isLoggedOut: true}})
                ]
            })
        )};
        return true;
    }

    static navigationOptions =({ navigation }) => ({
        header:null,
    });

    state = {}

    render() {
        const {params} = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        
        var username = "";
        var fName;
        var lName;

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login', params: {isLoggedOut: true}})
            ]
        })

        /**
         * Test if the page was navigated back to from the next page loaded.
         * If so set the values back to their previous state
         */
        if(params){
            if(params.user){
                userName = params.user.name;
                fName = userName.split(" ")[0];
                lName = userName.split(" ")[1];
            }
        }

        /* The display for the logout button, welcome message and other content
        */
        return(
            <View style = {styles.container}>
                {/* LOG OUT */}
                <Text onPress={() => {this.props.navigation.dispatch(resetAction)}} style={styles.logout}>Log Out </Text>

                {/* HEADER */}
                <View style = {styles.header}>
                    <View><Text style={styles.header_welcome}>Welcome {fName}, </Text></View>
                    <View><Text style={styles.subheader_welcome}> Add a song to the Que to be played by the dj </Text></View>
                </View>
            </View>
        )
    }
    
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: 'black',
    },
    logout: {
        fontSize: 18,
        color: 'purple',
        marginLeft: 305,
        marginTop: 15,
        marginBottom: 0
    },
    header: {
        alignItems: 'center',
        marginTop: 20
    },
    header_welcome: {
        fontSize: 24,
        color: 'white'
    },
    subheader_welcome: {
        fontSize: 18, 
        color: 'white'
    }

})