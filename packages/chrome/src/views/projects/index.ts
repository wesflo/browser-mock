import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../style/textStyle";
import {VIEW_EDIT, VIEW_LIST, VIEW_NEW} from "./constant";
import {Task} from "@lit/task";
import {TView} from "./interface";
import {
    STORAGE_VIEW,
    VIEW_LVL_2, VIEW_LVL_3
} from "../../constant";
import "../../component/button";
import "../../component/progress";
import "../error";
import {getViewId} from "../../util/getViewId";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {mergeStorageItem} from "../../util/storage";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @state() selectedProjectId?: string;
    @state() currentView: TView = VIEW_LIST;

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            <header>
                <h1>Projects</h1>
                <div class="buttons">
                    <wf-button @onClick="${() => this.setView(VIEW_NEW)}">Add new Project</wf-button>
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

    async connectedCallback () {
        const view = await getViewId(VIEW_LVL_2);
        view && (this.currentView = view);
        super.connectedCallback();
    }

    editProject = async ({detail}: CustomEvent) => {
        this.selectedProjectId = detail;
        this.currentView = VIEW_EDIT;
        await mergeStorageItem(STORAGE_VIEW, {
            [VIEW_LVL_2]: VIEW_EDIT,
            [VIEW_LVL_3]: detail,
        })
    }

    views = {
        [VIEW_NEW]: () => {
            import("./component/form");
            return html`
                <wf-projects-form @setView="${({detail}) => this.setView(detail)}"></wf-projects-form>`
        },
        [VIEW_EDIT]: () => {
            console.log( 1 )
            import("./component/form");
            return html`
                <wf-projects-form @setView="${({detail}) => this.setView(detail)}" uid="${ifDefined(this.selectedProjectId)}"></wf-projects-form>`
        },
        [VIEW_LIST]: () => {
            import("./component/list");
            return html`
                <wf-projects-list @onEdit="${this.editProject}"></wf-projects-list>`;
        }
    }

    setView = async (view: typeof VIEW_NEW | typeof VIEW_EDIT | typeof VIEW_LIST) => {
        this.currentView = view;

        await mergeStorageItem(STORAGE_VIEW, {[VIEW_LVL_2]: view});
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
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', Component);
}