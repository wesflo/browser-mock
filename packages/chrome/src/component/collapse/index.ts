import { property, query } from 'lit/decorators.js';
import {html, LitElement, PropertyValues} from 'lit';
import {defaultStyle} from "../../style/defaultStyle";
import {style} from "./style";
import {styleMap} from "lit-html/directives/style-map.js";
import {resizeHandler} from "../../util/windowEventHandler";

export default class Component extends LitElement {
    @property({ type: Boolean, reflect: true }) isOpen: boolean = false;
    @property({ type: Boolean }) disabled: boolean = false;
    @property({ type: String }) title!: string;
    @property({ type: Function }) onToggle: (checked: typeof this.isOpen, id?) => void;

    @query('#cnt') cnt!: HTMLDivElement;
    @query('#wrp') wrp!: HTMLDivElement;

    static styles = [defaultStyle, style];

    render() {
        return html`
            <input type="checkbox" id="toggle" ?checked="${this.isOpen}" @change="${this.handleChange}" />
            <label for="toggle">
                ${this.title}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                </svg>
            </label>
            <div id="cnt" style="${styleMap({maxHeight: this.getMaxHeight()})}">
                <div id="wrp">
                    <slot></slot>
                </div>
            </div>
        `
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
        setTimeout(() => {
            this.cnt.style.maxHeight = this.getMaxHeight()
        }, 10)
    }

    connectedCallback() {
        super.connectedCallback();
        resizeHandler.add(this.handleWindowResize);
    }

    disconnectedCallback() {
        resizeHandler.remove(this.handleWindowResize);
        super.disconnectedCallback();
    }

    handleChange = () => {
        if(!this.disabled) {
            this.isOpen = !this.isOpen;
            this.onToggle && this.onToggle(this.isOpen, this.getAttribute('id'))
        }
    }

    handleWindowResize = () => this.requestUpdate();

    getMaxHeight = () => {
        return this.isOpen ? `${this.wrp?.scrollHeight || 1000}px` : '0';
    };
}

if (!customElements.get('wf-collapse')) {
    customElements.define('wf-collapse', Component);
}
