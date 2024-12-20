import {property} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {filter} from "../../util/nodeListHelper";
import {ifDefined} from "lit-html/directives/if-defined.js";

export default class Component extends LitElement {
    @property({type: String}) value?: string;
    @property({type: String}) name?: string;
    @property({type: Boolean}) disabled: boolean = false;
    @property({type: Function}) onChange: (value: typeof this.value) => void;

    static styles = [defaultStyle, style];

    render = () => filter(this.childNodes, (item: Element) => item.nodeName === 'WF-OPTION')
            .map((item, index) => this.renderOption(item, index));

    renderOption(item: HTMLInputElement, index: number) {
        const id = `input-${index}`;
        const value = item.getAttribute('value');
        const appearance = item.getAttribute('appearance');
        const checked = this.value === value;

        return html`
            <div class="${ifDefined(appearance)}">
                <input
                    id="${id}"
                    type="radio"
                    name="options"
                    value="${value}"
                    ?disabled="${this.disabled}"
                    ?checked="${checked}"
                    @change="${this.handleChange}"
                />
                <label for="${id}">
                    ${item.cloneNode(true)}
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                        </svg>
                    </span>
                </label>
            </div>
        `
    }

    connectedCallback() {
        super.connectedCallback();
    }

    handleChange = ({ target }: Event) => {
        const { value } = target as HTMLSelectElement;
        if(this.disabled || value === this.value) {
            return;
        }
        this.value = value;
        this.onChange && this.onChange(this.value);
    }
}

if (!customElements.get('wf-option-picker')) {
    customElements.define('wf-option-picker', Component);
}

