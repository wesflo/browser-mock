import { property } from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';

import "../../component/button"
import "../../component/switch"
import "../../component/select"
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    static styles = [defaultStyle, style];

    render() {
        return html`
            <wf-switch>Label text </wf-switch>
            <wf-select label="Label text">
                <option value="">Eins auswählen</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
            </wf-select>
            <wf-button>Label text </wf-button>
        `;
    }
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ViewDefault);
}