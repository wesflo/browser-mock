import {state} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {style} from "./style";
import {STORAGE_MANIFEST_PREFIX, STORAGE_PROJECTS, STORAGE_SELECTED_PROJECT} from "../../constant";

import "../../component/button";
import "../../component/progress";
import "../../component/no-project";
import {getStorageItem} from "../../util/storage";
import {IManifest, IManifestMocks, IManifestRequest, IProject, IProjects} from "../../interface";
import {buttonsWrapperStyles} from "../../component/button/style";
import {textStyle} from "../../style/textStyle";
import {classMap} from "lit-html/directives/class-map.js";

export class Component extends LitElement {
    static styles = [defaultStyle, textStyle, buttonsWrapperStyles, style];

    @state() project?: IProject;
    @state() uid: string = '';
    @state() mocks: IManifestMocks[] = [];

    render() {
        if (!this.project) {
            return html`
                <wf-no-project></wf-no-project>
            `;
        }
        return html`
            <header>
                <h1>${this.project.name}</h1>
                <div class="buttons">
                    
                </div>
            </header>
            <ul class="mocks">
                ${this.mocks.map(this.renderMock)}
            </ul>`

    }

    connectedCallback() {
        super.connectedCallback();
        const uid = getStorageItem(STORAGE_SELECTED_PROJECT);
        const projects: IProjects = getStorageItem(STORAGE_PROJECTS);
        const manifest: IManifest = getStorageItem(STORAGE_MANIFEST_PREFIX + uid);

        this.uid = uid;
        this.mocks = manifest.mocks;
        this.project = projects[uid];
    }

    renderMock = (mock: IManifestMocks) => {
        return html`
            <li class="mock">
               <h6>${mock.domains.join(', ')}</h6>
                
                <ul class="requests">
                    ${mock.requests.map(this.renderRequest)}
                    
                </ul>
            </li>
        `;
    }

    renderRequest = (request: IManifestRequest) => {
        const active = true;
        return html`
            <li class="request">
                <wf-switch
                        .checked="${active}"
                        @onChange="${({detail}: CustomEvent<boolean>) => this.handleRequestToggle({
                            request,
                            active: detail,
                        })}"
                >
                </wf-switch>
                <h5>
                    ${request.name ? request.name : 'Unnamed'}
                </h5>
                ${request.timeout ? html`<span class="flag">to: ${request.timeout}</span>` : nothing}
                <span class="flag ${request.method.toLowerCase()}">${request.method.toUpperCase()}</span>
                <span class="${classMap({
                    flag: true,
                    success: request.status < 400,
                    error: request.status >= 400,
                })}">${request.status}</span>
            </li>
        `
    }

    // handleRequestTimeout = async ({request, timeout}: {request: IManifestRequest, timeout: string | number}) => {
    //     this.timeout = Number(detail.timeout);
    //     this.saveActiveMock();
    //     console.log( {request, timeout} );
    // };

    handleRequestToggle = async ({request, active}: {request: IManifestRequest, active: boolean}) => {
        // this.active = detail.active;
        // this.saveActiveMock();
        console.log( {request, active} );
    };
}

if (!customElements.get('wf-view-project')) {
    customElements.define('wf-view-project', Component);
}