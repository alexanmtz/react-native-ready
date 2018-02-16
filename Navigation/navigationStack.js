import { StackNavigator } from "react-navigation";
import HomeScreen from "../screens/Home/Home.screen";
import ReviewScreen from "../screens/Review/Review.screen";
import CountryScreen from "../screens/Country/Country.screen";


const routes = {
    Home: {
        screen: HomeScreen,
        routeName: 'Home'
    },
    Review: {
        screen: ReviewScreen,
        routeName: 'Review'
    },
    Country: {
        screen: CountryScreen,
        routeName: 'Country'
    }

};

const navigator = StackNavigator(routes, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#eee',
            height: 40,
            paddingBottom: 20
        },
        headerTintColor: '#999',
        headerTitleStyle: {
            fontWeight: 'bold',
            height: 20
        },
        headerMode: "none"
    }
});

export default navigator;