import { property } from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    static styles = css`
        :host {
            display: block;
        }

    `;

    render() {
        return html`
            config
        `;
    }
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ViewDefault);
}