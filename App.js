import 'react-native-gesture-handler';

import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Register from './screens/Register';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Explore from './screens/Explore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import MyTabs from './screens/MyTabs';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={({ navigation }) => ({
          title: 'News Feed',
          headerStyle: {
            backgroundColor: '#2683F9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackVisible: false,
          headerLeft: () => (
<AntDesign name="bars" size={26} style={{marginRight: 20}} color="white" />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={()=> navigation.navigate('Welcome')}>
              <MaterialIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
          ),
        })
        }>
      <Stack.Screen name="Register" component={Register} options={{header: () => (<></>)}} />
      <Stack.Screen name="Login" component={Login} options={{header: () => (<></>)}} />
      <Stack.Screen name="Welcome" component={Welcome} options={{header: () => (<></>)}} />
      <Stack.Screen name="MyTabs" component={MyTabs}   />
      {/* <Stack.Screen name="Explore" component={Explore} /> */}
    </Stack.Navigator>
  </NavigationContainer>
  );
}
