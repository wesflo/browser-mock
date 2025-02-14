import { property } from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';

export class ErrorAsync extends LitElement {
    @property({type: String}) error: string = '';

    static styles = css`
        :host {
            display: block;
        }

    `;

    render() {
        console.error(this.error);
        return html`
            <div>
                <h5>Üpsii! Da ist was schiefgelaufen...</h5>
                <p>Bitte kurz bescheid geben, am besten mit screenshot inkl. offener Konsole</p>
                <p>${this.error}</p>
            </div>
        `;
    }
}

if (!customElements.get('wf-error')) {
    customElements.define('wf-error', ErrorAsync);
}