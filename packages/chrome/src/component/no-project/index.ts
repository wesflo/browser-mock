import { html, LitElement } from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {textStyle} from "../../util/style/textStyle";

export default class Component extends LitElement {

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            <h3>No Project configured</h3>
            <p>Please add first a project to enable API mocks</p>
        `;
    }
}

if (!customElements.get('wf-no-project')) {
    customElements.define('wf-no-project', Component);
}
