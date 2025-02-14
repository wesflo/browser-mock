import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../../../style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../../../style/textStyle";
import {IActiveMock, IManifestRequest, TManifestDomains} from "../../../../../../interface";
import "../../../../../../component/input";
import "../../../../../../component/button";
import "../../../../../../component/switch";
import "../../../../../../component/select";
import "../../../../../../component/options";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {getStorageItem, setStorageItem} from "../../../../../../util/storage";
import {STORAGE_ACTIVE_REQUESTS} from "../../../../../../constant";


export class Component extends LitElement {
    @property({type: String}) uid!: IManifestRequest;
    @property({type: String}) pid!: IManifestRequest;
    @property({type: Array}) domains!: TManifestDomains;
    @property({type: Object}) request!: IManifestRequest;
    @property({type: Object}) activeMock!: IActiveMock;

    @state() status!: number;
    @state() timeout!: number;
    @state() active!: boolean;

    statusArr: string[];

    static styles = [defaultStyle, textStyle, style];

    render() {
        const {request, statusArr, active, status, timeout} = this;

        return html`
            <header>
                <span class="flag ${request.method.toLowerCase()}">${request.method.toUpperCase()}</span>
                <h5>
                    <strong>${request.name ? request.name : 'Unnamed'}</strong>${request.path}
                </h5>
            </header>
            <div class="cnt">
                <wf-select
                        label="Status"
                        value="${status}"
                        ?disabled="${!active}"
                        @onChange="${this.handleRequestStatus}"
                >
                    ${statusArr.map((status) => html`
                        <wf-option value="${status}">${status}</wf-option>
                    `)}
                    <wf-option value="500">500</wf-option>
                </wf-select>

                <wf-input
                        name="name"
                        label="timeout"
                        value="${ifDefined(timeout)}"
                        ?disabled="${!active}"
                        @onChange="${this.handleRequestTimeout}"
                ></wf-input>

                <wf-switch
                        .checked="${active}"
                        @onChange="${({detail}: CustomEvent) => this.handleRequestToggle(detail)}"
                >
                    ${active ? 'active' : 'inactive'}
                </wf-switch>
            </div>
        `;
    }

    connectedCallback() {
        const {request} = this;
        const statusArr = Object.keys(request.response);

        this.active = !!this.activeMock;
        this.status = this.activeMock?.status || Number(statusArr[0])
        this.timeout = this.activeMock?.timeout || 0;
        this.statusArr = statusArr;

        super.connectedCallback();
    }

    handleRequestToggle = async (checked: boolean) => {
        this.active = checked;
        await this.saveActiveMock();
    };

    handleRequestStatus = async ({detail}: CustomEvent) => {
        this.status = Number(detail)
        await this.saveActiveMock();
    };

    handleRequestTimeout = async ({detail}: CustomEvent) => {
        this.timeout = Number(detail);
        await this.saveActiveMock();
    };

    buildActiveMockObj = (): Partial<IActiveMock> => {
        const {request, status, timeout, domains} = this;
        const {path, method, response} = request;

        return {
            domains,
            path,
            method,
            status,
            mockPath: response[String(status)],
            timeout,
        }
    }
    saveActiveMock = async () => {
        const {uid, pid, buildActiveMockObj} = this;
        const allActiveMocks = await getStorageItem(STORAGE_ACTIVE_REQUESTS);
        const activeMocks = allActiveMocks[pid] || {};

        if (this.active) {
            activeMocks[uid] = buildActiveMockObj();
        } else {
            delete activeMocks[uid];
        }

        await setStorageItem(STORAGE_ACTIVE_REQUESTS, {
            ...allActiveMocks,
            [pid]: activeMocks,
        });
    }

}

if (!customElements.get('wf-mock-project-request-card')) {
    customElements.define('wf-mock-project-request-card', Component);
}