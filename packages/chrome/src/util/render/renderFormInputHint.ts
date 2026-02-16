import {html, nothing} from "lit";

export const renderFormInputHint = (msg?: string) =>
    msg ? html`<span class="msg">${msg}</span>` : nothing