import {html, nothing} from "lit";

export const renderAsterisks = (required: boolean) =>
    required ? html`<span class="asterisks">*</span>` : nothing