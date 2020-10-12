import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signout':
      return { errorMessage: '', token: null };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signup', payload: response.data.token });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
};

const autoSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
  } else {
    dispatch({ type: 'signin', payload: null });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, autoSignin },
  { token: null, errorMessage: '' }
);
