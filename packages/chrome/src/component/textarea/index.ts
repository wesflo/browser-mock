import {property} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {formErrorStyle, formHintStyle, formStyle, labelStyle} from "../../util/style/formStyle";
import {style} from "./style";
import {classMap} from "lit-html/directives/class-map.js";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";
import {renderAsterisks} from "../../util/render/renderAsterisks";
import {capitalizeFirstLetter} from "../../util/string/capitalizeFirstLetter";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) type: string = 'text';
    @property({type: String}) value?: string;
    @property({type: Boolean}) disabled: boolean = false;
    @property({ type: Boolean }) required: boolean = false;
    @property({ type: String }) error?: string;
    @property({ type: String }) hint?: string;

    static styles = [defaultStyle, formHintStyle, formErrorStyle, formStyle, labelStyle, style];

    render() {
        return html`
            <textarea 
                    id="textarea" 
                    ?disabled="${this.disabled}"
                    @change="${this.handleDefaultEvents}"
                    @blur="${this.handleDefaultEvents}"
                    @input="${this.handleInput}"
            >${this.value}</textarea>
            <label for="textarea" class="${classMap({active: this.value})}">
                ${this.label}
                ${renderAsterisks(this.required)}
            </label>
            ${renderFormErrorMsg(this.error)}
            ${renderFormInputHint(this.hint)}
        `
    }
    handleInput = ({ target }: Event) => {
        const { value } = target as HTMLSelectElement;
        if(this.disabled || value === this.value) {
            return;
        }
        this.value = value;
        this.dispatchEvent(new CustomEvent('onInput', {detail: this.value}));
    }

    handleDefaultEvents = (e: Event) => {
        this.dispatchEvent(new CustomEvent(`on${capitalizeFirstLetter(e.type)}`, {detail: this.value}));
    }
}

if (!customElements.get('wf-textarea')) {
    customElements.define('wf-textarea', Component);
}

