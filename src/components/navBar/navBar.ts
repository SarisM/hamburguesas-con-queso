import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.navigateTo = this.navigateTo.bind(this); // Asegurar contexto
    }

    connectedCallback() {
        this.render();
    }

    async navigateTo(screen: any) {
        try {
            const response = await navigate(screen);
            if (response) {
                dispatch(response);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`Error navigating to screen ${screen}:`, error);
            return false;
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            // Estilos encapsulados
            const style = document.createElement('style');
            style.textContent = `
                .nav-bar {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    background: linear-gradient(90deg, #4CAF50, #2196F3);
                    padding: 15px 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .nav-button {
                    background-color: white;
                    color: #333;
                    border: none;
                    padding: 12px 24px;
                    font-size: 18px;
                    font-family: Arial, sans-serif;
                    font-weight: bold;
                    cursor: pointer;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    transition: transform 0.2s, background-color 0.3s;
                }
                .nav-button:hover {
                    background-color: #f1f1f1;
                    transform: scale(1.05);
                }
                .nav-button:active {
                    transform: scale(0.95);
                }
            `;

            // Contenedor de la barra de navegación
            const navBar = document.createElement('div');
            navBar.className = 'nav-bar';

            // Botones
            const buttons = [
                { text: 'Home', screen: Screens.HOME },
                { text: 'Add Product', screen: Screens.ADDPRODUCTS },
                { text: 'Modify Product', screen: Screens.MODIFYPRODUCTS },
                
            ];

            buttons.forEach(({ text, screen }) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.className = 'nav-button';
                button.addEventListener('click', () => this.navigateTo(screen));
                navBar.appendChild(button);
            });

            // Añade los elementos al shadowRoot
            this.shadowRoot.append(style, navBar);
        }
    }
}

customElements.define('nav-bar', NavBar);
export default NavBar;
