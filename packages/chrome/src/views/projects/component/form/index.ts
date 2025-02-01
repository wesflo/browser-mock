import {property, state, queryAll} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../../../style/defaultStyle";
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
import {deleteFromStorageItem, getStorageItem, removeStorageItem, setStorageItem} from "../../../../util/storage";
import {
    STORAGE_ACTIVE_PROJECTS, STORAGE_ACTIVE_REQUESTS,
    STORAGE_MANIFEST_PREFIX,
    STORAGE_PROJECTS,
    STORAGE_VIEW,
    VIEW_LVL_3
} from "../../../../constant";
import {VIEW_LIST} from "../../constant";
import {toastFactory} from "../../../../component/toast/util/toastFactory";
import {getViewId} from "../../../../util/getViewId";
import {textStyle} from "../../../../style/textStyle";
import {IManifest} from "../../../../interface";

export class Component extends LitElement {
    @property({type: String}) uid: string;
    @property({type: String}) error: string = '';

    @state() values: Partial<IFormValues> = {};
    @state() showForm: boolean = false;
    @state() manifest: IManifest;

    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<Component, IFormValues> = new FormController(this);

    toast = toastFactory();

    static styles = [defaultStyle, textStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <wf-input name="name" label="Project Name" value="${ifDefined(this.values.name)}" required></wf-input>
            <wf-input name="path" label="Absolut Path to manifest.json" value="${ifDefined(this.values.path)}" required></wf-input>
            <h4>Manifest</h4>
            <div class="m">
                <wf-textarea
                        name="manifest"
                        label="Manifest content"
                        @onInput="${this.handleManualManifest}"
                        value="${this.manifest ? JSON.stringify(this.manifest, null, 2) : ''}"
                ></wf-textarea>
                <span class="spacer">
                    <span>or</span>
                </span>
                <wf-file name="configFile" label="import file" accept=".json"></wf-file>
            </div>
            <div class="buttons right">
                ${this.uid ? html`<wf-button @onClick="${this.handleDelete}" appearance="danger-outline" size="l" style="margin-right: auto">delete</wf-button>` : nothing}
                <wf-button @onClick="${this.setListView}" size="l" appearance="secondary-outline">cancel</wf-button>
                <wf-button @onClick="${this.handleFormSubmit}" size="l">save</wf-button>
            </div>
        `;
    }

    async connectedCallback() {
        const id = await getViewId(VIEW_LVL_3);
        if(id) {
            this.uid = id
            const obj = await getStorageItem(STORAGE_PROJECTS);
            this.values = obj[this.uid];
            this.manifest = await getStorageItem(STORAGE_MANIFEST_PREFIX + id);
        } else {
            this.uid = uid();
        }
        super.connectedCallback();
    }

    setListView = async () => {
        // await setViewId(VIEW_LVL_3, null);getStorageItem
        await deleteFromStorageItem(STORAGE_VIEW, [VIEW_LVL_3]);

        this.dispatchEvent(new CustomEvent('setView', {detail: VIEW_LIST}));
    }

    handleManualManifest = ({detail}: CustomEvent) => {
        this.manifest = detail;
    }

    handleFormSubmit = async () => {
        if(this.form.validate()) {
            const id = this.uid;
            const {name, configFile, path, manifest} = this.form.getValues();
            const pathPartials = path.replace('/manifest.json', '').split('/');

            await updateStorageProject(id, {
                id,
                name,
                path,
                pathPartials,
            });

            const manifestCnt = (configFile.length) ? await configFile[0].text() : manifest;

            if(manifestCnt) {
                await setStorageItem(STORAGE_MANIFEST_PREFIX + id, JSON.parse(manifestCnt));
                await deleteFromStorageItem(STORAGE_ACTIVE_REQUESTS, [id]);

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
        await removeStorageItem(STORAGE_MANIFEST_PREFIX + uid)

        this.toast.add('Project deleted', 'success');
        await this.setListView();
    }
}

if (!customElements.get('wf-projects-form')) {
    customElements.define('wf-projects-form', Component);
}