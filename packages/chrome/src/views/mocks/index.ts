import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {textStyle} from "../../style/textStyle";
import {style} from "./style";
import "../../component/button";
import {Task} from "@lit/task";
import {TView} from "./interface";
import {VIEW_PROJECT, VIEW_PROJECTS} from "./constant";
import {getViewId} from "../../util/getViewId";
import {STORAGE_VIEW} from "../../constant";
import {mergeStorageItem} from "../../util/storage";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @state() currentView: TView = VIEW_PROJECTS;
    @state() selectedProjectId?: string;

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

    async connectedCallback () {
        // const view = await getViewId();
        // view && (this.currentView = view);
        super.connectedCallback();
    }

    views = {
        [VIEW_PROJECTS]: () => {
            import("./component/projects");
            return html`
                <wf-mock-projects @onOpenProject="${this.handleOpenProject}"></wf-mock-projects>`;
        },
        [VIEW_PROJECT]: () => {
            import("./component/project");
            return html`
                <wf-mock-project uid="${this.selectedProjectId}" @onCancel="${this.showList}"></wf-mock-project>`;
        }
    }

    viewTask: Task<[TView]> = new Task(this, {
        task: async ([view]) => {
            if (this.views[view]) {
                return this.views[this.currentView]();
            }

            return html`
                <wf-error></wf-error>`;
        },
        args: () => [this.currentView],
    });

    handleOpenProject = async ({detail}: CustomEvent) => {
        await mergeStorageItem(STORAGE_VIEW, {
            [VIEW_LVL_2]: VIEW_PROJECT,
            [VIEW_LVL_3]: detail,
        });
        this.currentView = VIEW_PROJECT;
        this.selectedProjectId = detail;
    }

    showList = async () => {
        this.currentView = VIEW_PROJECTS;
    }
}

if (!customElements.get('wf-view-mocks')) {
    customElements.define('wf-view-mocks', Component);
}