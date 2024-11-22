// import * as components from './components/index';
import { addObserver, appState } from './store/index';
import { Screens } from './types/store';
import './screens/EDITPRODUCTS/EDITPRODUCTS';
import './screens/ADDPRODUCTS/ADDPRODUCTS';
import './screens/HOME/HOME';
import './screens/MODIFYPRODUCTS/MODIFYPRODUCTS';


class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            switch (appState.screen) {

                case Screens.HOME:
                    const home = this.ownerDocument.createElement('app-home');
                    this.shadowRoot.appendChild(home);
                    break;

                case Screens.EDITPRODUCTS:
                    const EditProducts = this.ownerDocument.createElement('app-edit-products');
                    this.shadowRoot.appendChild(EditProducts);
                    break;

                case Screens.ADDPRODUCTS:
                    const addProducts = this.ownerDocument.createElement('app-add-products');
                    this.shadowRoot.appendChild(addProducts);
                    break;

                case Screens.MODIFYPRODUCTS:
                    const modifyProducts = this.ownerDocument.createElement('app-modify-products');
                    this.shadowRoot.appendChild(modifyProducts);
                    break;

                default:
                    break;
            }
            console.log('Current screen:', appState.screen);
        }
    }
}

customElements.define('app-container', AppContainer);