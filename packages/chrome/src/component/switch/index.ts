import { property, query } from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {formErrorStyle, formHintStyle, labelStyle} from "../../util/style/formStyle";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";
import {renderAsterisks} from "../../util/render/renderAsterisks";

export default class Component extends LitElement {
    @property({ type: Boolean, reflect: true }) checked?: boolean;
    @property({ type: Boolean }) disabled: boolean = false;
    @property({ type: Boolean }) required: boolean = false;
    @property({ type: String }) error?: string;
    @property({ type: String }) hint?: string;

    static styles = [defaultStyle, formHintStyle, formErrorStyle, labelStyle, style];

    render() {
        return html`
            <input type="checkbox" id="switch" ?checked="${this.checked}" @change="${this.handleChange}" />
            <label for="switch">
                <span></span>
                <slot></slot>
                ${renderAsterisks(this.required)}
            </label>
            ${renderFormErrorMsg(this.error)}
            ${renderFormInputHint(this.hint)}
        `
    }

    handleChange = () => {
        if(!this.disabled) {
            this.checked = !this.checked;
            this.dispatchEvent(new CustomEvent('onChange', {detail: this.checked}));
        }
    }
}

if (!customElements.get('wf-switch')) {
    customElements.define('wf-switch', Component);
}
