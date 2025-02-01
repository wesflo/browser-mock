import {html, LitElement} from "lit";
import {property} from "lit/decorators.js";
import {classMap} from "lit-html/directives/class-map.js";
import {Task} from '@lit/task';
import {TAB_API_MOCKS, TAB_PROJECTS, TABS} from "./constant";
import {TCurrentView} from "./interface";
import {style} from "./style";
import i18n from "../i18n.json";
import {defaultStyle} from "../style/defaultStyle";
import {resetStyle} from "../style/resetStyle";
import "../component/switch";
import "../component/progress";
import "../views/error";
import {getStorageItem, mergeStorageItem, setStorageItem} from "../util/storage";
import {STORAGE_ACTIVE, STORAGE_VIEW, VIEW_LVL_1} from "../constant";
import {getViewId} from "../util/getViewId";
import pkg from "../../package.json"

export class BrowserMock extends LitElement {
    @property({type: Boolean, reflect: true}) bmIsActive: boolean = false;

    @property({type: String}) currentView: TCurrentView = TAB_API_MOCKS;

    static styles = [resetStyle, defaultStyle, style];

    render() {
        return [
            html`
                <nav>
                    ${TABS.map(this.renderTabLink)}
                    ${this.buttonTask.render({
                        complete: this.renderSwitch
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
            html`
                <footer>
                    <small>v ${pkg.version}</small>
                    <dl>
                        <dt>Tutorials</dt>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/index.html" target="_blank">General</a>
                        </dd>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/packages/chrome/index.html" target="_blank">Plugin</a>
                        </dd>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/packages/generator/index.html" target="_blank">Generator</a>
                        </dd>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/packages/server/index.html" target="_blank">Local Mock Server</a>
                        </dd>
                    </dl>
                </footer>
            `
        ];
    }

    async connectedCallback () {
        const view = await getViewId(VIEW_LVL_1);
        view && (this.currentView = view);

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
        task: async () => {
            const bmIsActive = await getStorageItem(STORAGE_ACTIVE, false);
            this.bmIsActive = bmIsActive;

            return bmIsActive;
        },
        args: () => [],
    });

    renderTabLink = (view: TCurrentView) => html`
        <a href="#" class="tab-link${classMap({active: this.currentView === view})}" @click="${() => this.handleMainNavClick(view)}">${i18n.view[view]}</a>
    `

    renderSwitch = (checked) => html`
        <wf-switch @onChange="${this.handleToggleBm}" inverse ?checked="${checked}"></wf-switch>
    `

    handleMainNavClick = async (view: TCurrentView) => {
        this.currentView = view;
        await setStorageItem(STORAGE_VIEW,{[VIEW_LVL_1]: view})
    }

    handleToggleBm = async () => {
        this.bmIsActive = !this.bmIsActive;
        await setStorageItem(STORAGE_ACTIVE, this.bmIsActive)
    }

    handleReloadApp = () => {
        this.viewLoadTask.run()
    }
}


if (!customElements.get('wf-bm-popup')) {
    customElements.define('wf-bm-popup', BrowserMock);
}