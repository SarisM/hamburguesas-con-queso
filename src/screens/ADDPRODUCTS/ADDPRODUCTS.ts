import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { addProductAction } from '../../store/actions';
import '../../components/navBar/navBar'; // Importamos nav-bar

class AddProducts extends HTMLElement {
    private credentials = {
        id: this.generateUniqueId(),
        url: '',
        album: '',
        artist: '',
        price: 0,
        quantity: 0,
    };

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.submitForm = this.submitForm.bind(this);
        this.changeUrl = this.changeUrl.bind(this);
        this.changeAlbum = this.changeAlbum.bind(this);
        this.changeArtist = this.changeArtist.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
    }

    private generateUniqueId(): string {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10000);
        return `${timestamp}-${random}`;
    }

    private changeUrl(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.url = input.value;
    }

    private changeAlbum(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.album = input.value;
    }

    private changeArtist(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.artist = input.value;
    }

    private changePrice(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.price = Number(input.value);
    }

    private changeQuantity(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.quantity = Number(input.value);
    }

    private validateForm(): boolean {
        const { url, album, artist, price, quantity } = this.credentials;
        if (!url || !album || !artist) {
            alert('Please fill all text fields');
            return false;
        }
        if (isNaN(price) || price <= 0) {
            alert('Please enter a valid price');
            return false;
        }
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity');
            return false;
        }
        return true;
    }

    private async submitForm() {
        if (!this.validateForm()) return;

        if (!this.credentials.id) {
            this.credentials.id = this.generateUniqueId();
        }

        const response = await addProductAction(this.credentials);
        if (response) {
            dispatch(response);
            dispatch(navigate(Screens.HOME));
        } else {
            alert('Could not create the product');
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = ''; // Limpia el Shadow DOM

        const formContainer = document.createElement('section');
        formContainer.className = 'form-container';

        // Agrega nav-bar
        const navBar = document.createElement('nav-bar');
        formContainer.appendChild(navBar);

        // Formulario
        const form = document.createElement('div');
        form.className = 'form-div';

        const title = document.createElement('h1');
        title.innerText = 'Add Product';
        form.appendChild(title);

        // Campos del formulario
        const fields = [
            { label: 'URL', type: 'text', changeHandler: this.changeUrl },
            { label: 'Album', type: 'text', changeHandler: this.changeAlbum },
            { label: 'Artist', type: 'text', changeHandler: this.changeArtist },
            { label: 'Price', type: 'number', changeHandler: this.changePrice },
            { label: 'Quantity', type: 'number', changeHandler: this.changeQuantity },
        ];

        fields.forEach(({ label, type, changeHandler }) => {
            const labelElement = document.createElement('label');
            labelElement.innerText = label;

            const inputElement = document.createElement('input');
            inputElement.type = type;
            inputElement.addEventListener('input', changeHandler);

            form.appendChild(labelElement);
            form.appendChild(inputElement);
        });

        // Botón de envío
        const submitButton = document.createElement('button');
        submitButton.innerText = 'Add Product';
        submitButton.addEventListener('click', this.submitForm);
        form.appendChild(submitButton);

        formContainer.appendChild(form);
        this.shadowRoot.appendChild(formContainer);
    }
}

customElements.define('app-add-products', AddProducts);
export default AddProducts;
