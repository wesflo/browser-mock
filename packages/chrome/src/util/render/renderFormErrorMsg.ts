import {html, nothing} from "lit";

export const renderFormErrorMsg = (msg?: string) =>
    msg ? html`<span class="err">${msg}</span>` : nothing