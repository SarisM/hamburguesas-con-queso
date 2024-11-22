import { reducer } from './reducer';
import { AppState, Observer, Screens } from '../types/store';

const initialState: AppState = {
	screen: 'HOME',
	products: [],
	productToEdit: {},
};

export let appState = initialState;

let observers: Observer[] = [];

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	observers.forEach((o: any) => o.render());
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};