import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../style/textStyle";
import {getStorageItem, mergeStorageItem} from "../../../../util/storage";
import {IActiveMock, IManifest, IManifestRequest, IProject} from "../../../../interface";
import {Task} from "@lit/task";
import {STORAGE_ACTIVE_REQUESTS, STORAGE_MANIFEST_PREFIX, STORAGE_PROJECTS, VIEW_LVL_3} from "../../../../constant";
import "../../../../component/progress";
import "../../../../component/button";
import "./component/requestCard";
import "../../../error";
import {generateRequestId} from "../../../../util/generateRequestId";
import {getViewId} from "../../../../util/getViewId";


export class Component extends LitElement {
    @property({type: String}) uid: string;

    @state() activeMocks!: IActiveMock;
    @state() project!: IProject;

    manifest!: IManifest;

    static styles = [defaultStyle, textStyle, style];

    render() {
        return this.projectTask.render({
                pending: () => html`
                    <wf-progress></wf-progress>`,
                complete: (manifest: IManifest) => html`
                    <header>
                        <wf-button appearance="secondary-clean" size="m" @onClick="${this.handleCancel}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                            </svg>
                        </wf-button>
                        <div>
                            <h2>${this.project.name}</h2>
                            <dl>
                                <dt>Domains</dt>
                                <dd>${manifest.domains.join(', ')}</dd>
                            </dl>
                        </div>

                    </header>
                    ${manifest.requests.map((request) => {
                        const id = generateRequestId(request);
                        return html`
                            <wf-mock-project-request-card
                                    uid="${id}"
                                    pid="${this.uid}"
                                    .request="${request}"
                                    .domains="${manifest.domains}"
                                    .activeMock="${this.activeMocks[id]}"
                            ></wf-mock-project-request-card>
                        `
                    })}
                `,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            });
    }

    async connectedCallback() {
        const view = await getViewId(VIEW_LVL_3);
        view && (this.uid = view);

        super.connectedCallback();
    }

    projectTask: Task<[string]> = new Task(this, {
        task: async ([id]) => {
            const [manifest, allProjects, allActiveMocks] = await Promise.all([
                getStorageItem(STORAGE_MANIFEST_PREFIX + id),
                getStorageItem(STORAGE_PROJECTS),
                getStorageItem(STORAGE_ACTIVE_REQUESTS),
            ]);

            this.manifest = manifest;
            this.project = allProjects[id];
            this.activeMocks = allActiveMocks[id] || {};

            return manifest
        },
        args: () => {
            return [this.uid]
        },
    });

    handleCancel = () => {
        this.dispatchEvent(new CustomEvent('onCancel'));
    }
}

if (!customElements.get('wf-mock-project')) {
    customElements.define('wf-mock-project', Component);
}