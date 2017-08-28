/**
 * @author Joe Chacon, Eli Menchaca
 * @email ceojoe09@gmail.com, ELI EMAIL HERE
 */
import { AppRegistry } from 'react-native'
import Login from './components/Login.js';
import Home from './components/Home.js';


import { StackNavigator } from 'react-navigation';

console.disableYellowBox = true

const  StylesRQ = StackNavigator ({
  Login: {screen: Login},
  Home: { screen: Home}
 
},  {
  transitionConfig: () => ({ screenInterpolator: () => null}),
  initialRouteName: 'Login',
});


AppRegistry.registerComponent('StylesRQ', () => StylesRQ);
