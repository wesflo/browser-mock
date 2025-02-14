import {property} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {formErrorStyle, formHintStyle, formStyle, labelStyle} from "../../style/formStyle";
import {style} from "./style";
import {filter} from "../../util/nodeListHelper";
import {classMap} from "lit-html/directives/class-map.js";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {renderFormErrorMsg} from "../../util/render/renderFormErrorMsg";
import {renderFormInputHint} from "../../util/render/renderFormInputHint";
import {renderAsterisks} from "../../util/render/renderAsterisks";

export default class Component extends LitElement {
    @property({type: String}) label!: string;
    @property({type: String}) value?: string;
    @property({type: Boolean}) disabled: boolean = false;
    @property({ type: Boolean }) required: boolean = false;
    @property({ type: String }) error?: string;
    @property({ type: String }) hint?: string;

    static styles = [defaultStyle, formHintStyle, formErrorStyle, formStyle, labelStyle, style];

    render() {
        return html`
            <select 
                    id="select" 
                    class="${classMap({hide: !this.value})}" 
                    ?disabled="${this.disabled}"
                    @change="${this.handleChange}"
            >
                ${this.renderSelectOptions(this.childNodes)}
            </select>
            <label for="select" class="${classMap({active: this.value})}">
                ${this.label}
                ${renderAsterisks(this.required)}
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-360 280-560h400L480-360Z"/></svg>
            ${renderFormErrorMsg(this.error)}
            ${renderFormInputHint(this.hint)}
        `
    }

    renderSelectOptions = (nodeList: NodeList) => {
        return filter(nodeList, (item: Element) => item.nodeName === 'WF-OPTION')
            .map((item: HTMLOptionElement) => {
                const value = item.getAttribute('value')
                return html`
                    <option 
                            value="${ifDefined(value)}"
                            ?selected="${this.value === value}"
                    >
                        ${item.innerText}
                    </option>
                `
                });
    }

    handleChange = ({ target }: Event) => {
        const { value } = target as HTMLSelectElement;
        if(this.disabled || value === this.value) {
            return;
        }
        this.value = value;
        this.dispatchEvent(new CustomEvent('onChange', {detail: this.value}));
    }
}

if (!customElements.get('wf-select')) {
    customElements.define('wf-select', Component);
}