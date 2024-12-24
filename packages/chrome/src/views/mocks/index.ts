import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {textStyle} from "../../util/style/textStyle";
import {style} from "./style";
import "../../component/button";
import {Task} from "@lit/task";
import {TView} from "./interface";
import {VIEW_PROJECT, VIEW_PROJECTS} from "./constant";
import {IProject} from "../../interface";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @state() view: TView = VIEW_PROJECTS;
    @state() selectedProject?: IProject;

    // @state() view: TView = VIEW_PROJECT; // VIEW_PROJECTS;
    // @state() selectedProject?: IProject = {
    //     id: "m52a0k6iixlc4j928pr",
    //     name: "Test Projekt 1",
    //     path: "/Users/d_wessner/projects/wesflo/browser-mock/playground/mock/manifest.json",
    //     pathPartials: ["", "Users", "d_wessner", "projects", "wesflo", "browser-mock", "playground", "mock"],
    //     active: true
    // };

    static styles = [defaultStyle, textStyle, style];

    render() {
        return this.viewTask.render({
            pending: () => html`
                <wf-progress></wf-progress>`,
            complete: (view) => view,
            error: (e) => html`
                <wf-error error="${e}"></wf-error>`,
        })
    }

    views = {
        [VIEW_PROJECTS]: () => {
            import("./component/projects");
            return html`
                <wf-mock-projects @onOpenProject="${this.handleOpenProject}"></wf-mock-projects>`;
        },
        [VIEW_PROJECT]: () => {
            console.log(this.selectedProject)
            import("./component/project");
            return html`
                <wf-mock-project .project="${this.selectedProject}" @onCancel="${this.showList}"></wf-mock-project>`;
        }
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

    handleOpenProject = ({detail}: CustomEvent) => {
        this.selectedProject = detail;
        this.view = VIEW_PROJECT;
    }

    showList = () => {
        console.log(  )
        this.view = VIEW_PROJECTS;
    }
}

if (!customElements.get('wf-view-mocks')) {
    customElements.define('wf-view-mocks', Component);
}