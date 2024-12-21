import {html, LitElement} from "lit";
import {property} from "lit/decorators.js";
import {classMap} from "lit-html/directives/class-map.js";
import {Task} from '@lit/task';
import {TAB_API_CALLS, TAB_PROJECTS, TABS} from "./constant";
import {TCurrentView} from "./interface";
import {style} from "./style";
import i18n from "../i18n.json";
import {defaultStyle} from "../util/style/defaultStyle";
import {resetStyle} from "../util/style/resetStyle";
import "../component/switch";
import "../component/progress";
import "../views/error";

export class BrowserMock extends LitElement {
    @property({type: Boolean, reflect: true}) bmIsActive: boolean = false;

    @property({type: String}) currentView: TCurrentView = TAB_PROJECTS; // Default view

    static styles = [resetStyle, defaultStyle, style];
    async connectedCallback() {
        this.setInitialState();
        window.addEventListener('updateToastMessage', this.handleToast);
        super.connectedCallback();
    }

    disconnectedCallback() {
        window.removeEventListener('updateToastMessage', this.handleToast);
        super.disconnectedCallback();
    }

    setInitialState() {
        // if (view) {
        //     this.currentView = view;
        // }
    }

    render() {
        return [
            html`
                <nav>
                    ${TABS.map(this.renderTabLink)}
                    ${this.renderButtons()}
                </nav>
            `,
            this.viewLoadTask.render({
                pending: () => html`
                    <wf-progress visible></wf-progress>`,
                complete: (page) => html`
                    <div class="tabs">
                        ${page}
                    </div>
                `,
                error: (e) => html`
                    <wf-error error="${e}"></wf-error>`,
            }),
        ];
    }

    viewsMap = {
        [TAB_PROJECTS]: async () => {
            await import("../views/projects");
            return html`
                <wf-view-projects></wf-view-projects>`;
        },
        [TAB_API_CALLS]: async () => {
            await import("../views/apiCalls");
            return html`
                <wf-view-config></wf-view-config>`;
        },
    }

    viewLoadTask = new Task(this, {
        task: async ([currentView]) => this.viewsMap[currentView](),
        args: () => [this.currentView],
    });

    renderTabLink = (tab: TCurrentView) => html`
        <a href="javascript:void(0)" class="tab-link${classMap({active: this.currentView === tab})}" @click="${() => this.currentView = tab}">${i18n.tab[tab]}</a>
    `

    renderButtons = () => html`
        <wf-switch @onChange="${this.handleToggleBm}" inverse></wf-switch>
    `

    handleToggleBm = () => {
        console.log( 1 )
        this.bmIsActive = !this.bmIsActive;
    }

    handleToast = ({detail}: any) => {

    };
}


if (!customElements.get('wf-bm-popup')) {
    customElements.define('wf-bm-popup', BrowserMock);
}