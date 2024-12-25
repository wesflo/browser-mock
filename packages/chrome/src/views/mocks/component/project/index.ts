import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../util/style/textStyle";
import {getStorageItem} from "../../../../util/storage";
import {IActiveRequest, IManifest, IProject} from "../../../../interface";
import {Task} from "@lit/task";
import {STORAGE_ACTIVE_REQUESTS, STORAGE_MANIFEST_PREFIX} from "../../../../constant";
import "../../../../component/progress";
import "../../../../component/button";
import "./component/requestCard";
import "../../../error";


export class Component extends LitElement {
    @property({type: Object}) project!: IProject;

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            ${this.projectTask.render({
                pending: () => html`
                    <wf-progress></wf-progress>`,
                complete: ([manifest, activeRequests]: [IManifest, IActiveRequest]) => html`
                    <header>
                        <wf-button appearance="none" size="m" @onClick="${this.handleCancel}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                        </wf-button>
                        <h2>${this.project.name}</h2>
                    </header>
                    <dl>
                        <dt>Domains</dt>
                        <dd>${manifest.domains.join(', ')}</dd>
                    </dl>
                    ${manifest.requests.map((request) => html`
                            <wf-mock-project-request-card .req="${request}" .activeRequests="${activeRequests}" projectId="${this.project.id}"></wf-mock-project-request-card>
                    `)}
                `,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            })}
        `;
    }

    projectTask: Task<[IProject]> = new Task(this, {
        task: async ([id]) => {
            const [manifest, allActiveRequests] = await Promise.all([
                getStorageItem(STORAGE_MANIFEST_PREFIX + id),
                getStorageItem(STORAGE_ACTIVE_REQUESTS)
            ]);

            return [manifest, allActiveRequests[id] || {}]
        },
        args: () => [this.project.id],
    });

    handleCancel = () => {
        this.dispatchEvent(new CustomEvent('onCancel'));
    }

}

if (!customElements.get('wf-mock-project')) {
    customElements.define('wf-mock-project', Component);
}