import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Explore from './Explore';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import { FontAwesome5 } from '@expo/vector-icons'; 
import Favourites from './Favourites';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator initialRoute="Home"  screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 62 },
        tabBarLabelStyle: {fontSize: 16, marginBottom: 6},
        tabBarIconStyle: {marginTop: 6},
      }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: () => (<>
            <Entypo name="home" size={24} color="black" />
            {/* <Text>Home</Text> */}
        </>)
      }} />
      <Tab.Screen name="Explore" component={Explore}
      options={{
        tabBarIcon: () => (<>
        <FontAwesome5 name="filter" size={20} color="black" /></>)
      }} />
         <Tab.Screen name="Favourites" component={Favourites}
      options={{
        tabBarIcon: () => (<>
        <MaterialIcons name="favorite-outline" size={24} color="black" /></>)
      }} />
    </Tab.Navigator>
  )
}

export default MyTabs