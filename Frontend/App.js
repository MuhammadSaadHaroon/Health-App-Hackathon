import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home as HomeIcon, Calendar, FileText, User } from 'lucide-react-native';

// Screens (To be created)
import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Appointments from './screens/Appointments';
import MedicalRecords from './screens/MedicalRecords';
import Profile from './screens/Profile';
import BookAppointment from './screens/BookAppointment';
import EditProfile from './screens/EditProfile';
import FAQ from './screens/FAQ';
import PrivacySecurity from './screens/PrivacySecurity';
import HelpCenter from './screens/HelpCenter';

import { colors } from './constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { height: 60, paddingBottom: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} /> }}
      />
      <Tab.Screen
        name="Schedule"
        component={Appointments}
        options={{ tabBarIcon: ({ color }) => <Calendar color={color} size={24} /> }}
      />
      <Tab.Screen
        name="Records"
        component={MedicalRecords}
        options={{ tabBarIcon: ({ color }) => <FileText color={color} size={24} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: ({ color }) => <User color={color} size={24} /> }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setUserToken(token);
    } catch (e) {
      console.log('Restoring token failed');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkToken();
    // Simple polling or a better event system could be used here for hackathon
    const interval = setInterval(checkToken, 2000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="BookAppointment" component={BookAppointment} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="PrivacySecurity" component={PrivacySecurity} />
            <Stack.Screen name="HelpCenter" component={HelpCenter} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
