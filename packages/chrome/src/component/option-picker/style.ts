import {css} from "lit";

export const style = css`
    :host {
        display: flex;
        gap: 16px;
        flex-wrap: nowrap;
        position: relative;
    }

    input {
        opacity: 0;
        appearance: none;
        margin: 0;
        position: absolute;

        &:focus-visible {
            outline: none;
        }
    }

    label {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        font-weight: bold;
        font-size: var(--font-size-l);
        top: unset;
        transform: unset;
        inset-inline-start: unset;
        border-radius: 999em;
        border: 1px solid var(--primary);
        color: var(--primary);
        padding: 8px 24px;
        background-color: var(--main-bg);
        transition: color 200ms ease-out, background-color 200ms ease-out;
        overflow: hidden;
    }

    input:checked + label {
        background-color: var(--primary-bright);
        color: var(--font-color-iverse);
    }

    .success {
        label {
            border-color: var(--success);
            color: var(--success);
        }

        input:checked + label {
            background-color: var(--success-bright);
        }
    }

    .error {
        label {
            border-color: var(--error);
            color: var(--error);
        }

        input:checked + label {
            background-color: var(--error-bright);
        }
    }

`