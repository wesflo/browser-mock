import {html, LitElement} from "lit";
import {property} from "lit/decorators.js";
import {classMap} from "lit-html/directives/class-map.js";
import {TAB_API_MOCKS, TAB_APP_CONFIG, TAB_PROJECTS, TABS} from "./constant";
import {TCurrentView} from "./interface";
import {style} from "./style";
import i18n from "../i18n.json";
import {defaultStyle, tabsStyles} from "../style/defaultStyle";
import {resetStyle} from "../style/resetStyle";
import "../component/switch";
import "../component/progress";
import "../views/error";
import "../views/projects";
import "../views/mocks";
import "../views/config";
import {getStorageItem, setStorageItem} from "../util/storage";
import {STORAGE_ACTIVE, STORAGE_APP_CONFIG, STORAGE_VIEW, VIEW_LVL_1} from "../constant";
import {getViewId} from "../util/getViewId";
import pkg from "../../package.json"
import {MouseEvent} from "happy-dom";
import {TemplateResult} from "lit-html";

export class BrowserMock extends LitElement {
    @property({type: Boolean, reflect: true}) bmIsActive: boolean = false;

    @property({type: String}) currentView: TCurrentView = TAB_API_MOCKS;

    static styles = [resetStyle, defaultStyle, tabsStyles, style];

    render() {
        return [
            html`
                <nav>
                    <div class="box l">
                        ${TABS.map((t: TCurrentView) => this.renderTabLink(t))}
                    </div>
                    <div class="box r">
                        ${this.renderTabLink(TAB_APP_CONFIG, html`
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                            </svg>`)}
                        ${this.renderSwitch()}
                    </div>
                </nav>
                <div class="tabs">
                    <wf-view-projects class="${classMap({tab: true, active: this.currentView === TAB_PROJECTS})}"></wf-view-projects>
                    <wf-view-mock class="${classMap({tab: true, active: this.currentView === TAB_API_MOCKS})}"></wf-view-mock>
                    <wf-view-config class="${classMap({tab: true, active: this.currentView === TAB_APP_CONFIG})}"></wf-view-config>
                </div>
                <footer>
                    <small>v${pkg.version}</small>
                    <dl>
                        <dt>Tutorials</dt>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/index.html" target="_blank">General</a>
                        </dd>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/packages/chrome/README.html" target="_blank">Plugin</a>
                        </dd>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/packages/generator/README.html" target="_blank">Generator</a>
                        </dd>
                        <dd>
                            <a href="https://wesflo.github.io/browser-mock/packages/server/README.html" target="_blank">Local Mock Server</a>
                        </dd>
                    </dl>
                </footer>
            `
        ];
    }

    async connectedCallback () {
        const dataAttr = 'data-theme';
        this.bmIsActive = await getStorageItem(STORAGE_ACTIVE, false);
        const view = getViewId(VIEW_LVL_1);
        view && (this.currentView = view);
        const config = getStorageItem(STORAGE_APP_CONFIG);
        if(config.darkMode) {
            document.documentElement.setAttribute(dataAttr, 'dark');
        } else {
            document.documentElement.removeAttribute(dataAttr);
        }

        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    renderTabLink = (view: TCurrentView, cnt: string | TemplateResult = i18n.view[view]) => html`
        <a href="#" class="tab-link${classMap({active: this.currentView === view, [view]: true})}" @click="${(e) => this.handleMainNavClick(e, view)}">${cnt}</a>
    `

    renderSwitch = () => html`
        <wf-switch @onChange="${this.handleToggleBm}" ?checked="${this.bmIsActive}"></wf-switch>
    `

    handleMainNavClick = async (e: MouseEvent, view: TCurrentView) => {
        e.preventDefault();
        this.currentView = view;
        setStorageItem(STORAGE_VIEW,{[VIEW_LVL_1]: view});
    }

    handleToggleBm = async () => {
        this.bmIsActive = !this.bmIsActive;
        setStorageItem(STORAGE_ACTIVE, this.bmIsActive)
    }
}


if (!customElements.get('wf-bm-popup')) {
    customElements.define('wf-bm-popup', BrowserMock);
}