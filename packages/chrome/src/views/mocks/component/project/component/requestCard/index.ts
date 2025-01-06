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
import SVGAnimatedBoolean from "happy-dom/lib/svg/SVGAnimatedBoolean";


export class Component extends LitElement {
    @property({type: Object}) req!: IManifestRequest;
    @property({type: Object}) activeMock!: IActiveMock;
    @property({type: Boolean}) active: boolean = false;

    @state() enableLogging!: boolean;
    @state() status!: number;
    @state() timeout!: number;

    statusArr: string[];

    static styles = [defaultStyle, textStyle, style];

    render() {
        const {req, statusArr, active, status, enableLogging, timeout} = this;

        return html`
            <div class="card">
                <header>
                    <h4>
                        ${req.name ? req.name : 'Unnamed'}
                    </h4>
                    <h6>
                        <span class="flag ${req.method.toLowerCase()}">${req.method.toUpperCase()}</span>
                        ${req.url}
                    </h6>
                    <wf-switch
                            .checked="${active}"
                            @onChange="${({detail}: CustomEvent) => this.handleRequestToggle(detail)}"
                    >
                        enable
                    </wf-switch>
                </header>
                <div class="cnt">
                    <wf-select
                            label="Status"
                            .value="${status}"
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

                    <wf-options
                            ?disabled="${!active}",
                            .value="${enableLogging ? ['1'] : []}"
                            @onChange="${this.handleRequestLogging}"
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
        this.status = this.activeMock?.status || Number(statusArr[0])
        this.enableLogging = this.activeMock?.enableLogging;
        this.timeout = this.activeMock?.timeout;
        this.statusArr = statusArr;
    }

    handleRequestToggle = async (checked: boolean) => {
        this.handleChange( {
            key: 'active',
            value: checked,
        });
    }

    handleRequestStatus = async ({detail}: CustomEvent) => {
        this.handleChange( {
            key: 'status',
            value: Number(detail),
        });
    }

    handleRequestTimeout = async ({detail}: CustomEvent) => {
        this.handleChange( {
            key: 'timeout',
            value: Number(detail),
        });
    }

    handleRequestLogging = async ({detail}: CustomEvent) => {
        this.handleChange( {
            key: 'enableLogging',
            value: !!detail.length,
        });
    }

    handleChange = (detail) => this.dispatchEvent(new CustomEvent('onChange', {
        detail
    }))
}

if (!customElements.get('wf-mock-project-request-card')) {
    customElements.define('wf-mock-project-request-card', Component);
}