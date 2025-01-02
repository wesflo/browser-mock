import {html, LitElement} from "lit";
import {property} from "lit/decorators.js";
import {classMap} from "lit-html/directives/class-map.js";
import {Task} from '@lit/task';
import {TAB_API_MOCKS, TAB_PROJECTS, TABS} from "./constant";
import {TCurrentView} from "./interface";
import {style} from "./style";
import i18n from "../i18n.json";
import {defaultStyle} from "../util/style/defaultStyle";
import {resetStyle} from "../util/style/resetStyle";
import "../component/switch";
import "../component/progress";
import "../views/error";
import {getStorageItem, setStorageItem} from "../util/storage";
import {STORAGE_ACTIVE} from "../constant";

export class BrowserMock extends LitElement {
    @property({type: Boolean, reflect: true}) bmIsActive: boolean = false;

    @property({type: String}) currentView: TCurrentView = TAB_API_MOCKS; // TAB_API_MOCKS; // TAB_PROJECTS //Default view

    static styles = [resetStyle, defaultStyle, style];

    render() {
        return [
            html`
                <nav>
                    ${TABS.map(this.renderTabLink)}
                    ${this.buttonTask.render({
                        complete: this.renderButtons
                    })}
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

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('wfReloadApp', this.handleReloadApp);
    }

    disconnectedCallback() {
        window.removeEventListener('wfReloadApp', this.handleReloadApp);
        super.disconnectedCallback();
    }

    viewsMap = {
        [TAB_PROJECTS]: async () => {
            await import("../views/projects");
            return html`
                <wf-view-projects></wf-view-projects>`;
        },
        [TAB_API_MOCKS]: async () => {
            await import("../views/mocks");
            return html`
                <wf-view-mocks></wf-view-mocks>`;
        },
    }

    viewLoadTask = new Task(this, {
        task: async ([currentView]) => this.viewsMap[currentView](),
        args: () => [this.currentView],
    });

    buttonTask = new Task(this, {
        task: async () => await getStorageItem(STORAGE_ACTIVE, false),
        args: () => [],
    });

    renderTabLink = (tab: TCurrentView) => html`
        <a href="#" class="tab-link${classMap({active: this.currentView === tab})}" @click="${() => this.currentView = tab}">${i18n.tab[tab]}</a>
    `

    renderButtons = (checked) => {
        return html`
        <wf-switch @onChange="${this.handleToggleBm}" inverse ?checked="${checked}"></wf-switch>
    `
    }

    handleToggleBm = () => {
        this.bmIsActive = !this.bmIsActive;
        setStorageItem(STORAGE_ACTIVE, this.bmIsActive)
    }

    handleReloadApp = () => {
        this.viewLoadTask.run()
    }
}


if (!customElements.get('wf-bm-popup')) {
    customElements.define('wf-bm-popup', BrowserMock);
}