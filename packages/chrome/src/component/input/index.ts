import {property} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {formErrorStyle, formHintStyle, formStyle, labelStyle} from "../../util/style/formStyle";
import {style} from "./style";
import {classMap} from "lit-html/directives/class-map.js";
import {renderAsterisks} from "../../util/render/renderAsterisks";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";
import {FormFieldController} from "../../util/formField";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) type: string = 'text';
    @property({type: String}) value: string = '';
    @property({type: Boolean}) disabled: boolean = false;
    @property({ type: Boolean }) required: boolean = false;
    @property({ type: String }) error?: string;
    @property({ type: String }) hint?: string;

    input: FormFieldController<Component> = new FormFieldController(this);

    static styles = [defaultStyle, formStyle, formHintStyle, formErrorStyle, labelStyle, style];

    render() {
        return html`
            <input
                    id="input"
                    type="${this.type}"
                    ?disabled="${this.disabled}"
                    value="${this.value}"
                    @change="${this.input.handleInput}"
                    @blur="${this.input.handleInput}"
                    @input="${this.input.handleInput}"
            />
            <label for="input" class="${classMap({active: this.value})}">
                ${this.label}
                ${renderAsterisks(this.required)}
            </label>
            ${renderFormErrorMsg(this.error)}
            ${renderFormInputHint(this.hint)}
        `
    }

}

if (!customElements.get('wf-input')) {
    customElements.define('wf-input', Component);
}

