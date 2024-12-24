import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../util/style/textStyle";
import {getStorageItem} from "../../../../util/storage";
import {IManifest, IManifestRequest, IProject} from "../../../../interface";
import {Task} from "@lit/task";
import {STORAGE_MANIFEST_PREFIX} from "../../../../constant";
import "../../../../component/progress";
import "../../../../component/input";
import "../../../../component/button";
import "../../../../component/switch";
import "../../../../component/select";
import "../../../../component/options";
import "../../../error";


export class Component extends LitElement {
    @property({type: Object}) project!: IProject;

    @state() manifest?: any;

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            ${this.projectTask.render({
                pending: () => html`
                    <wf-progress></wf-progress>`,
                complete: (manifest: IManifest) => html`
                    <header>
                        <wf-button appearance="primary" size="m" @onClick="${this.handleCancel}">
                            back
                        </wf-button>
                        <h2>${this.project.name}</h2>
                    </header>
                    <dl>
                        <dt>Domains</dt>
                        <dd>${manifest.domains.join(', ')}</dd>
                    </dl>
                    ${manifest.requests.map(this.renderRequestCard)}
                `,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            })}
        `;
    }

    renderRequestCard = (req: IManifestRequest) => {
        return html`
                <div class="card">
                    <header>
                        <h4>
                            <span class="flag ${req.method.toLowerCase()}">${req.method.toUpperCase()}</span>
                            ${req.url}
                        </h4>
                        <wf-switch checked>enable</wf-switch>
                    </header>
                    <div class="cnt">
                        <wf-select value="" label="Status">
                            ${Object.keys(req.response).map((status) => html`
                            <wf-option value="${status}">${status}</wf-option>
                        `)}
                            <wf-option value="500">500</wf-option>
                        </wf-select>

                        <wf-input name="name" label="timeout" value=""></wf-input>
                        <wf-options multiple>
                            <wf-option value="1">enable Log</wf-option>
                        </wf-options>
                    </div>
                </div>
        `;
    }

    projectTask: Task<[IProject]> = new Task(this, {
        task: async ([project]) => {
            return await getStorageItem(STORAGE_MANIFEST_PREFIX + project.id);
        },
        args: () => [this.project],
    });

    handleCancel = () => {
        this.dispatchEvent(new CustomEvent('onCancel'));
    }
}

if (!customElements.get('wf-mock-project')) {
    customElements.define('wf-mock-project', Component);
}