import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../util/style/textStyle";
import {state} from "lit/decorators.js";
import {IProject, IProjects} from "../../../../interface";
import {getStorageItem, setStorageItem} from "../../../../util/storage";
import {
    STORAGE_ACTIVE_PROJECTS,
    STORAGE_ACTIVE_REQUESTS,
    STORAGE_MANIFEST_PREFIX,
    STORAGE_PROJECTS
} from "../../../../constant";
import {updateStorageProject} from "../../../../util/updateStorageProject";
import {Task} from "@lit/task";
import "../../../../component/progress";
import "../../../../component/button";
import "../../../../component/switch";
import "../../../error";

export class Component extends LitElement {
    @state() projects!: IProjects;
    @state() activeProjects!: string[];

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            <ul>
                ${this.projectsTask.render({
                    pending: () => html`
                    <wf-progress></wf-progress>`,
                    complete: (projects: IProjects) => Object.values(projects).map(this.renderProject),
                    error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
                })}
            </ul>
        `;
    }

    renderProject = (project: IProject) => {
        return html`
            <li>
                <div class="cta" @click="${() => this.openProject(project)}">
                    <span>${project.name}</span>
                    <wf-button appearance="primary" size="inherit" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M480-480ZM370-80l-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-74 56q-22-11-45-18.5T714-558l63-48-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q17 17 36.5 30.5T400-275q1 57 23.5 107T484-80H370Zm41-279q6-20 14.5-38.5T445-433q-11-8-17-20.5t-6-26.5q0-25 17.5-42.5T482-540q14 0 27 6.5t21 17.5q17-11 35-19.5t38-13.5q-18-32-50-51.5T482-620q-59 0-99.5 41T342-480q0 38 18.5 70.5T411-359Zm269 199 120-120-120-120-28 28 72 72H560v40h163l-71 72 28 28Zm0 80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Z"/>
                        </svg>
                    </wf-button>
                </div>
                <wf-switch @onChange="${({detail}: CustomEvent) => this.toggleProject(detail, project)}" ?checked="${this.activeProjects.includes(project.id) }"></wf-switch>
            </li>
        `;
    }

    projectsTask: Task<[any]> = new Task(this, {
        task: async () => {
            const [projects, activeProjects] = await Promise.all([
                getStorageItem(STORAGE_PROJECTS),
                getStorageItem(STORAGE_ACTIVE_PROJECTS, [])
            ]);

            this.activeProjects = activeProjects;

            return projects;
        },
        args: () => [],
    });

    toggleProject = async (checked: boolean, project: IProject) => {
        const {id} = project;
        checked ? this.activeProjects.push(id) : this.activeProjects.splice(this.activeProjects.indexOf(id), 1);
        setStorageItem(STORAGE_ACTIVE_PROJECTS, this.activeProjects)
    }

    openProject = async (project: IProject) => {
        this.dispatchEvent(new CustomEvent('onOpenProject', {detail: project}));
    }

}

if (!customElements.get('wf-mock-projects')) {
    customElements.define('wf-mock-projects', Component);
}