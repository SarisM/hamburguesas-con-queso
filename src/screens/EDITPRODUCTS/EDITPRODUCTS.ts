import EditForm from '../../components/editForm/editForm';
import '../../components/editForm/editForm';
import NavBar from '../../components/navBar/navBar'; // Importa el NavBar

class EditProducts extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            // Limpia el contenido previo
            this.shadowRoot.innerHTML = '';

            // Contenedor principal
            const mainContainer = this.ownerDocument.createElement('section');
            mainContainer.className = 'main-container';

            // Inserta la barra de navegación
            const navBar = this.ownerDocument.createElement('nav-bar');
            mainContainer.appendChild(navBar);

            // Contenedor para el formulario de edición
            const formContainer = this.ownerDocument.createElement('section');
            formContainer.className = 'form-container';

            // Instancia del componente EditForm
            const editFormComponent = this.ownerDocument.createElement('edit-form') as EditForm;
            formContainer.appendChild(editFormComponent);

            // Añade los elementos al contenedor principal
            mainContainer.appendChild(formContainer);

            // Añade el contenedor principal al shadow DOM
            this.shadowRoot.appendChild(mainContainer);
        }
    }
}

customElements.define('app-edit-products', EditProducts);
export default EditProducts;
