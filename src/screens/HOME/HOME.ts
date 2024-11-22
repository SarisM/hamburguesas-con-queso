import { dispatch, addObserver, appState } from '../../store/index';
import { getProductsAction } from '../../store/actions';
import ProductsHome, { AttributeProductsHome } from '../../components/productsHome/productsHome';
import '../../components/productsHome/productsHome';
import NavBar from '../../components/navBar/navBar'; // Importamos NavBar

class Home extends HTMLElement {
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
        if (!this.productsContainer) return; // Check if the container exists

        if (!appState.products || !Array.isArray(appState.products)) {
            console.log('No products found');
            return;
        }

        this.productsContainer.innerHTML = ''; // Clean container

        appState.products.forEach((product: any) => {
            const productComponent = this.ownerDocument.createElement('products-home-component') as ProductsHome;
            productComponent.setAttribute(AttributeProductsHome.url, product.url);
            productComponent.setAttribute(AttributeProductsHome.album, product.album);
            productComponent.setAttribute(AttributeProductsHome.artist, product.artist);
            productComponent.setAttribute(AttributeProductsHome.price, product.price.toString());
            productComponent.setAttribute(AttributeProductsHome.quantity, product.quantity.toString());
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

customElements.define('app-home', Home);
export default Home;
