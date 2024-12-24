import {property, state} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {textStyle} from "../../util/style/textStyle";
import {style} from "./style";
import "../../component/button";
import {Task} from "@lit/task";
import {TView} from "./interface";
import {VIEW_PROJECT, VIEW_PROJECTS} from "./constant";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @state() view: TView = VIEW_PROJECTS;

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            <header>
                <h1>Mocks</h1>
                ${this.viewTask.render({
                    pending: () => html`
                        <wf-progress></wf-progress>`,
                    complete: (view) => view,
                    error: (e) => html`
                        <wf-error error="${e}"></wf-error>`,
                })}

            </header>
        `;
    }

    views = {
        [VIEW_PROJECTS]: () => {
            import("./component/projects");
            return html`
                <wf-view-projects></wf-view-projects>`;
        },
        [VIEW_PROJECT]: () => {
            import("./component/project");
            return html`
                <wf-view-project></wf-view-project>`;
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
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', Component);
}