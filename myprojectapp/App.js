import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import memo from './Screen/memo';
import Search from './Screen/Search';
import CA from './Screen/CA';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: 'yellow',
          activeTintColor: 'black',
          inactiveTintColor: 'yellow',

          style: {
            backgroundColor: 'black',
          },
          labelStyle: { fontSize: 20 },
          labelPosition: 'beside-icon',
        }}>
        <Tab.Screen name="메모" component={memo} />
        <Tab.Screen name="검색" component={Search} />
        <Tab.Screen name="카메라" component={CA} />
      </Tab.Navigator>
    </NavigationContainer>
  
  );
}
