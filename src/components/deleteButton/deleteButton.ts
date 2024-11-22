import { dispatch } from "../../store";
import { deleteProductAction } from "../../store/actions";
import { Actions } from "../../types/store";

export enum Attribute {
    "uid" = "uid",
}
export class DeleteButton extends HTMLElement {

    uid?: string;

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue ? newValue : undefined; 
    }   

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            const button = this.ownerDocument.createElement('button');
            button.textContent = 'Delete';
            button.className = 'delete-button';
            button.addEventListener('click', () => {
                console.log("Delete UID", this.uid);
                dispatch(deleteProductAction(this.uid!));
            });
            this.shadowRoot.appendChild(button);
        }
    }
}
customElements.define('delete-button', DeleteButton);
export default DeleteButton;