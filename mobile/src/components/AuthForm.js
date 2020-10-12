import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, buttonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        placeholder='john@example.com'
        autoCapitalize='none'
        autoCorrect={false}
        label='Email'
        leftIcon={{ type: 'font-awesome', color: 'grey', name: 'envelope' }}
        value={email}
        onChangeText={setEmail}
      />
      <Spacer />
      <Input
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
        label='Password'
        placeholder='password'
        leftIcon={{ type: 'font-awesome', color: 'grey', name: 'key' }}
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={buttonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 5,
  },
});

export default AuthForm;
