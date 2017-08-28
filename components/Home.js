import React, {Component} from 'react'
import {Button } from 'react-native'
import {TouchableOpacity, ToolbarAndroid, StyleSheet, View, Text, ListView, Image, Alert, BackHandler } from 'react-native'
import {NavigationActions} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay'; 
import {TabViewAnimated, TabBar } from 'react-native-tab-view'; 


'use strict';
var fetch = require('fetch').fetch
var ArtistCell = require('./Music_API/Cell')
var Web = require('./Music_API/misc/web')

const API_KEY = '5637a4b6f19c09894b771261e8f67762';
const API_URL = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=ukraine&format=json&limit=40';
const REQUEST_URL = API_URL + '&api_key=' + API_KEY;


var toolbarActions = [
    { title: 'Logout', show: 'always'},
];
class Home extends Component {
    
    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            isLoading: false,
            dataSource: ds.cloneWithRows(['r1','row2']),
            index: 0,
            routes: [
                { key: '1', title: 'Albums' },
                { key: '2', title: 'Artists'},
                { key: '3', title: 'Songs'},
            ],

        };
    }

    /*
     ******  REACT COMPONENT METHODS *****
     */
    componentWillMount() {
        
    }
    componentDidMount() {
        console.log("Loading Artist"); 
        this.loadArtist();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    
    }

    /*
     * Remove the listener when the page is destroyed so normal functionality is maintained.
     */
    componentWillUnMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

     /*
     ****** END  REACT COMPONENT METHODS *****


     */
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

     /*
     ******  TAB METHODS 
     *          Controls what happens when a user switches between tabs
     */

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderHeader = (props) => {
        return <TabBar {...props} />
    }

    _renderScene = ({ route }) => {
        switch(route.key) {
            case '1':

                return  (
                    
                <View style = {styles.container}>
                  
                    <View style={styles.listContainer}>
                        <ListView
                            dataSource = {this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            automaticallyAdjustContentInsets = {false}
                        />
                    </View>
                    
                </View>
                )
            case '2':
                return
                <View style = {styles.container}>
                    {/* LOG OUT */}
                    <Text onPress={() => {this.props.navigation.dispatch(resetAction)}} style={styles.logout}>Log Out </Text>

                    {/* HEADER */}
                    <View style = {styles.header}>
                        <View><Text style={styles.header_welcome}>Welcome {fName}, </Text></View>
                        <View><Text style={styles.subheader_welcome}> Browse or Search to find music to add to the CUE </Text></View>
                    </View>

                    <View style={styles.listContainer}>
                        <ListView
                            dataSource = {this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            automaticallyAdjustContentInsets = {false}
                        />
                    </View>
                </View>
            case '3':
                return
                <View style = {styles.container}>
                {/* LOG OUT */}
                    <Text onPress={() => {this.props.navigation.dispatch(resetAction)}} style={styles.logout}>Log Out </Text>

                    {/* HEADER */}
                    <View style = {styles.header}>
                        <View><Text style={styles.header_welcome}>Welcome {fName}, </Text></View>
                        <View><Text style={styles.subheader_welcome}> Browse or Search to find music to add to the CUE </Text></View>
                    </View>

                    <View style={styles.listContainer}>
                        <ListView
                            dataSource = {this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            automaticallyAdjustContentInsets = {false}
                        />
                    </View>
                </View>
            default:
                return  
                <View style = {styles.container}>
                    {/* LOG OUT */}
                    <Text onPress={() => {this.props.navigation.dispatch(resetAction)}} style={styles.logout}>Log Out </Text>

                    {/* HEADER */}
                    <View style = {styles.header}>
                        <View><Text style={styles.header_welcome}>Welcome {fName}, </Text></View>
                        <View><Text style={styles.subheader_welcome}> Browse or Search to find music to add to the CUE </Text></View>
                    </View>

                    <View style={styles.listContainer}>
                        <ListView
                            dataSource = {this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            automaticallyAdjustContentInsets = {false}
                        />
                    </View>
                </View>

        }
    }


      /*
     ******  ENDTAB METHODS 
    */

    static navigationOptions =({ navigation }) => ({
        header:null,
    });

    /*
     * Handle LAST FM Music API Commands:
     *      Load Artist by making AJAX Web Request
     *      Render List View data with Artist information
     */

    loadArtist() {
        this.setState({ isLoading: true});
        <Spinner visible={this.state.isLoading} textContent={"Loading Music Data"} textStyle={{color:'#fff'}} overlayColor = { 'rgba(255,0,0,0.7'}/>
        
        
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .catch((error) => {
                console.error("FETCH ERROR: " + error);
            })
            .then((responseData) =>{
                console.log("Loaded ( " + responseData.topartists.artist.length+ " ) artists"); 
                this.setState({
                    isLoading: false,
                    dataSource: this.getDataSource(responseData.topartists.artist)
                    
                })
                
            }).done();
            <Spinner visible={this.state.isLoading} textContent={"Loading Music Data"} textStyle={{color:'#fff'}} overlayColor = { 'rgba(255,0,0,0.7'}/>
            
    }

    getDataSource(artists: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(artists);
    }

    openPage(url) {
        this.props.navigator.push({
            title: 'Web View',
            component: web,
            passProps: {
                url: url
            }
        });
    }

    renderRow(artist: Object){
        return(
            <ArtistCell
                artist = {artist}
                onOpenPage={this.openPage.bind(this, artist.url)}/>
        );
    }

    render() {
    
        const {params} = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        
        var username = "";
        var fName;
        var lName;

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

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login', params: {isLoggedOut: true}})
            ]
        })

      

        /* The display for the logout button, welcome message and other content
        */
        return(
            <View style={styles.parentContainer}>

        {/* TOOL BAR */}

            <ToolbarAndroid
                title='Home'
                actions = {toolbarActions}
                style={styles.toolbar}
                titleColor='purple'
                onActionSelected={() => {this.props.navigation.dispatch(resetAction)}}
            />
           
        {/* TAB BAR */}

           <TabViewAnimated
               
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleChangeTab}
            />
            </View>
        )
    }
    
}
export default Home

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
    },
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: 'black',
    },
    listContainer: {
        marginTop: 10
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
        marginTop: -15
    },
    header_welcome: {
        fontSize: 15,
        color: 'white',
       
    },
    subheader_welcome: {
        fontSize: 12, 
        color: 'white',
        borderBottomColor: 'purple',
        borderBottomWidth: 1
    }

})