import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';
import Navlink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText='Sign Up for Tracker'
        errorMessage={state.errorMessage}
        buttonText='Sign Up'
        onSubmit={signup}
      />
      <Navlink
        routeName='Signin'
        text='Already have an account? Sign in instead'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginBottom: 15,
  },
});

export default SignupScreen;
