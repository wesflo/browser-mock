import { property, query } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {labelStyle} from "../../util/style/formStyle";

export default class Component extends LitElement {
    @property({ type: Boolean }) checked: boolean = true;
    @property({ type: Boolean }) disabled: boolean = false;
    @property({ type: Function }) onChange: (checked: typeof this.checked) => void;

    static styles = [defaultStyle, labelStyle, style];

    render() {
        return html`
            <input type="checkbox" id="switch" ?checked="${this.checked}" @change="${this.handleChange}" />
            <label for="switch">
                <span></span>
                <slot></slot>
            </label>
        `
    }

    handleChange = () => {
        if(!this.disabled) {
            this.checked = !this.checked;
            this.onChange && this.onChange(this.checked)
        }
    }
}

if (!customElements.get('wf-switch')) {
    customElements.define('wf-switch', Component);
}
