import { createStore } from 'redux';
import reducer, { initialState } from './reducer';

export let store = createStore(reducer, initialState);
