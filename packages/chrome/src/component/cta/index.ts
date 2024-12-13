import { property, query } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import {TAppearance, TSize, TType} from "./interface";
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";

class CTA extends LitElement {
    @property({ type: Boolean }) disabled: boolean = false;
    @property({ type: String }) appearance: TAppearance = 'primary';
    @property({ type: String }) type: TType = 'button';
    @property({ type: String }) size: TSize = 'm';
    @property({ type: String }) href: string | null = null;
    @property({ type: String }) target: string = '_self';
    @property({ type: Function }) onClick: () => void;

    @query('#cta') _button!: HTMLButtonElement;

    static styles = [defaultStyle, style];

    render() {
        return this.href ? this.renderLink() : this.renderButton();
    }

    protected renderButton = () => html`
        <button class="cta ${this.appearance} ${this.size}" type="${this.type}" @click(${this.handleClick})>
            <slot></slot>
        </button>
    `;

    protected renderLink = () => html`
        <a href="${this.disabled ? 'javascript:void(0)' : this.href}" class="cta ${this.appearance} ${this.size}" target="${this.target}" @click(${this.handleClick})>
            <slot></slot>
        </a>
    `;

    handleClick = () => {
        this.onClick && this.onClick()
    }
}

if (!customElements.get('wf-button')) {
    customElements.define('wf-button', CTA);
}
