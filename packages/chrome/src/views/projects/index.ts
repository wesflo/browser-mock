import {property, state} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle, tabsStyles} from "../../style/defaultStyle";
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
import "./component/form";
import "./component/list";
import "../../component/progress";
import "../error";
import {getViewId} from "../../util/getViewId";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {mergeStorageItem} from "../../util/storage";
import {classMap} from "lit-html/directives/class-map.js";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @state() selectedProjectId?: string;
    @state() currentView: TView = VIEW_LIST;

    static styles = [defaultStyle, textStyle, tabsStyles, style];

    render() {
        return html`
            <div class="tabs">
                <wf-projects-list class="${classMap({tab: true, active: this.currentView === VIEW_LIST})}" @onEdit="${this.editProject}"></wf-projects-list>
                <wf-projects-form 
                        class="${classMap({tab: true, active: [VIEW_EDIT, VIEW_NEW].includes(this.currentView)})}"
                        uid="${ifDefined(this.selectedProjectId)}"
                        @setView="${({detail}) => this.setView(detail)}"
                ></wf-projects-form>
            </div>
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

    setView = async (view: typeof VIEW_NEW | typeof VIEW_EDIT | typeof VIEW_LIST) => {
        this.currentView = view;

        await mergeStorageItem(STORAGE_VIEW, {[VIEW_LVL_2]: view});
    }

}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', Component);
}