import {property} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {formErrorStyle, formHintStyle, labelStyle} from "../../util/style/formStyle";
import {style} from "./style";
import {filter} from "../../util/nodeListHelper";
import {renderAsterisks} from "../../util/render/renderAsterisks";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) value: string | string[] = [];
    @property({type: String}) name?: string;
    @property({type: Boolean}) disabled: boolean = false;
    @property({ type: Boolean }) required: boolean = false;
    @property({ type: String }) error?: string;
    @property({ type: String }) hint?: string;

    type!: 'radio' | 'checkbox';

    static styles = [defaultStyle, formHintStyle, formErrorStyle, labelStyle, style];

    render = () => html`
        <label tabindex="-1">
            ${this.label}
            ${renderAsterisks(this.required)}
        </label>
        <div class="options">
            ${this.renderFields()}
        </div>
        ${renderFormErrorMsg(this.error)}
        ${renderFormInputHint(this.hint)}
    `

    renderFields = () => filter(this.childNodes, (item: Element) => item.nodeName === 'WF-OPTION')
        .map((item, index) => this.renderOption(item, index));

    renderOption(item: HTMLInputElement, index: number) {
        const id = `input-${index}`;
        const value = item.getAttribute('value');
        const checked = this.value.includes(value);
        return html`
            <input
                id="${id}"
                type="${this.type}"
                name="${this.name}"
                value="${value}"
                ?disabled="${this.disabled}"
                ?checked="${checked}"
                @change="${this.handleChange}"
            />
            <label for="${id}">
                <span></span>
                ${item.innerHTML}
            </label>
        `
    }

    connectedCallback() {
        this.type = this.hasAttribute('multiple') ? 'checkbox' : 'radio'
        super.connectedCallback();
    }

    changeHandlerMap: {[key: string]: (value: string) => void} = {
        radio: (value) => {
            if(value !== this.value) {
                this.value = value;
            }
        },
        checkbox: (value) => {
            const index = this.value.indexOf(value);
            if(index === -1) {
                (this.value as string[]).push(value);
            } else {
                (this.value as string[]).splice(index, 1);
            }
        }
    }

    handleChange = ({ target }: Event) => {
        const { value } = target as HTMLSelectElement;
        if(this.disabled) {
            return;
        }
        this.changeHandlerMap[this.type](value);
        this.dispatchEvent(new CustomEvent('onChange', {detail: this.value}));
    }
}

if (!customElements.get('wf-options')) {
    customElements.define('wf-options', Component);
}

