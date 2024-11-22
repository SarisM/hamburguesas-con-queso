import { Actions } from '../types/store';

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case Actions.NAVIGATE:
			return {
				...currentState,
				screen: payload,
			};

		case Actions.ADDPRODUCTS:
			return {
				...currentState,
				products: [...currentState.products, payload],
			};

		case Actions.GETPRODUCTS:
			return {
				...currentState,
				products: payload || [], // Make sure there is always an array
			};

		case Actions.DELETEPRODUCT:
			return {
				...currentState,
				products: [...currentState.products.filter((product: any) => product.uid !== payload)],
			}
		
		case Actions.UPDATEPRODUCT:
			return {
				...currentState,
				products: [...currentState.products.map((product: any) => product.uid === payload.uid ? payload : product)],
			}

		default:
			return currentState;
	}
};