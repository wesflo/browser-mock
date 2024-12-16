import {property} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {labelStyle} from "../../util/style/formStyle";
import {style} from "./style";
import {filter} from "../../util/nodeListHelper";

export default class Component extends LitElement {
    @property({type: Boolean}) checked: boolean = false;
    @property({type: String}) value: string | string[] = [];
    @property({type: String}) name?: string;
    @property({type: Boolean}) disabled: boolean = false;
    @property({type: Function}) onChange: (value: typeof this.value) => void;

    type!: 'radio' | 'checkbox';

    static styles = [defaultStyle, labelStyle, style];

    render = () => filter(this.childNodes, (item: Element) => item.nodeName === 'WF-OPTION')
            .map((item, index) => this.renderOption(item, index));

    renderOption(item: HTMLInputElement, index: number) {
        const id = `input-${index}`;
        const value = item.getAttribute('value');
        const checked = this.value.includes(value);
        return html`
            <div>
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
            </div>
        `
    }

    connectedCallback() {
        this.type = this.hasAttribute('multiple') ? 'checkbox' : 'radio'
        super.connectedCallback();
    }

    changeHandlerMap: {[key: typeof this.type]: (value: string) => void} = {
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
        this.onChange && this.onChange(this.value);
    }
}

if (!customElements.get('wf-options')) {
    customElements.define('wf-options', Component);
}

