import { property } from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";

import "../../component/button";
import "../../component/switch";
import "../../component/select";
import "../../component/input";
import "../../component/options";
import "../../component/textarea";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    static styles = [defaultStyle, style];

    render() {
        return html`
            <wf-switch>Label switch</wf-switch>
            <wf-input label="Label text"> </wf-input>
            <wf-input type="password" label="Label password"></wf-input>
            <wf-select label="Label select">
                <option value="">Eins auswählen</option>
                <option value="1">Foo 1</option>
                <option value="2">Foo 2</option>
                <option value="3">Foo 3</option>
                <option value="4">Foo 4</option>
                <option value="5">Foo 5</option>
            </wf-select>
            <wf-textarea label="Textarea Label"></wf-textarea>
            
            <wf-options name="foo" multiple>
                <wf-option value="1">Label checkbox 1</wf-option>
                <wf-option value="2">Label checkbox 2</wf-option>
            </wf-options>
            <wf-options name="bar">
                <wf-option value="1">Label radio 1</wf-option>
                <wf-option value="2">Label radio 2</wf-option>
            </wf-options>
            
            <wf-button>Label Button </wf-button>
        `;
    }
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ViewDefault);
}