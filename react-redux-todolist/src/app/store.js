import { createStore } from 'redux';
import rootReducer from '../reducer';

// Una store puede recibir un preloadedState
let preloadedState;
const persistedTodosString = localStorage.getItem('todos');

if(persistedTodosString){
  preloadedState = {
    todos: JSON.parse(persistedTodosString)
  }
}

// Todas las redux store solamente tienen una root reducer function.
// No obstante esta puede estar formada por varios reducers (utilizando combineReducers)
const store = createStore(rootReducer, preloadedState);

export default store;