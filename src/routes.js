import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/Home';
import ReviewScreen from './screens/Review';
import CountryScreen from './screens/Country';

const routes = {
  Home: {
    screen: HomeScreen,
  },
  Review: {
    screen: ReviewScreen,
  },
  Country: {
    screen: CountryScreen,
  },
};

const Routes = createAppContainer(createStackNavigator(routes, {
  headerLayoutPreset: 'center',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#eee',
      height: 40,
      paddingBottom: 20,
    },
    headerTintColor: '#999',
    headerTitleStyle: {
      fontWeight: 'bold',
      height: 20,
    },
    headerMode: 'none',
  },
}));

export default Routes;
