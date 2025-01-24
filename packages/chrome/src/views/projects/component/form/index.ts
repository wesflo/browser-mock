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
import "../../../../component/textarea";
import {buttonsWrapperStyles} from "../../../../component/button/style";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {uid} from "../../../../util/uid";
import {updateStorageProject} from "../../../../util/updateStorageProject";
import {jsonFileContent} from "../../../../util/jsonFileContent";
import {deleteFromStorageItem, getStorageItem, removeStorageItem, setStorageItem} from "../../../../util/storage";
import {
    STORAGE_ACTIVE_PROJECTS,
    STORAGE_MANIFEST_PREFIX,
    STORAGE_PROJECTS,
    STORAGE_VIEW,
    VIEW_LVL_3
} from "../../../../constant";
import {VIEW_LIST} from "../../constant";
import {toastFactory} from "../../../../component/toast/util/toastFactory";
import {getViewId} from "../../../../util/getViewId";
import {textStyle} from "../../../../util/style/textStyle";

export class Component extends LitElement {
    @property({type: String}) uid: string;
    @property({type: String}) error: string = '';
    @property({type: Boolean}) isUpdate: boolean = false;

    @state() values: Partial<IFormValues> = {};
    @state() showForm: boolean = false;

    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<Component, IFormValues> = new FormController(this);

    toast = toastFactory();

    static styles = [defaultStyle, textStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <wf-input name="name" label="Project Name" value="${ifDefined(this.values.name)}" required></wf-input>
            <wf-input name="path" label="Absolut Path to manifest.json" value="${ifDefined(this.values.path)}" required></wf-input>
            <h4>Manifest</h4>
            <wf-file name="configFile" label="import file" accept=".json" ?required="${!this.isUpdate}"></wf-file>
            <span>or</span>
            <wf-textarea label="file content"></wf-textarea>
            <div class="buttons right">
                ${this.isUpdate ? html`<wf-button @onClick="${this.handleDelete}" appearance="danger-outline" size="l" style="margin-right: auto">delete</wf-button>` : nothing}
                <wf-button @onClick="${this.setView}" size="l" appearance="secondary-outline">cancel</wf-button>
                <wf-button @onClick="${this.handleFormSubmit}" size="l">save</wf-button>
            </div>
        `;
    }

    async connectedCallback() {
        const view = await getViewId(VIEW_LVL_3);
        view && (this.uid = view);

        if(this.uid) {
            const obj = await getStorageItem(STORAGE_PROJECTS);
            this.values = obj[this.uid]
        }

        super.connectedCallback();
    }

    setView = async () => {
        // await setViewId(VIEW_LVL_3, null);getStorageItem
        await deleteFromStorageItem(STORAGE_VIEW, [VIEW_LVL_3]);

        this.dispatchEvent(new CustomEvent('setView', {detail: VIEW_LIST}));
    }

    handleFormSubmit = async () => {
        if(this.form.validate()) {
            const id = this.uid || uid();
            const {name, configFile, path} = this.form.getValues();
            const pathPartials = path.replace('/manifest.json', '').split('/');

            await updateStorageProject(id, {
                id,
                name,
                path,
                pathPartials,
            });

            if (configFile && configFile.length !== 0) {
                const manifest = await jsonFileContent(configFile[0]);
                await setStorageItem(STORAGE_MANIFEST_PREFIX + id, manifest);
            }

            this.toast.add('Project saved', 'success');
            await this.setView();
        }
    }

    handleDelete = async ({detail: id}: CustomEvent) => {
        const {uid} = this
        await deleteFromStorageItem(STORAGE_PROJECTS, [uid]);
        await deleteFromStorageItem(STORAGE_ACTIVE_PROJECTS, [uid]);
        await removeStorageItem(STORAGE_MANIFEST_PREFIX + uid)
        this.toast.add('Project deleted', 'success');
    }
}

if (!customElements.get('wf-projects-form')) {
    customElements.define('wf-projects-form', Component);
}