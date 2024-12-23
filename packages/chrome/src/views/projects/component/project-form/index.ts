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

export class Component extends LitElement {
    @property({type: String}) error: string = '';
    @property({type: Boolean}) canDelete: boolean = false;
    @property({type: String}) id!: string;

    @state() showForm: boolean = false;
    @state() values?: IFormValues = {};

    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<Component, IFormValues> = new FormController(this);

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <wf-input name="name" label="Project Name" value="${ifDefined(this.values.name)}"></wf-input>
            <wf-input name="path" label="Absolut Path to manifest.json" value="${ifDefined(this.values.path)}"></wf-input>
            <wf-file name="configFile" label="manifest.json" accept=".json" ></wf-file>
            <div class="buttons right">
                ${this.canDelete ? html`<wf-button @onClick="${this.handleDelete}" appearance="secondary-outline" size="l">delete</wf-button>` : nothing}
                <wf-button @onClick="${this.handleFormSubmit}" size="l">Save</wf-button>
            </div>
        `;
    }

    async connectedCallback() {
        const projects = await getStorageItem(STORAGE_PROJECTS) || {};

        if(!this.id) {
            this.id = `${Object.keys(projects).length + 1}`;
        } else {
            this.values = projects[this.id];
        }

        super.connectedCallback();
    }

    handleDelete = () => {
         this.dispatchEvent(new CustomEvent('onDelete'));
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