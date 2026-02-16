import {property, state, queryAll} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {style} from "./style";
import {FormController} from "../../util/formController";
import {inputFieldTypes} from "../../util/formController/constant";
import {IFormValues} from "./interface";
import "../../component/button";
import "../../component/input";
import "../../component/textarea";
import {buttonsWrapperStyles} from "../../component/button/style";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {updateStorageProject} from "../../util/updateStorageProject";
import {deleteFromStorageItem, getStorageItem, removeStorageItem, setStorageItem} from "../../util/storage";
import {
    STORAGE_ACTIVE_PROJECTS, STORAGE_ACTIVE_REQUESTS,
    STORAGE_MANIFEST_PREFIX,
    STORAGE_PROJECTS, STORAGE_SELECTED_PROJECT, STORAGE_TMP_PROJECTS,
    STORAGE_VIEW,
    VIEW_PROJECTS
} from "../../constant";
import {toastFactory} from "../../component/toast/util/toastFactory";
import {textStyle} from "../../style/textStyle";
import {IManifest} from "../../interface";
import {fieldsetStyle} from "../../style/formStyle";

export class Component extends LitElement {
    @property({type: String}) uid: string;
    @property({type: String}) error: string = '';

    @state() values: Partial<IFormValues> = {};
    @state() showForm: boolean = false;
    @state() manifest: IManifest;

    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<Component, IFormValues> = new FormController(this);

    toast = toastFactory();

    static styles = [defaultStyle, textStyle, fieldsetStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <h1>Project: ${this.values.name ? this.values.name : '"new"'}</h1>
            <fieldset>
                <legend>Manifest</legend>
                <wf-input name="path" label="Absolut Path to manifest.json" value="${ifDefined(this.values.path)}" required @onInput="${this.handleInputChange}"></wf-input>
                <wf-textarea
                        name="manifest"
                        label="Manifest content"
                        @onInput="${this.handleManualManifest}"
                        value="${this.manifest ? JSON.stringify(this.manifest, null, 2) : this.values.manifest || ''}"
                ></wf-textarea>
            </fieldset>
            <div class="buttons right">
                ${this.uid ? html`<wf-button @onClick="${this.handleDelete}" appearance="danger-outline" style="margin-right: auto">delete</wf-button>` : nothing}
                <wf-button @onClick="${this.setListView}" appearance="secondary-outline">cancel</wf-button>
                <wf-button @onClick="${this.handleFormSubmit}">save</wf-button>
            </div>
        `;
    }

     connectedCallback() {
        const uid =  getStorageItem(STORAGE_SELECTED_PROJECT, null);

        if(uid) {
            this.uid = uid
            const obj =  getStorageItem(STORAGE_PROJECTS);
            this.values = obj[uid];
            this.manifest =  getStorageItem(STORAGE_MANIFEST_PREFIX + uid);
        } else {
            this.uid = crypto.randomUUID();
            this.values = getStorageItem(STORAGE_TMP_PROJECTS);
        }
        super.connectedCallback();
    }

    disconnectedCallback() {
        removeStorageItem(STORAGE_SELECTED_PROJECT);
        removeStorageItem(STORAGE_TMP_PROJECTS);
    }

    setListView = async () => {
        this.dispatchEvent(new CustomEvent('setView', {detail: VIEW_PROJECTS}));
    }

    handleInputChange = () => {
        setTimeout(() =>  setStorageItem(STORAGE_TMP_PROJECTS, this.form.getValues()),1);
    }

    handleManualManifest = ({detail}: CustomEvent) => {
        this.manifest = detail;
    }

    handleFormSubmit = async () => {
        if(this.form.validate()) {
            const id = this.uid || crypto.randomUUID();
            const {path, manifest} = this.form.getValues();
            const pathPartials = path.replace('/manifest.json', '').split('/');
            const parsedManifest = JSON.parse(manifest);

            await updateStorageProject(id, {
                id,
                name: parsedManifest.name || 'Unknown Project',
                path,
                pathPartials,
            });

            if(manifest) {
                await setStorageItem(STORAGE_MANIFEST_PREFIX + id, JSON.parse(manifest));
                await deleteFromStorageItem(STORAGE_ACTIVE_REQUESTS, [id]);
                await removeStorageItem(STORAGE_TMP_PROJECTS);
                this.toast.add('Project saved', 'success');
                await this.setListView();
                return;
            }

            this.toast.add('Can\'t save manifest', 'error');
        }
    }

    handleDelete = async ({detail: id}: CustomEvent) => {
        const {uid} = this
        await deleteFromStorageItem(STORAGE_PROJECTS, [uid]);
        await deleteFromStorageItem(STORAGE_ACTIVE_PROJECTS, [uid]);
        await removeStorageItem(STORAGE_MANIFEST_PREFIX + uid);
        await removeStorageItem(STORAGE_TMP_PROJECTS);

        this.toast.add('Project deleted', 'success');
        await this.setListView();
    }
}

if (!customElements.get('wf-view-form')) {
    customElements.define('wf-view-form', Component);
}