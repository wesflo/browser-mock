import {property, queryAll} from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {buttonsWrapperStyles} from "../../component/button/style";
import {openAllCollapses} from "../../component/collapse/util/openAllCollapses";
import {closeAllCollapses} from "../../component/collapse/util/closeAllCollapses";

import "../../component/button";
import "../../component/switch";
import "../../component/select";
import "../../component/input";
import "../../component/options";
import "../../component/textarea";
import "../../component/collapse";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<HTMLElement>;

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <div class="buttons">
                <wf-button .onClick="${this.handleOpenAll}">Open All</wf-button>
                <wf-button .onClick="${this.handleCloseAll}">Close All</wf-button>
            </div>
            <wf-collapse title="Collapse Dummy" isOpen >
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
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
        `;
    }

    handleOpenAll = () => openAllCollapses(this.collapses)
    handleCloseAll = () => closeAllCollapses(this.collapses)
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ViewDefault);
}