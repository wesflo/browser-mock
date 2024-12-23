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
import {STORAGE_PROJECTS} from "../../constant";
import {mergeStorageItem} from "../../util/storage";
import {ifDefined} from "lit-html/directives/if-defined.js";
import "../../component/button";
import "../../component/progress";
import "../error";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<CollapseComponent>;

    @state() selectedProjectId?: string;
    @state() view: TView = VIEW_LIST;

    static styles = [defaultStyle, textStyle, style];


    render() {
        return html`
            <header>
                <h1>Projects</h1>
                <div class="buttons">
                    <wf-button @click="${this.addNewProject}">Add new Project</wf-button>
                    
                    
                </div>
            </header>
            
            <wf-button @click="${this.addNewProject}">roject</wf-button>

                    <wf-button @click="${this.addNewProject}" size="xs">Add new Project</wf-button>
                    <wf-button @click="${this.addNewProject}" size="s">Add new Project</wf-button>
                    <wf-button @click="${this.addNewProject}" size="m">Add new Project</wf-button>
                    <wf-button @click="${this.addNewProject}" size="l">Add new Project</wf-button>
                    <wf-button @click="${this.addNewProject}" size="xl">Add new Project</wf-button>

                    <wf-button @click="${this.addNewProject}" size="xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </wf-button>
                    <wf-button @click="${this.addNewProject}" size="s">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </wf-button>
                    <wf-button @click="${this.addNewProject}" size="m">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </wf-button>
                    <wf-button @click="${this.addNewProject}" size="l">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </wf-button>
                    <wf-button @click="${this.addNewProject}" size="xl">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </wf-button>


                    <wf-button @click="${this.addNewProject}" appearance="clean">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="primary">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="secondary">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="tertiary">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="primary-outline">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="secondary-outline">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="tertiary-outline">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="primary-clean">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="secondary-clean">roject</wf-button>
                    <wf-button @click="${this.addNewProject}" appearance="tertiary-clean">roject</wf-button>
            
            ${this.viewTask.render({
                pending: () => html`<wf-progress></wf-progress>`,
                complete: (tab) => tab,
                error: (e) => html`<wf-error error="${e}"></wf-error>`,
            })}
        `;
    }

    editProject = ({detail}: CustomEvent) => {
        this.selectedProjectId = detail;
        this.setView(VIEW_EDIT);
    }

    handleFormSubmit = async ({detail: formValues}: CustomEvent<IFormValues>) => {
        const {name, configFile, id} = formValues;
        const manifest = await jsonFileContent(configFile[0])

        console.log( configFile )

        await mergeStorageItem(STORAGE_PROJECTS, {
            [id]: {
                id,
                name,
                ...manifest,
            }
        });

        this.setView(VIEW_LIST);
    }

    handleDeleteProject = () => {
        this.setView(VIEW_LIST);
    }

    addNewProject = () => {
        // this.setView(VIEW_NEW);
    }

    views = {
        [VIEW_NEW]: () => {
            import("./component/project-form");
            return html`<wf-project-form @onSubmit="${this.handleFormSubmit}"></wf-project-form>`;
        },
        [VIEW_EDIT]: () => {
            import("./component/project-form");
            return html`<wf-project-form @onSubmit="${this.handleFormSubmit}" @onDelete="${this.handleDeleteProject}" id="${ifDefined(this.selectedProjectId)}" canDelete></wf-project-form>`
        },
        [VIEW_LIST]: () => {
            import("./component/project-list");
            return html`<wf-project-list @onEdit="${this.editProject}"></wf-project-list>`;
        }
    }

    setView = (view: typeof VIEW_NEW | typeof VIEW_EDIT | typeof VIEW_LIST) => {
        this.view = view;
    }

    viewTask: Task<[TView]> = new Task(this, {
        task: async ([view]) => {
            if(this.views[view]) {
                return this.views[this.view]();
            }

            return html`<wf-error></wf-error>`;
        },
        args: () => [this.view],
    });
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', Component);
}