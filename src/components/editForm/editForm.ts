import { appState, dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { addProductAction } from '../../store/actions';
import { updateProduct } from '../../utils/firebase';

class EditForm extends HTMLElement {
    editedProduct: any;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.editedProduct = appState.productToEdit;

        // Bind the correct context to the event handler methods
        this.changeUrl = this.changeUrl.bind(this);
        this.changeAlbum = this.changeAlbum.bind(this);
        this.changeArtist = this.changeArtist.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    connectedCallback() {
        this.render();      
    }

    changeUrl(e: Event) {
        const input = e.target as HTMLInputElement;
        this.editedProduct.url = input.value;
    }

    changeAlbum(e: Event) {
        const input = e.target as HTMLInputElement;
        console.log("INPUT", input.value);
        console.log("PRODUCT", this.editedProduct);
        
        this.editedProduct.album = input.value;
    }

    changeArtist(e: Event) {
        const input = e.target as HTMLInputElement;
        this.editedProduct.artist = input.value;
    }

    changePrice(e: Event) {
        const input = e.target as HTMLInputElement;
        this.editedProduct.price = Number(input.value);
    }

    changeQuantity(e: Event) {
        const input = e.target as HTMLInputElement;
        this.editedProduct.quantity = Number(input.value);
    }

    async submitForm() {
        console.log('Edited Product for FB', this.editedProduct);        
        dispatch(updateProduct(this.editedProduct));
        dispatch(navigate(Screens.HOME));
    }

    render() {
        if (!this.shadowRoot) return;

        const container = document.createElement('section');
        container.className = 'form-container';

        const form = document.createElement('div');
        form.className = 'form-div';

        const title = document.createElement('h1');
        title.innerText = 'Edit Product';
        title.className = 'form-title';
        form.appendChild(title);

        // URL Input
        const pUrl = document.createElement('input');
        pUrl.placeholder = 'URL';
        pUrl.type = 'url';
        pUrl.className = 'form-input';
        pUrl.required = true;
        pUrl.addEventListener('change', this.changeUrl);
        form.appendChild(pUrl);

        // Album Input
        const pAlbum = document.createElement('input');
        pAlbum.placeholder = 'Album';
        pAlbum.className = 'form-input';
        pAlbum.required = true;
        pAlbum.addEventListener('change', this.changeAlbum);
        form.appendChild(pAlbum);

        // Artist Input
        const pArtist = document.createElement('input');
        pArtist.placeholder = 'Artist';
        pArtist.className = 'form-input';
        pArtist.required = true;
        pArtist.addEventListener('change', this.changeArtist);
        form.appendChild(pArtist);

        // Price Input
        const pPrice = document.createElement('input');
        pPrice.placeholder = 'Price';
        pPrice.type = 'number';
        pPrice.min = '0';
        pPrice.step = '0.01';
        pPrice.className = 'form-input';
        pPrice.required = true;
        pPrice.addEventListener('change', this.changePrice);
        form.appendChild(pPrice);

        // Quantity Input
        const pQuantity = document.createElement('input');
        pQuantity.placeholder = 'Quantity';
        pQuantity.type = 'number';
        pQuantity.min = '1';
        pQuantity.step = '1';
        pQuantity.className = 'form-input';
        pQuantity.required = true;
        pQuantity.addEventListener('change', this.changeQuantity);
        form.appendChild(pQuantity);

        // Save Button
        const save = document.createElement('button');
        save.innerText = 'Start now';
        save.className = 'form-button';
        save.addEventListener('click', this.submitForm);
        form.appendChild(save);

        container.appendChild(form);
        this.shadowRoot.appendChild(container);
    }
}

customElements.define('edit-form', EditForm);
export default EditForm;