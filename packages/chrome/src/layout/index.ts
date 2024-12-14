import {css, html, LitElement} from "lit";
import {property, query} from "lit/decorators.js";
import {classMap} from "lit-html/directives/class-map.js";
import {Task} from '@lit/task';
import {TAB_CONFIG, TAB_PROJECTS} from "./constant";
import {TCurrentView} from "./interface";
import {style} from "./style";
import i18n from "../i18n.json";
import "../views/error";
import "../views/projects";
import {defaultStyle} from "../util/style/defaultStyle";
import {resetStyle} from "../util/style/resetStyle";

export class BrowserMock extends LitElement {
    @property({type: Boolean}) hidePrice: boolean = false;

    @property({type: String}) currentView: TCurrentView = TAB_PROJECTS; // Default view

    tabs = [
        TAB_PROJECTS,
        TAB_CONFIG
    ];

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
                    ${this.tabs.map(this.renderTabLink)}
                    ${this.renderButtons()}
                </nav>
            `,
            this.viewLoadTask.render({
                pending: () => html`
                    <wf-spinner active></wf-spinner>`,
                complete: (page) => html`
                    <div class="tabs">
                        ${page}
                    </div>
                `,
                error: (e) => html`
                    <wf-error-async error="${e}"></wf-error-async>`,
            }),
        ];
    }

    viewsMap = {
        [TAB_PROJECTS]: async () => {
            await import("../views/projects");
            return html`
                <wf-view-projects></wf-view-projects>`;
        },
        [TAB_CONFIG]: async () => {
            await import("../views/config");
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
        
    `

    handleToast = ({detail}: any) => {

    };
}


if (!customElements.get('wf-bm-popup')) {
    customElements.define('wf-bm-popup', BrowserMock);
}