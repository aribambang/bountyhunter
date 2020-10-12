import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/context/AuthContext';

const TrackStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LoginFlow = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name='Signup'
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name='Signin'
        component={SigninScreen}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
};

function TrackListFlow() {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen
        name='TrackList'
        component={TrackListScreen}
        options={{ title: 'Tracks' }}
      />
      <TrackStack.Screen name='TrackDetail' component={TrackDetailScreen} />
    </TrackStack.Navigator>
  );
}

function MainFlow() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='TrackListFlow'
        component={TrackListFlow}
        options={{
          title: 'Tracks',
          tabBarIcon: () => <FontAwesome name='th-list' size={20} />,
        }}
      />
      <Tab.Screen
        name='TrackCreate'
        component={TrackCreateScreen}
        options={{
          title: 'Add Track',
          tabBarIcon: () => <FontAwesome name='plus' size={20} />,
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: () => <FontAwesome name='gear' size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const { state } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Search'
        headerMode='none'
        screenOptions={{ title: 'Tracks' }}
      >
        {state.token === null ? (
          <Stack.Screen name='loginFlow' component={LoginFlow} />
        ) : (
          <Stack.Screen name='mainFlow' component={MainFlow} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
