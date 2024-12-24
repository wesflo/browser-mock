import { state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {buttonsWrapperStyles} from "../../../../component/button/style";
import {getStorageItem} from "../../../../util/storage";
import {STORAGE_PROJECTS} from "../../../../constant";
import {IProject, IProjects} from "../../../../interface";

export class Component extends LitElement {
    @state() projects!: IProjects;

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <ul>
                ${Object.values(this.projects).map(this.renderProject)}
            </ul>
        `;
    }

    renderProject = (project: any) => {
        return html`
            <li>
                <span>${project.name}</span>
                <wf-button @onClick="${() => this.editProject(project)}" appearance="primary" size="inherit" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                    </svg>
                </wf-button>
            </li>
        `;
    }

    async connectedCallback() {
        this.projects = await getStorageItem(STORAGE_PROJECTS) || {};
        super.connectedCallback();
    }

    editProject = (project: IProject) => {
        this.dispatchEvent(new CustomEvent('onEdit', {detail: project}));
    }
}

if (!customElements.get('wf-project-list')) {
    customElements.define('wf-project-list', Component);
}