import {property, queryAll} from 'lit/decorators.js';
import {html, LitElement} from 'lit';
import {defaultStyle} from "../../../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../../../util/style/textStyle";


export class Component extends LitElement {

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            <header>
                <h2>Mock Project</h2>
            </header>
        `;
    }

}

if (!customElements.get('wf-view-project')) {
    customElements.define('wf-view-project', Component);
}