import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../util/style/textStyle";
import {getStorageItem} from "../../../../util/storage";
import {IActiveMock, IManifest, IProject} from "../../../../interface";
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
                complete: ([manifest, activeMocks]: [IManifest, IActiveMock]) => html`
                    <header>
                        <wf-button appearance="secondary-clean" size="m" @onClick="${this.handleCancel}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
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
                            <wf-mock-project-request-card .req="${request}" .activeMocks="${activeMocks}" projectId="${this.project.id}"></wf-mock-project-request-card>
                    `)}
                `,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            })}
        `;
    }

    projectTask: Task<[IProject]> = new Task(this, {
        task: async ([id]) => {
            const [manifest, allActiveMocks] = await Promise.all([
                getStorageItem(STORAGE_MANIFEST_PREFIX + id),
                getStorageItem(STORAGE_ACTIVE_REQUESTS)
            ]);

            return [manifest, allActiveMocks[id] || {}]
        },
        args: () => [this.project.id],
    });

    handleCancel = () => {
        this.dispatchEvent(new CustomEvent('onCancel'));
    }

    handleToggleAll = () => {
        console.log( 'handleToggleAll' )
    }

}

if (!customElements.get('wf-mock-project')) {
    customElements.define('wf-mock-project', Component);
}