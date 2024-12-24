import {property, queryAll, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import CollapseComponent from "../../component/collapse";
import {textStyle} from "../../util/style/textStyle";
import {VIEW_EDIT, VIEW_LIST, VIEW_NEW} from "./constant";
import {IFormValues} from "./component/project-form/interface";
import {jsonFileContent} from "../../util/jsonFileContent";
import {Task} from "@lit/task";
import {TView} from "./interface";
import {STORAGE_MANIFEST_PREFIX, STORAGE_PROJECTS} from "../../constant";
import {getStorageItem, mergeStorageItem, removeStorageItem, setStorageItem} from "../../util/storage";
import {ifDefined} from "lit-html/directives/if-defined.js";
import "../../component/button";
import "../../component/progress";
import "../error";
import {toastFactory} from "../../component/toast/util/toastFactory";
import {IProject} from "../../interface";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<CollapseComponent>;

    @state() selectedProject?: IProject;
    @state() view: TView = VIEW_LIST;

    static styles = [defaultStyle, textStyle, style];

    toast = toastFactory();

    render() {
        return html`
            <header>
                <h1>Projects</h1>
                <div class="buttons">
                    <wf-button @click="${this.addNewProject}">Add new Project</wf-button>
                </div>
            </header>

            ${this.viewTask.render({
                pending: () => html`
                    <wf-progress></wf-progress>`,
                complete: (view) => view,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            })}
        `;
    }

    editProject = ({detail}: CustomEvent) => {
        this.selectedProject = detail;
        this.setView(VIEW_EDIT);
    }

    handleFormSubmit = async ({detail: formValues}: CustomEvent<IFormValues>) => {
        const {name, configFile, id, path} = formValues;
        const projectMeta = await getStorageItem(STORAGE_PROJECTS)?.[id] || {};
        const pathPartials = path.replace('/manifest.json', '').split('/');
        const projectsData = {
            [id]: {
                ...projectMeta,
                id,
                name,
                path,
                pathPartials,
            }
        };
        await mergeStorageItem(STORAGE_PROJECTS, projectsData);


        if (configFile && configFile.length !== 0) {
            const manifest = await jsonFileContent(configFile[0]);
            await setStorageItem(STORAGE_MANIFEST_PREFIX + id, manifest);
        }

        this.setView(VIEW_LIST);
        this.toast.add('Project saved', 'success');
    }

    handleDeleteProject = async ({detail: id}: CustomEvent) => {
        const projects = await getStorageItem(STORAGE_PROJECTS) || {};
        delete projects[id];
        await setStorageItem(STORAGE_PROJECTS, projects);
        await removeStorageItem(STORAGE_MANIFEST_PREFIX + id)
        this.toast.add('Project deleted', 'success');
        this.setView(VIEW_LIST);
    }

    addNewProject = () => {
        this.setView(VIEW_NEW);
    }

    handleCancel = () => {
        this.setView(VIEW_LIST);
    }

    views = {
        [VIEW_NEW]: () => {
            import("./component/project-form");
            return html`
                <wf-project-form @onSubmit="${this.handleFormSubmit}"></wf-project-form>`;
        },
        [VIEW_EDIT]: () => {
            import("./component/project-form");
            return html`
                <wf-project-form @onSubmit="${this.handleFormSubmit}" @onCancel="${this.handleCancel}"
                                 @onDelete="${this.handleDeleteProject}" .values="${ifDefined(this.selectedProject)}"
                                 isUpdate></wf-project-form>`
        },
        [VIEW_LIST]: () => {
            import("./component/project-list");
            return html`
                <wf-project-list @onEdit="${this.editProject}"></wf-project-list>`;
        }
    }

    setView = (view: typeof VIEW_NEW | typeof VIEW_EDIT | typeof VIEW_LIST) => {
        this.view = view;
    }

    viewTask: Task<[TView]> = new Task(this, {
        task: async ([view]) => {
            if (this.views[view]) {
                return this.views[this.view]();
            }

            return html`
                <wf-error></wf-error>`;
        },
        args: () => [this.view],
    });
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', Component);
}