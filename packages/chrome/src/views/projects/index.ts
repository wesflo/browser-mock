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
            <wf-button href="#test">Test Link</wf-button>
            <wf-button disabled href="#test">Test Link</wf-button>
            <wf-button appearance="primary" href="#test">Test Link</wf-button>
            <wf-button appearance="secondary" href="#test">Test Link</wf-button>
            <wf-button appearance="tertiary" href="#test">Test Link</wf-button>
            <wf-button appearance="primary-outline" href="#test">Test Link</wf-button>
            <wf-button appearance="secondary-outline" href="#test">Test Link</wf-button>
            <wf-button appearance="tertiary-outline" href="#test">Test Link</wf-button>

            <wf-button size="xs" href="#test">Test Link</wf-button>
            <wf-button size="s" href="#test">Test Link</wf-button>
            <wf-button size="m" href="#test">Test Link</wf-button>
            <wf-button size="l" href="#test">Test Link</wf-button>
            <wf-button size="xl" href="#test">Test Link</wf-button>
        `;
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', ViewDefault);
}