import {property} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {formErrorStyle, formHintStyle, formStyle, labelStyle} from "../../util/style/formStyle";
import {style} from "./style";
import {classMap} from "lit-html/directives/class-map.js";
import {capitalizeFirstLetter} from "../../util/string/capitalizeFirstLetter";
import {renderAsterisks} from "../../util/render/renderAsterisks";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) type: string = 'text';
    @property({type: String}) value: string = '';
    @property({type: Boolean}) disabled: boolean = false;
    @property({ type: Boolean }) required: boolean = false;
    @property({ type: String }) error?: string;
    @property({ type: String }) hint?: string;

    static styles = [defaultStyle, formStyle, formHintStyle, formErrorStyle, labelStyle, style];

    render() {
        return html`
            <input
                    id="input"
                    type="${this.type}"
                    ?disabled="${this.disabled}"
                    value="${this.value}"
                    @change="${this.handleDefaultEvents}"
                    @blur="${this.handleDefaultEvents}"
                    @input="${this.handleInput}"
            />
            <label for="input" class="${classMap({active: this.value})}">
                ${this.label}
                ${renderAsterisks(this.required)}
            </label>
            ${renderFormErrorMsg(this.error)}
            ${renderFormInputHint(this.hint)}
        `
    }
    handleDefaultEvents = (e: Event) => {
        this.dispatchEvent(new CustomEvent(`on${capitalizeFirstLetter(e.type)}`, {detail: this.value}));
    }

    handleInput = ({ target }: Event) => {
        const { value } = target as HTMLSelectElement;
        if(this.disabled || value === this.value) {
            return;
        }

        this.value = value;
        this.dispatchEvent(new CustomEvent('onInput', {detail: this.value}));
    }
}

if (!customElements.get('wf-input')) {
    customElements.define('wf-input', Component);
}

