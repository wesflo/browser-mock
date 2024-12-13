import { property } from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import "../../component/cta";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    static styles = css`
        :host {
            display: block;
        }
    `;

    render() {
        return html`
            <wf-button @click="${() => console.log( 'test cta' )}">Test Button</wf-button>
            <wf-button href="#test">Test Link</wf-button>
        `;
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', ViewDefault);
}