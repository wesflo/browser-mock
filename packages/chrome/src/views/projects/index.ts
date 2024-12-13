import { property } from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import "../../component/button";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    static styles = css`
        :host {
            display: block;
        }
    `;

    render() {
        return html`

        `;
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', ViewDefault);
}