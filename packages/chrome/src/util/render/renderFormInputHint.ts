import {html, nothing} from "lit";

export const renderFormInputHint = (msg?: string) =>
    msg ? html`<span class="hint">${msg}</span>` : nothing