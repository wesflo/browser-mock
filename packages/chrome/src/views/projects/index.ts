import { property, queryAll } from 'lit/decorators.js';
import { html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {openOnlyOneCollapse} from "../../component/collapse/util/openOnlyOneCollapse";
import "../../component/button";
import "../../component/collapse";
import "../../component/toast";
import "../../component/option-picker";
import {toastFactory} from "../../component/toast/util/toastFactory";
import {TNotificationTypes} from "../../component/toast/interface";

export class ViewDefault extends LitElement {
    toastHandler = toastFactory()
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
            <wf-option-picker>
                <wf-option appearance="success" value="1">
                    <h5>Label radio 1</h5>
                    <p>Lorem ipsum dolor sit amet</p>
                </wf-option>
                <wf-option appearance="error" value="2">
                    <h5>Label radio 2</h5>
                    <p>At vero eos et accusam et justo duo dolores et ea rebum</p>
                </wf-option>
            </wf-option-picker>
            <wf-button .onClick="${this.addToast}">Add toast(s)</wf-button>
        `;
    }

    handleToggleCollapse = (isOpen: boolean, id) => {
        isOpen && openOnlyOneCollapse(this.collapses, id)
    }

    addToast = () => {
        this.toastHandler.add('Lorem ipsum dolor sit amet', ['error', 'success'][Math.round(Math.random())] as TNotificationTypes)
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', ViewDefault);
}