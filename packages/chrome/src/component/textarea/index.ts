import {property} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {formErrorStyle, formHintStyle, formStyle, labelStyle} from "../../style/formStyle";
import {style} from "./style";
import {classMap} from "lit-html/directives/class-map.js";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";
import {renderAsterisks} from "../../util/render/renderAsterisks";
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

    static styles = [defaultStyle, formHintStyle, formErrorStyle, formStyle, labelStyle, style];

    render() {
        return html`
            <textarea 
                    id="textarea" 
                    ?disabled="${this.disabled}"
                    @change="${this.input.handleInput}"
                    @blur="${this.input.handleInput}"
                    @input="${this.input.handleInput}"
            >${this.value}</textarea>
            <label for="textarea" class="${classMap({active: this.value})}">
                ${this.label}
                ${renderAsterisks(this.required)}
            </label>
            ${renderFormErrorMsg(this.error)}
            ${renderFormInputHint(this.hint)}
        `
    }
}

if (!customElements.get('wf-textarea')) {
    customElements.define('wf-textarea', Component);
}

