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
import { getStorageItem} from "../../../../util/storage";
import {STORAGE_PROJECTS} from "../../../../constant";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {uid} from "../../../../util/uid";

export class Component extends LitElement {
    @property({type: String}) error: string = '';
    @property({type: Boolean}) isUpdate: boolean = false;
    @property({type: String}) id!: string;

    @state() showForm: boolean = false;
    @state() values?: Partial<IFormValues> = {};

    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<Component, IFormValues> = new FormController(this);

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <wf-input name="name" label="Project Name" value="${ifDefined(this.values.name)}" required></wf-input>
            <wf-input name="path" label="Absolut Path to manifest.json" value="${ifDefined(this.values.path)}" required></wf-input>
            <wf-file name="configFile" label="manifest.json" accept=".json" ?required="${!this.isUpdate}"></wf-file>
            <div class="buttons right">
                ${this.isUpdate ? html`<wf-button @onClick="${this.handleDelete}" appearance="secondary-outline" size="l" style="margin-right: auto">delete</wf-button>` : nothing}
                <wf-button @onClick="${this.handleCancel}" size="l" appearance="secondary-outline">cancel</wf-button>
                <wf-button @onClick="${this.handleFormSubmit}" size="l">save</wf-button>
            </div>
        `;
    }

    async connectedCallback() {
        const projects = await getStorageItem(STORAGE_PROJECTS) || {};

        if(!this.id) {
            this.id = uid();
        } else {
            this.values = projects[this.id];
        }

        super.connectedCallback();
    }

    handleCancel = () => {
         this.dispatchEvent(new CustomEvent('onCancel'));
    }

    handleDelete = () => {
         this.dispatchEvent(new CustomEvent('onDelete', {detail: this.id}));
    }

    handleFormSubmit = () => {
        if(this.form.validate()) {
            const data: any = this.form.getValues();
            data.id = this.id;
            this.dispatchEvent(new CustomEvent('onSubmit', {detail: data}));
        }
    }
}

if (!customElements.get('wf-project-form')) {
    customElements.define('wf-project-form', Component);
}