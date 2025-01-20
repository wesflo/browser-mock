import { state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {buttonsWrapperStyles} from "../../../../component/button/style";
import {flushStorage, getStorageItem} from "../../../../util/storage";
import {STORAGE_PROJECTS} from "../../../../constant";
import {IProject, IProjects} from "../../../../interface";
import "../../../../component/progress";
import "../../../../component/no-project";
import "../../../../component/button";
import "../../../error";
import {Task} from "@lit/task";

export class Component extends LitElement {
    @state() projects!: IProjects;

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <ul>
                ${this.projectsTask.render({
                    pending: () => html`
                    <wf-progress></wf-progress>`,
                    complete: (projects: IProjects) => {
                        const values = Object.values(projects);
                        if(values.length) {
                            return [
                                values.map(this.renderProject),
                                html`
                                    <li>
                                        <wf-button @onClick="${this.handleResetApp}" appearance="danger-outline">delete all projects</wf-button>
                                    </li>
                                `,
                            ];
                        }
                        return html`<wf-no-project></wf-no-project>`;
                    },
                    error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
                })}
            </ul>
        `;
    }

    async connectedCallback() {
        this.projects = await getStorageItem(STORAGE_PROJECTS) || {};
        super.connectedCallback();
    }

    renderProject = (project: IProject) => {
        return html`
            <li @click="${() => this.editProject(project)}" class="project">
                <span>${project.name}</span>
                <wf-button appearance="primary" size="inherit" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                    </svg>
                </wf-button>
            </li>
        `;
    }

    projectsTask: Task<[any]> = new Task(this, {
        task: async () => {
            return await getStorageItem(STORAGE_PROJECTS) || {};
        },
        args: () => [],
    });

    editProject = (project: IProject) => {
        this.dispatchEvent(new CustomEvent('onEdit', {detail: project}));
    }

    handleResetApp = async () => {
        await flushStorage();
        window.dispatchEvent(new CustomEvent('wfReloadApp', {
            bubbles: true,
        }));
    }
}

if (!customElements.get('wf-projects-list')) {
    customElements.define('wf-projects-list', Component);
}