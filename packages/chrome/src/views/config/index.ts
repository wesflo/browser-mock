import { property } from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";

import "../../component/button";
import "../../component/switch";
import "../../component/select";
import "../../component/input";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    static styles = [defaultStyle, style];

    render() {
        return html`
            <wf-switch>Label switch </wf-switch>
            <wf-input label="Label text"> </wf-input>
            <wf-input type="password" label="Label password"></wf-input>
            <wf-select label="Label select">
                <option value="">Eins auswählen</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
            </wf-select>
            <wf-button>Label Button </wf-button>
        `;
    }
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ViewDefault);
}