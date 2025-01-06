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
import {ifDefined} from "lit-html/directives/if-defined.js";


export class Component extends LitElement {
    @property({type: Object}) project!: IProject;

    @state() activeMocks!: IActiveMock;

    manifest!: IManifest;
    enableAll: boolean = false;
    initActiveMocks!: IActiveMock;

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
                    ${manifest.requests.map((request) => {
                        const id = generateRequestId(request);
                        const activeMock = this.activeMocks[id]
                        
                        return html`
                        <wf-mock-project-request-card
                                .req="${request}"
                                .activeMock="${activeMock}"
                                ?active="${ifDefined(activeMock)}"
                                @onChange="${({detail}: CustomEvent) => this.handleRequestChange(id, request, detail)}"
                        ></wf-mock-project-request-card>
                    `
                    })}
                `,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            });
    }

    projectTask: Task<[string]> = new Task(this, {
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

    handleRequestChange = (activeMockId: string, request: IManifestRequest, detail: {key: string, value: number | string | boolean}) => {
        const data = this.buildActiveMockObj(activeMockId, request);
        if(detail.key === 'active') {
            return this.saveSingleMock(detail.value as boolean, activeMockId, data)
        }

        data[detail.key] = detail.value;

        return this.saveSingleMock(!!this.activeMocks[activeMockId], activeMockId, data)
    }

    handleCancel = () => {
        this.dispatchEvent(new CustomEvent('onCancel'));
    }

    handleToggleAll = async () => {
        this.manifest.requests.forEach((req: IManifestRequest) => {
            const activeMockId = generateRequestId(req);
            const data = this.buildActiveMockObj(activeMockId, req);
            this.saveSingleMock(this.enableAll, activeMockId, data)
        });
        this.requestUpdate()

        this.enableAll = !this.enableAll;
    }

    saveSingleMock = async (active: boolean, activeMockId?: string, data?: IActiveMock) => {
        if(active) {
            this.activeMocks[activeMockId] = data
        } else {
            delete this.activeMocks[activeMockId];
        }

        await mergeStorageItem(STORAGE_ACTIVE_REQUESTS, {
            [this.project.id]: this.activeMocks,
        });
    }

    buildActiveMockObj = (activeMockId: string, req: IManifestRequest): IActiveMock => {
        const initActiveMock = this.initActiveMocks[activeMockId];

        if(initActiveMock) {
            return initActiveMock;
        }

        const {url, method, response, timeout} = req;
        const statusArr = Object.keys(req.response);
        const status = statusArr[0];

        return {
            url,
            method,
            status: Number(status),
            path: response[status],
            domains: this.manifest.domains,
            timeout: 0,
            enableLogging: false,
        }
    }

}

if (!customElements.get('wf-mock-project')) {
    customElements.define('wf-mock-project', Component);
}