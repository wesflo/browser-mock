import {property, state, queryAll} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {FormController} from "../../../../util/formController";
import {inputFieldTypes} from "../../../../util/formController/constant";
import {IFormValues} from "./interface";
import "../../../../component/button";
import "../../../../component/input";
import "../../../../component/file";
import {buttonsWrapperStyles} from "../../../../component/button/style";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @state() showForm: boolean = false;

    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<Component, IFormValues> = new FormController(this);

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <wf-input name="name" label="Project Name" required></wf-input>
            <wf-file name="config" label="Project mock config" accept=".json" required></wf-file>
            <div class="buttons right">
                <wf-button @onClick="${this.handleFormSubmit}" size="l">Save</wf-button>
            </div>
        `;
    }

    handleFormSubmit = () => {
        if(this.form.validate()) {
            this.dispatchEvent(new CustomEvent('onSubmit', {detail: this.form.values}));
        }
    }
}

if (!customElements.get('wf-project-form')) {
    customElements.define('wf-project-form', Component);
}