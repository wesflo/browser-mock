import {property, state} from 'lit/decorators.js';
import {html, LitElement, PropertyValues} from 'lit';
import {defaultStyle} from "../../../../../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../../../util/style/textStyle";
import {IActiveMock, IActiveMocks, IManifestRequest} from "../../../../../../interface";
import "../../../../../../component/input";
import "../../../../../../component/button";
import "../../../../../../component/switch";
import "../../../../../../component/select";
import "../../../../../../component/options";
import {generateRequestId} from "../../../../../../util/generateRequestId";
import {mergeStorageItem} from "../../../../../../util/storage";
import {STORAGE_ACTIVE_REQUESTS} from "../../../../../../constant";
import {ifDefined} from "lit-html/directives/if-defined.js";


export class Component extends LitElement {
    @property({type: Object}) req!: IManifestRequest;
    @property({type: Array}) activeMocks!: IActiveMocks;
    @property({type: String}) projectId!: string;
    @property({type: String}) rerenderHack!: string;

    @state() active!: boolean;
    @state() enableLogging!: boolean;
    @state() status!: number;
    @state() timeout!: number;

    statusArr: string[];
    activeMockId: string;

    static styles = [defaultStyle, textStyle, style];

    render() {
        const {req, statusArr} = this;

        return html`
            <div class="card">
                <header>
                    <h4>
                        <span class="flag ${req.method.toLowerCase()}">${req.method.toUpperCase()}</span>
                        ${req.url}
                    </h4>
                    <wf-switch
                            ?checked="${this.active}"
                            @onChange="${({detail}: CustomEvent) => this.handleRequestToggle(detail, req)}"
                    >
                        enable
                    </wf-switch>
                </header>
                <div class="cnt">
                    <wf-select
                            label="Status"
                            value="${this.status}"
                            ?disabled="${!this.active}"
                            @onChange="${({detail}: CustomEvent) => this.handleRequestStatus(detail, req)}"
                    >
                        ${this.statusArr.map((status) => html`
                            <wf-option value="${status}">${status}</wf-option>
                        `)}
                        <wf-option value="500">500</wf-option>
                    </wf-select>

                    <wf-input 
                            name="name" 
                            label="timeout" 
                            value="${ifDefined(this.timeout)}"
                            ?disabled="${!this.active}"
                            @onChange="${({detail}: CustomEvent) => this.handleRequestTimeout(detail, req)}"
                    ></wf-input>
                    <wf-options
                            ?disabled="${!this.active}"
                            @onChange="${({detail}: CustomEvent) => this.handleRequestLogging(detail, req)}"
                            multiple
                    >
                        <wf-option value="1">enable Log</wf-option>
                    </wf-options>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();

        const {req} = this;
        const statusArr = Object.keys(req.response);
        const activeMockId = generateRequestId(req);
        const activeMocks: IActiveMock | null = this.activeMocks[activeMockId];

        this.activeMockId = activeMockId;
        this.status = activeMocks?.status || Number(statusArr[0])
        this.active = !!activeMocks;
        this.enableLogging = activeMocks?.enableLogging;
        this.timeout = activeMocks?.timeout;
        this.statusArr = statusArr;
    }

    protected update(changedProperties: PropertyValues) {
        super.update(changedProperties);

        this.active = !!this.activeMocks[this.activeMockId];
    }


    handleRequestToggle = async (active: boolean) => {
        this.active = active;
        await this.saveActiveMock()
    }

    handleRequestStatus = async (status: string) => {
        this.status = Number(status);
        await this.saveActiveMock()
    }

    handleRequestTimeout = async (timeout: string) => {
        this.timeout = Number(timeout);
        await this.saveActiveMock()
    }

    handleRequestLogging = async (log: string) => {
        this.enableLogging = !!log.length;
        await this.saveActiveMock()
    }

    saveActiveMock = async () => {
        if(this.active) {
            const {url, method, response} = this.req;
            this.activeMocks[this.activeMockId] = {
                url,
                method,
                status: this.status,
                timeout: this.timeout,
                enableLogging: this.enableLogging,
                path: response[this.status],
            }
        } else {
            delete this.activeMocks[this.activeMockId];
        }

        await mergeStorageItem(STORAGE_ACTIVE_REQUESTS, {
            [this.projectId]: this.activeMocks,
        });
    }
}

if (!customElements.get('wf-mock-project-request-card')) {
    customElements.define('wf-mock-project-request-card', Component);
}