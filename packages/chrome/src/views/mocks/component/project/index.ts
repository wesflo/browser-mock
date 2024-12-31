import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../util/style/textStyle";
import {getStorageItem, mergeStorageItem} from "../../../../util/storage";
import {IActiveMock, IManifest, IManifestRequest, IProject} from "../../../../interface";
import {Task} from "@lit/task";
import {STORAGE_ACTIVE_REQUESTS, STORAGE_MANIFEST_PREFIX} from "../../../../constant";
import "../../../../component/progress";
import "../../../../component/button";
import "./component/requestCard";
import "../../../error";
import {generateRequestId} from "../../../../util/generateRequestId";


export class Component extends LitElement {
    @property({type: Object}) project!: IProject;

    @state() activeMocks!: IActiveMock;

    manifest!: IManifest;
    enableAll: boolean = false;
    initActiveMocks!: IActiveMock;
    rerenderHack = 0;

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
                        <wf-button appearance="primary" size="m" @onClick="${this.handleToggleAll}">
                            toggle all
                        </wf-button>
                    </header>
                    ${manifest.requests.map((request) => html`
                        <wf-mock-project-request-card
                                .rerenderHack="${this.rerenderHack++}"
                                .req="${request}"
                                .activeMocks="${this.activeMocks}"
                                projectId="${this.project.id}"
                        ></wf-mock-project-request-card>
                    `)}
                `,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            });
    }

    projectTask: Task<[IProject]> = new Task(this, {
        task: async ([id]) => {
            const [manifest, allActiveMocks] = await Promise.all([
                getStorageItem(STORAGE_MANIFEST_PREFIX + id),
                getStorageItem(STORAGE_ACTIVE_REQUESTS)
            ]);
            this.manifest = manifest;
            this.activeMocks = allActiveMocks[id] || {};
            this.initActiveMocks = {...this.activeMocks};
            this.enableAll = !Object.values(this.initActiveMocks).length;

            return manifest
        },
        args: () => [this.project.id],
    });

    handleCancel = () => {
        this.dispatchEvent(new CustomEvent('onCancel'));
    }

    handleToggleAll = async () => {
        this.manifest.requests.forEach((req: IManifestRequest) => {
            const activeMockId = generateRequestId(req);

            if(this.enableAll) {
                this.activeMocks[activeMockId] = this.buildActiveMockObj(activeMockId, req)
            } else {
                delete this.activeMocks[activeMockId];
            }

        });

        this.requestUpdate()
        await mergeStorageItem(STORAGE_ACTIVE_REQUESTS, {
            [this.project.id]: this.activeMocks,
        });

        this.enableAll = !this.enableAll;
    }

    buildActiveMockObj = (activeMockId: string, req: IManifestRequest) => {
        const initActiveMock = this.initActiveMocks[activeMockId];

        if(initActiveMock) {
            return initActiveMock
        }

        const {url, method, response} = req;
        const statusArr = Object.keys(req.response);
        const status = statusArr[0];

        return {
            url,
            method,
            status: Number(status),
            path: response[status],
        }

    }

}

if (!customElements.get('wf-mock-project')) {
    customElements.define('wf-mock-project', Component);
}