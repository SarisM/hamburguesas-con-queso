import { dispatch } from '../store';
import { Actions, Screens } from '../types/store';
import { addProducts, deleteProduct, getProducts, updateProduct } from '../utils/firebase';

export const navigate = (screen: Screens) => {
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    };
};

export const addProductAction = async (product: any) => {
    const success = await addProducts(product);
    if (success) {
        return {
            action: Actions.ADDPRODUCTS,
            payload: product,
        };
    }
    return null;
};

export const getProductsAction = async () => {
    const products = await getProducts();
    return {
        action: Actions.GETPRODUCTS,
        payload: products,
    };
};

export const deleteProductAction = async (uid: string) => {
    await deleteProduct(uid);

    return {
        action: Actions.DELETEPRODUCT,
        payload: uid,
    };
}

export const updateProductAction = async (product: any) => {
    await updateProduct(product);

    return {
        action: Actions.UPDATEPRODUCT,
        payload: product,
    }
}