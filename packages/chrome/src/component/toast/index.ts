import { property, query } from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {style} from "./style";
import {TNotificationTypes} from "./interface";
import {TemplateResult} from "lit-html";
import {toastFactory} from "./util/toastFactory";

export default class Component extends LitElement {
    toastHandler = toastFactory()
    @property({ type: String }) appearance: TNotificationTypes = 'success';

    static styles = [defaultStyle, style];

    render() {
        const {appearance} = this;

        return html`
            ${this.renderIcon(appearance)}
            <div class="cnt">
                <slot></slot>
            </div>
            <wf-button appearance="clean" size="xs" .onClick="${this.handleCloseClick}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </wf-button>
        `;
    }

    renderIcon = (appearance: TNotificationTypes) => {
        const map: {[key: string]: TemplateResult} = {
            success: html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>`,
            error: html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z"/>
            </svg>`,
        }

        return map[appearance];
    }

    handleCloseClick = () => this.toastHandler.remove(this.getAttribute('id'))
}

if (!customElements.get('wf-toast')) {
    customElements.define('wf-toast', Component);
}
