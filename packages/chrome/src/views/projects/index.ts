import {state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {style} from "./style";
import {STORAGE_PROJECTS} from "../../constant";

import "../../component/button";
import "../../component/progress";
import "../../component/no-project";
import {getStorageItem} from "../../util/storage";
import {IProject, IProjects} from "../../interface";
import {buttonsWrapperStyles} from "../../component/button/style";
import {MouseEvent} from "happy-dom";

export class Component extends LitElement {
    static styles = [defaultStyle, buttonsWrapperStyles, style];

    @state() projects: IProjects = {};

    render() {
        const values = Object.values(this.projects);

        if (!values.length) {
            return html`
                <wf-no-project></wf-no-project>
            `;
        }
        return html`
            <ul>
                ${values.map(this.renderProject)}
            </ul>`

    }

    connectedCallback() {
        super.connectedCallback();
        this.projects = getStorageItem(STORAGE_PROJECTS);
    }

    renderProject = (project: IProject) => {
        return html`
            <li class="project">
                <a href="#${project.id}" @click="${(e) => this.openProject(e, project.id)}">${project.name}</a>
                <div class="buttons">
                    <wf-button
                            appearance="primary"
                            size="inherit"
                            @onClick="${() => this.editProject(project.id)}"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </wf-button>
                </div>
            </li>
        `;
    }

    editProject = (id: string) => {
        this.dispatchEvent(new CustomEvent('onEditProject', {detail: id}));
    }

    openProject = (e: MouseEvent, id: string) => {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('onOpenProject', {detail: id}));
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', Component);
}