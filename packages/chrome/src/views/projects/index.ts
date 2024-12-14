import { property, queryAll } from 'lit/decorators.js';
import { html, LitElement} from 'lit';
import "../../component/button";
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import "../../component/collapse";
import {openOnlyOneCollapse} from "../../component/collapse/util/openOnlyOneCollapse";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<HTMLElement>;

    static styles = [defaultStyle, style];

    render() {
        return html`
            <wf-collapse id="c1" title="Collapse Dummy" .onToggle="${this.handleToggleCollapse}" isOpen>
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse id="c2" title="Collapse Dummy" .onToggle="${this.handleToggleCollapse}">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse id="c3" title="Collapse Dummy" .onToggle="${this.handleToggleCollapse}">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse id="c4" title="Collapse Dummy" .onToggle="${this.handleToggleCollapse}">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse id="c5" title="Collapse Dummy" .onToggle="${this.handleToggleCollapse}">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
        `;
    }

    handleToggleCollapse = (isOpen: boolean, id) => {
        isOpen && openOnlyOneCollapse(this.collapses, id)
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', ViewDefault);
}