import { dispatch, addObserver, appState } from '../../store/index';
import { getProductsAction } from '../../store/actions';
import Products, { AttributeProducts } from '../../components/products/products';
import '../../components/products/products';
import NavBar from '../../components/navBar/navBar'; // Importamos NavBar

class ModifyProducts extends HTMLElement {
    private productsContainer?: HTMLElement;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    async connectedCallback() {
        if (appState.products.length === 0) {
            const action = await getProductsAction();
            if (action) {
                dispatch(action);
            }
        }
        this.render();
    }

    async renderProducts() {
        console.log(appState.products);
        if (!this.productsContainer) return; // Check if the container exists

        if (!appState.products || !Array.isArray(appState.products)) {
            console.log('No products found');
            return;
        }

        this.productsContainer.innerHTML = ''; // Clean container

        appState.products.forEach((product: any) => {
            console.log(product.id);
            const productComponent = this.ownerDocument.createElement('products-component') as Products;
            productComponent.setAttribute(AttributeProducts.url, product.url);
            productComponent.setAttribute(AttributeProducts.album, product.album);
            productComponent.setAttribute(AttributeProducts.artist, product.artist);
            productComponent.setAttribute(AttributeProducts.price, product.price.toString());
            productComponent.setAttribute(AttributeProducts.quantity, product.quantity.toString());
            productComponent.setAttribute(AttributeProducts.uid, product.id);
            productComponent.classList.add('product');
            this.productsContainer?.appendChild(productComponent);
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ''; // Clean the shadowRoot

            const homeContainer = this.ownerDocument.createElement('section');
            homeContainer.className = 'home-container';

            // Reemplazo de botones por NavBar
            const navBar = this.ownerDocument.createElement('nav-bar');
            homeContainer.appendChild(navBar);

            this.productsContainer = this.ownerDocument.createElement('div');
            this.productsContainer.className = 'products-container';

            homeContainer.appendChild(this.productsContainer);
            this.shadowRoot.appendChild(homeContainer);

            this.renderProducts();
        }
    }
}

customElements.define('app-modify-products', ModifyProducts);
export default ModifyProducts;
