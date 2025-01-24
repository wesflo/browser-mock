import {property, query} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {formErrorStyle, formHintStyle, formStyle, labelStyle} from "../../style/formStyle";
import {style} from "./style";
import {classMap} from "lit-html/directives/class-map.js";
import {renderAsterisks} from "../../util/render/renderAsterisks";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";
import {FormFieldController} from "../../util/formField";
import {capitalizeFirstLetter} from "../../util/string/capitalizeFirstLetter";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) type: string = 'text';
    @property({type: String}) accept: string = '.json';
    @property({type: String}) value: File[] = [];
    @property({type: Boolean}) multiple: boolean = false;
    @property({type: Boolean}) disabled: boolean = false;
    @property({ type: Boolean }) required: boolean = false;
    @property({ type: String }) error?: string;
    @property({ type: String }) hint?: string;

    @query('input') inputElement!: HTMLInputElement;

    input: FormFieldController<Component> = new FormFieldController(this);

    static styles = [defaultStyle, formStyle, formHintStyle, formErrorStyle, labelStyle, style];

    render() {
        return html`
            <wf-button @onClick="${this.handleBtnClick}" size="inherit" appearance="clean" ?disabled="${this.disabled}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                </svg>
            </wf-button>
            <ul class="input">
                ${this.value.map(this.renderFileListItems)}
            </ul>
            <input
                id="input"
                type="file"
                value="${this.value}"
                ?multiple="${this.multiple}"
                ?disabled="${this.disabled}"
                accept="${this.accept}"
                @change="${this.handleInput}"
            />
            <label for="input" class="${classMap({active: this.value.length})}">
                ${this.label}
                ${renderAsterisks(this.required)}
            </label>
            ${renderFormErrorMsg(this.error)}
            ${renderFormInputHint(this.hint)}
        `
    }

    renderFileListItems = (fiel: File, index: number) => {
        return html`
            <li @click="${() => this.handleItemClick(index)}">
                ${fiel.name}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </li>
        `;
    }

    handleInput = ({ target, type }: Event) => {
        const { files } = target as HTMLInputElement;
        const eventName = `on${capitalizeFirstLetter(type)}`;
        let value = [...files];

        if(this.multiple) {
            value = [...this.value, ...files];
        }
        this.input.handleUpdate(eventName, value)
    }

    handleBtnClick = () => {
        this.inputElement.setAttribute('value', '');
        this.inputElement.click()
    };

    handleItemClick = (index: number) => {
        this.value.splice(index, 1);
        this.requestUpdate();
    };
}

if (!customElements.get('wf-file')) {
    customElements.define('wf-file', Component);
}

