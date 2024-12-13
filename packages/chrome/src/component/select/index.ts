import {property} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {formStyle, labelStyle} from "../../util/style/formStyle";
import {style} from "./style";
import {filter} from "../../util/nodeListHelper";
import {classMap} from "lit-html/directives/class-map.js";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) value?: string;
    @property({type: Boolean}) disabled: boolean = false;
    @property({type: Function}) onChange: (value: typeof this.value) => void;

    static styles = [defaultStyle, formStyle, labelStyle, style];

    render() {
        return html`
            <select 
                    id="select" 
                    class="${classMap({hide: !this.value})}" 
                    ?disabled="${this.disabled}"
                    @change="${this.handleChange}">
                ${this.renderSelectOptions(this.childNodes)}
            </select>
            <label for="select" class="${classMap({active: this.value})}">${this.label}</label>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-360 280-560h400L480-360Z"/></svg>
        `
    }

    renderSelectOptions = (nodeList: NodeList) => {
        return filter(nodeList, (item: Element) => item.nodeName === 'OPTION')
            .map((item: HTMLOptionElement) => html`
                    <option 
                            value="${item.value ? item.value : ''}"
                            ?selected="${this.value === item.value}"
                    >
                        ${item.innerHTML}
                    </option>
                `
            );
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

if (!customElements.get('wf-select')) {
    customElements.define('wf-select', Component);
}