export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	products: [];
	productToEdit: {};
};

export enum Screens {
	'HOME' = 'HOME',
	'PRODUCTS' = 'PRODUCTS',
	'ADDPRODUCTS' = 'ADDPRODUCTS',
	'MODIFYPRODUCTS' = 'MODIFYPROMDUCTS',
	'EDITPRODUCTS' = 'EDITPRODUCTS',
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'ADDPRODUCTS' = 'ADDPRODUCTS',
	'GETPRODUCTS' = 'GETPRODUCTS',
	'DELETEPRODUCT' = 'DELETEPRODUCT',
	'UPDATEPRODUCT' = 'UPDATEPRODUCT',
}