import {property} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {formStyle, labelStyle} from "../../util/style/formStyle";
import {style} from "./style";
import {classMap} from "lit-html/directives/class-map.js";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) type: string = 'text';
    @property({type: String}) value?: string;
    @property({type: Boolean}) disabled: boolean = false;
    @property({type: Function}) onChange: (value: typeof this.value) => void;

    static styles = [defaultStyle, formStyle, labelStyle, style];

    render() {
        return html`
            <textarea 
                    id="textarea" 
                    ?disabled="${this.disabled}" 
                    @change="${this.handleChange}"
            >${this.value}</textarea>
            <label for="textarea" class="${classMap({active: this.value})}">
                ${this.label}
            </label>
        `
    }
    handleChange = ({ target }: Event) => {
        const { value } = target as HTMLSelectElement;
        if(this.disabled || value === this.value) {
            return;
        }
        this.value = value;
        this.onChange && this.onChange(this.value)
    }
}

if (!customElements.get('wf-textarea')) {
    customElements.define('wf-textarea', Component);
}

